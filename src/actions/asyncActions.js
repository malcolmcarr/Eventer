import {
  ASYNC_ACTION_BEGIN,
  ASYNC_ACTION_COMPLETE,
  ASYNC_ACTION_ERROR
} from '../constants';

export const asyncActionBegin = () => {
  return { type: ASYNC_ACTION_BEGIN };
};

export const asyncActionComplete = () => {
  return { type: ASYNC_ACTION_COMPLETE };
};

export const asyncActionError = () => {
  return { type: ASYNC_ACTION_ERROR };
};
