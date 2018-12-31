import { USER_SIGN_IN, USER_SIGN_OUT } from '../constants';

const initialState = {
  user: {},
  authenticated: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGN_IN:
      return {
        ...state,
        authenticated: true,
        user: action.payload.credentials
      };
    case USER_SIGN_OUT:
      return initialState;
    default:
      return { ...state };
  }
};
