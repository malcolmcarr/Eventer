import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

import eventReducer from './eventReducer';
import modalReducer from './modalReducer';
import asyncReducer from './asyncReducer';

const rootReducer = combineReducers({
  form: formReducer,
  events: eventReducer,
  modal: modalReducer,
  async: asyncReducer,
  toastr: toastrReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

export default rootReducer;
