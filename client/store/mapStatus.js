/**
 * ACTION TYPES
 */
const UPDATE_MAP = 'UPDATE_MAP';
const CLEAR_MAP = 'CLEAR_MAP';

/**
 * ACTION CREATORS
 */
export const updateMap = (stateId, status) => ({
  type: UPDATE_MAP,
  stateId,
  status
});

export const clearMap = () => ({
  type: CLEAR_MAP
});

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case UPDATE_MAP:
      return { ...state, [action.stateId]: action.status };
    case CLEAR_MAP:
      return {};
    default:
      return state;
  }
}
