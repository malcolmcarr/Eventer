import {
  ASYNC_ACTION_BEGIN,
  ASYNC_ACTION_COMPLETE,
  ASYNC_ACTION_ERROR
} from '../constants';

const initialState = {
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ASYNC_ACTION_BEGIN:
      return { ...state, loading: true }
    case ASYNC_ACTION_COMPLETE:
      return { ...state, loading: false }
    case ASYNC_ACTION_ERROR:
      return { ...state, loading: false }
    default:
      return { ...state }
  }
}