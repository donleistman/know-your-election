// SERVER STORE MAPSTATUS

/**
 * ACTION TYPES
 */
const UPDATE_MAP_SERVER = 'UPDATE_MAP_SERVER';
const CLEAR_MAP_SERVER = 'CLEAR_MAP_SERVER';

/**
 * ACTION CREATORS
 */
const updateMapServer = (stateId, status) => ({
  type: UPDATE_MAP_SERVER,
  stateId,
  status
});

const clearMapServer = () => ({
  type: CLEAR_MAP_SERVER
});

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
const reducer = function(state = {}, action) {
  switch (action.type) {
    case UPDATE_MAP_SERVER:
      return Object.assign({}, state, { [action.stateId]: action.status });
    case CLEAR_MAP_SERVER:
      return {};
    default:
      return state;
  }
};

module.exports = {
  reducer,
  updateMapServer,
  clearMapServer
};
