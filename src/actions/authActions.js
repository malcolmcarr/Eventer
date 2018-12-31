import { USER_SIGN_IN, USER_SIGN_OUT } from '../constants';
import { closeModal } from './modalActions';

export const signIn = credentials => {
  return dispatch => {
    dispatch({ type: USER_SIGN_IN, payload: { credentials } });
    dispatch(closeModal());
  }
};

export const signOut = () => {
  return { type: USER_SIGN_OUT };
};
