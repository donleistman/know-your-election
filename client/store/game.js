import axios from 'axios';
import history from '../history';

const initialState = {
  isCurrentGame: false,
  secondsRemaining: 0,
  gameClock: null,
  isFirstGame: true,
  gameYear: null,
};

/**
 * ACTION TYPES
 */
const COUNTDOWN_SECONDS = 'COUNTDOWN_SECONDS';
const GAME_START = 'GAME_START';
const GAME_END = 'GAME_END';
const GET_GAME_YEAR = 'GET_GAME_YEAR';

/**
 * ACTION CREATORS
 */

export const gameStart = (gameClock) => ({
  type: GAME_START,
  gameClock
});

export const gameEnd = () => ({
  type: GAME_END
});

export const countdown = () => ({
  type: COUNTDOWN_SECONDS
});

export const getGameYear = (gameYear) => ({
  type: GET_GAME_YEAR,
  gameYear
});

/**
 * THUNK CREATORS
 */


/**
 * REDUCER
 */
export default function (state = initialState, action) {
  const { gameClock, gameYear } = action;

  switch (action.type) {
    case GAME_START:
      return {
        ...state,
        isCurrentGame: true,
        secondsRemaining: 30,
        isFirstGame: false,
        gameClock
      };
    case GAME_END:
      return { ...state, isCurrentGame: false };
    case COUNTDOWN_SECONDS:
      return { ...state, secondsRemaining: state.secondsRemaining - 1 };
    case GET_GAME_YEAR:
      return { ...state, gameYear };
    default:
      return state;
  }
}
