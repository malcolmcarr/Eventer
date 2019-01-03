import { toastr } from 'react-redux-toastr';
import { FETCH_EVENTS, DELETE_EVENT } from '../constants';
import {
  asyncActionBegin,
  asyncActionComplete,
  asyncActionError
} from './asyncActions';
import { completeNewEvent } from '../util/helpers';

export const fetchEvents = events => {
  return { type: FETCH_EVENTS, payload: { events } };
};

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
    const action = cancelled ? 'canclled' : 'reactivated'

    try {
      toastr.confirm(message, {
        onOk: () => {
          firestore.update(`events/${id}`, {
            cancelled: cancelled
          });
          toastr.success('Success!', `Your event was ${action}.`)
        }
      });  
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteEvent = id => {
  return async dispatch => {
    try {
      dispatch({
        type: DELETE_EVENT,
        payload: {
          id
        }
      });
      toastr.success('Success!', 'Event was successfully removed.');
    } catch (err) {
      toastr.error('Oops!', 'Something went wrong while removing your event.');
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

export const loadEvents = () => {
  return async dispatch => {
    try {
      dispatch(asyncActionBegin());
      let events = []; // fetch data
      dispatch(fetchEvents(events));
      dispatch(asyncActionComplete());
    } catch (err) {
      toastr.error('Oops!', 'Could not load events');
      dispatch(asyncActionError());
    }
  };
};
