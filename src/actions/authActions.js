import { USER_SIGN_IN, USER_SIGN_OUT } from '../constants';

export const signIn = credentials => {
  return {
    type: USER_SIGN_IN,
    payload: {
      credentials
    }
  };
};

export const signOut = () => {
  return { type: USER_SIGN_OUT };
};
