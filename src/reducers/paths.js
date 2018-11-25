import {
  ADD_NEW_PATH,
  ADD_NEW_PATH_SUCCESS,
  ADD_NEW_PATH_ERROR
} from '../actions/types';

const INITIAL_STATE = {
  isSubmitting: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_NEW_PATH:
      return {
        ...state,
        isSubmitting: true
      }
    case ADD_NEW_PATH_ERROR:
    case ADD_NEW_PATH_SUCCESS:
      return {
        ...state,
        isSubmitting: false
      }
    default:
      return state;
  }
};
