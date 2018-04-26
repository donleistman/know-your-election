import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const UPDATE_MAP = 'UPDATE_MAP';


/**
 * ACTION CREATORS
 */
export const updateMap = (stateId, status) => ({
  type: UPDATE_MAP,
  stateId,
  status
});

/**
 * THUNK CREATORS
 */


/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case UPDATE_MAP:
      return Object.assign({}, state, { [action.stateId]: action.status });
    default:
      return state;
  }
}
