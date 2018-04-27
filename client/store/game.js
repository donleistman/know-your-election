import axios from 'axios';
import history from '../history';

const initialState = {
  isCurrentGame: false
};

/**
 * ACTION TYPES
 */
const TOGGLE_GAME_STATUS = 'TOGGLE_GAME_STATUS';


/**
 * ACTION CREATORS
 */
export const toggleGameStatus = () => ({
  type: TOGGLE_GAME_STATUS
});

/**
 * THUNK CREATORS
 */
export const startGame = () =>
  (dispatch) => {
    dispatch(toggleGameStatus());
  };


/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_GAME_STATUS:
      return state.isCurrentGame ?
        Object.assign({}, state, { isCurrentGame: false }) :
        Object.assign({}, state, { isCurrentGame: true });
    default:
      return state;
  }
}
