import { toastr } from 'react-redux-toastr';
import cuid from 'cuid';
import {
  asyncActionBegin,
  asyncActionComplete,
  asyncActionError
} from './asyncActions';

export const updateProfile = user => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    try {
      const { isLoaded, isEmpty, ...updatedUser } = user;
      if (updatedUser.dateOfBirth) {
        updatedUser.dateOfBirth = updatedUser.dateOfBirth.toString();
      }
      firebase.updateProfile(updatedUser);
      toastr.success('Update Successful!', 'Your profile was updated.');
    } catch (error) {
      console.error(error);
    }
  };
};

export const uploadProfileImage = file => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;
    const fileName = cuid();
    const path = `${user.uid}/user_images`;

    try {
      dispatch(asyncActionBegin());
      // Create a photo references
      var storageRef = firebase.storage().ref();
      var photoRef = storageRef.child(`${path}/${fileName}`);

      // upload file to firebase storage
      const snapshot = await photoRef.put(file);

      // get DL URL of image
      const downloadURL = await snapshot.ref.getDownloadURL();

      // get user from firestore
      let userDocument = await firestore.get(`users/${user.uid}`);

      // check if user already has an image
      if (!userDocument.data().photoURL) {
        // user profile
        await firebase.updateProfile({
          photoURL: downloadURL
        });
        // auth profile
        await user.updateProfile({
          photoURL: downloadURL
        });
      }
      // add photos to the user's photos collection
      await firestore.add(
        {
          collection: 'users',
          doc: user.uid,
          subcollections: [{ collection: 'photos' }]
        },
        {
          name: fileName,
          url: downloadURL
        }
      );
      dispatch(asyncActionComplete());
    } catch (error) {
      dispatch(asyncActionError());
      console.error(error);
      throw new Error('Problem uploading photo');
    }
  };
};

export const deleteImage = image => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;

    try {
      await firebase.deleteFile(`${user.uid}/user_images/${image.name}`);
      await firestore.delete({
        collection: 'users',
        doc: user.uid,
        subcollections: [{ collection: 'photos', doc: image.id }]
      });
    } catch (error) {
      console.error(error);
      throw new Error('Problem deleting the photo');
    }
  };
};

export const setProfilePicture = image => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    try {
      return await firebase.updateProfile({
        photoURL: image.url
      });
    } catch (error) {
      console.error(error);
      throw new Error('Problem setting main photo');
    }
  };
};

export const setUserGoing = event => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const user = firestore.auth().currentUser;
    const photoURL = getState().firebase.profile.photoURL;
    const newAttendee = {
      going: true,
      joinDate: Date.now(),
      photoURL,
      displayName: user.displayName,
      host: false
    };

    try {
      await firestore.update(`events/${event.id}`, {
        [`attendees.${user.uid}`]: newAttendee
      });
      await firestore.set(`event_attendee/${event.id}_${user.uid}`, {
        eventId: event.id,
        userUID: user.uid,
        eventDate: event.date,
        host: false
      });
      toastr.success('Success!', 'Successfully joined the event.');
    } catch (error) {
        console.log(error);
        toastr.error('Oops!', 'There was a problem signing up for the event');
    }
  }
};

export const setUserNotGoing = event => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const user = firestore.auth().currentUser;
    const photoURL = getState().firebase.profile.photoURL;
    const attendee = {
      going: false,
      joinDate: Date.now(),
      photoURL,
      displayName: user.displayName,
      host: false
    };

    try {
      await firestore.update(`events/${event.id}`, {
        [`attendees.${user.uid}`]: firestore.FieldValue.delete()
      });
      await firestore.delete(`event_attendee/${event.id}_${user.uid}`);
      toastr.success('Success!', 'Successfully removed from the event.');
    } catch (error) {
        console.log(error);
        toastr.error('Oops!', 'There was a problem cancelling your reservation.');
    }
  }
}
