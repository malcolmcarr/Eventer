import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import eventReducer from './eventReducer';
import modalReducer from './modalReducer';
import authReducer from './authReducer';
import asyncReducer from './asyncReducer';

const rootReducer = combineReducers({
  form: formReducer,
  events: eventReducer,
  modal: modalReducer,
  auth: authReducer,
  async: asyncReducer
});

export default rootReducer;