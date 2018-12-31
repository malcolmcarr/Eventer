import { toastr } from 'react-redux-toastr'
import {
  FETCH_EVENTS,
  CREATE_EVENT,
  DELETE_EVENT,
  UPDATE_EVENT
} from '../constants';
import {
  asyncActionBegin,
  asyncActionComplete,
  asyncActionError
} from './asyncActions';

export const fetchEvents = events => {
  return { type: FETCH_EVENTS, payload: { events } };
};

export const createEvent = event => {
  return async dispatch => {
    try {
      dispatch({
        type: CREATE_EVENT,
        payload: {
          event
        }
      });
      toastr.success('Success', 'Event was successfully created!');
    } catch (err) {
      toastr.error('Oops', 'Something went wrong while creating your event.')
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
      toastr.error('Oops!', 'Something went wrong while removing your event.')
    }
  };
};

export const updateEvent = event => {
  return async dispatch => {
    try {
      dispatch({
        type: UPDATE_EVENT,
        payload: {
          event
        }
      });
      toastr.success('Success!', 'Event was successfully updated.');
    } catch (err) {
      toastr.error('Oops!', 'Something went wrong while updating your event.')
    }
  };
};

export const loadEvents = () => {
  return async dispatch => {
    try {
      dispatch(asyncActionBegin());
      let events; // fetch data
      dispatch(fetchEvents(events));
      dispatch(asyncActionComplete());
    } catch (err) {
      console.log(err);
      dispatch(asyncActionError());
    }
  };
};
