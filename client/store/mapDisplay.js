/**
 * ACTION TYPES
 */
const UPDATE_MAP_DISPAY = 'UPDATE_MAP_DISPAY';

/**
 * ACTION CREATORS
 */
export const updateMapDisplay = mapDispay => ({
  type: UPDATE_MAP_DISPAY,
  mapDispay
});

/**
 * REDUCER
 */
export default function(state = '', action) {
  switch (action.type) {
    case UPDATE_MAP_DISPAY:
      return action.mapDispay;
    default:
      return state;
  }
}
