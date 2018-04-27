import axios from 'axios';
import history from '../history';

const initialState = {
  isCurrentGame: false,
  secondsRemaining: 0
};

/**
 * ACTION TYPES
 */
const COUNTDOWN_SECONDS = 'COUNTDOWN_SECONDS';
const GAME_START = 'GAME_START';
const GAME_END = 'GAME_END';

/**
 * ACTION CREATORS
 */

export const gameStart = () => ({
  type: GAME_START
});

export const gameEnd = () => ({
  type: GAME_END
});

export const countdown = () => ({
  type: COUNTDOWN_SECONDS
});

/**
 * THUNK CREATORS
 */


/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GAME_START:
      return { ...state, isCurrentGame: true };
    case GAME_END:
      return { ...state, isCurrentGame: false };
    case COUNTDOWN_SECONDS:
      return { ...state, secondsRemaining: state.secondsRemaining - 1 };
    default:
      return state;
  }
}
