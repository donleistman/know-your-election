/**
 * ACTION TYPES
 */
const GET_MAP_NODES = 'GET_MAP_NODES';

/**
 * ACTION CREATORS
 */

export const getMapNodes = mapNodes => ({
  type: GET_MAP_NODES,
  mapNodes
});

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case GET_MAP_NODES:
      return action.mapNodes;
    default:
      return state;
  }
}
