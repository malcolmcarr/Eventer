import { SubmissionError } from 'redux-form';

import { USER_SIGN_OUT } from '../constants';
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

export const signOut = () => {
  return { type: USER_SIGN_OUT };
};
