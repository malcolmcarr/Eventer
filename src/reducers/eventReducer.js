import { CREATE_EVENT, DELETE_EVENT, UPDATE_EVENT, FETCH_EVENTS } from '../constants';

 const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_EVENT:
      return [action.payload.event, ...state];
    case DELETE_EVENT:
      return [...state].filter(event => event.id !== action.payload.id);
    case UPDATE_EVENT:
      return [action.payload.event, ...state.filter(
        event => event.id !== action.payload.event.id
      )];
    case FETCH_EVENTS:
        return [...action.payload.events];
    default:
      return [...state];
  }
};
