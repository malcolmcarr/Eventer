import { SubmissionError, reset } from 'redux-form';
import { toastr } from 'react-redux-toastr';

import { closeModal } from './modalActions';

export const signIn = ({ email, password }) => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      throw new SubmissionError({
        _error: 'Incorrect username or password.'
      });
    }
    dispatch(closeModal());
  };
};

export const register = ({ email, password, displayName }) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    try {
      // create user
      const authUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      // update default auth profile
      await authUser.user.updateProfile({
        displayName
      });

      // create a custom profile in firestore
      const newUser = {
        displayName,
        createdAt: firestore.FieldValue.serverTimestamp()
      };

      await firestore.set(`users/${authUser.user.uid}`, { ...newUser });
      dispatch(closeModal());
    } catch (error) {
      throw new SubmissionError({
        _error: error.message
      });
    }
  };
};

export const socialSignIn = provider => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    try {
      dispatch(closeModal());
      let socialUser = await firebase.login({
        provider,
        type: 'popup'
      });

      if (socialUser.user.additionalUserInfo.isNewUser) {
        await firestore.set(`users/${socialUser.user.uid}`, {
          displayName: socialUser.user.displayName,
          photoURL: socialUser.user.avatarUrl,
          createdAt: firestore.FieldValue.serverTimestamp()
        });
      }
    } catch (error) {}
  };
};

export const updatePassword = ({ newPassword1 }) => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;

    try {
      await user.updatePassword(newPassword1);
      await dispatch(reset('account'));
      toastr.success('Success', 'Your password has been successfully updated')
    } catch (error) {
      throw new SubmissionError({
        _error: error.message
      });
    }
  };
};
