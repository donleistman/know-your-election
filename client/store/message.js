import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const UPDATE_MESSAGE = 'UPDATE_MESSAGE';


/**
 * ACTION CREATORS
 */
export const updateMessage = (message) => ({
  type: UPDATE_MESSAGE,
  message
});

/**
 * THUNK CREATORS
 */


/**
 * REDUCER
 */
export default function (state = '', action) {
  switch (action.type) {
    case UPDATE_MESSAGE:
      return action.message;
    default:
      return state;
  }
}
