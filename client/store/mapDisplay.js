import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const UPDATE_MAP_DISPAY = 'UPDATE_MAP_DISPAY';


/**
 * ACTION CREATORS
 */
export const updateMapDisplay = (mapDispay) => ({
  type: UPDATE_MAP_DISPAY,
  mapDispay
});

/**
 * THUNK CREATORS
 */


/**
 * REDUCER
 */
export default function (state = '', action) {
  switch (action.type) {
    case UPDATE_MAP_DISPAY:
      return action.mapDispay;
    default:
      return state;
  }
}
