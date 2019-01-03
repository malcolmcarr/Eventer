import { toastr } from 'react-redux-toastr';

import { completeNewEvent } from '../util/helpers';
import firebase from '../config/firebase';
import { FETCH_EVENTS } from '../constants';
import {
  asyncActionBegin,
  asyncActionComplete,
  asyncActionError
} from './asyncActions';

export const createEvent = event => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const user = firestore.auth().currentUser;
    const photoURL = getState().firebase.profile.photoURL;
    let newEvent = completeNewEvent(user, photoURL, event);

    try {
      let createdEvent = await firestore.add(`events`, newEvent);
      await firestore.set(`event_attendee/${createdEvent.id}_${user.uid}`, {
        eventId: createdEvent.id,
        userUid: user.uid,
        eventDate: event.date,
        host: true
      });
      toastr.success('Success', 'Event was successfully created!');
    } catch (err) {
      toastr.error('Oops', 'Something went wrong while creating your event.');
    }
  };
};

export const cancelToggleEvent = (cancelled, id) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const message = cancelled
      ? 'Are you sure you want to cancel the event?'
      : 'Are you sure you want to reactivate the event?';
    const action = cancelled ? 'canclled' : 'reactivated';

    try {
      toastr.confirm(message, {
        onOk: () => {
          firestore.update(`events/${id}`, {
            cancelled: cancelled
          });
          toastr.success('Success!', `Your event was ${action}.`);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateEvent = event => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    try {
      await firestore.update(`events/${event.id}`, event);
      toastr.success('Success!', 'Event was successfully updated.');
    } catch (err) {
      toastr.error('Oops!', 'Something went wrong while updating your event.');
    }
  };
};

export const getEventsForDashboard = lastEvent => {
  return async (dispatch, getState) => {
    const today = new Date(Date.now());
    const db = firebase.firestore();

    const eventsRef = db.collection('events');

    try {
      dispatch(asyncActionBegin());

      const startAfter = lastEvent && (await eventsRef.doc(lastEvent.id).get());
      let query;

      lastEvent
        ? (query = eventsRef
            .where('date', '>=', today)
            .orderBy('date')
            .startAfter(startAfter)
            .limit(2))
        : (query = eventsRef
            .where('date', '>=', today)
            .orderBy('date')
            .limit(2));

      let querySnapshot = await query.get();
      if (querySnapshot.docs.length === 0) {
        dispatch(asyncActionComplete());
        return querySnapshot;
      }

      let events = [];

      for (let doc of querySnapshot.docs) {
        const event = { ...doc.data(), id: doc.id };
        events.push(event);
      }

      dispatch({ type: FETCH_EVENTS, payload: { events } });
      dispatch(asyncActionComplete());
      return querySnapshot;
    } catch (error) {
      dispatch(asyncActionError());
      console.error(error);
    }
  };
};
