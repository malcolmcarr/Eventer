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
  return {
    type: CREATE_EVENT,
    payload: {
      event
    }
  };
};

export const deleteEvent = id => {
  return {
    type: DELETE_EVENT,
    payload: {
      id
    }
  };
};

export const updateEvent = event => {
  return {
    type: UPDATE_EVENT,
    payload: {
      event
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
