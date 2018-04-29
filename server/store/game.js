// SERVER STORE

const initialState = {
  isCurrentGame: false,
  secondsRemaining: 0,
  // isFirstGame: true,
  gameClock: null,
  gameYear: null,
  gameType: null,
  players: 0
};

/**
 * ACTION TYPES
 */
const COUNTDOWN_SECONDS = 'COUNTDOWN_SECONDS';
const GAME_START = 'GAME_START';
const GAME_END = 'GAME_END';
const GET_GAME_YEAR = 'GET_GAME_YEAR';
const PLAYERS_INC = 'PLAYERS_INC';
const PLAYERS_DEC = 'PLAYERS_DEC';

/**
 * ACTION CREATORS
 */

export const gameStart = (gameClock, gameType) => ({
  type: GAME_START,
  gameClock,
  gameType
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

export const playersInc = () => ({
  type: PLAYERS_INC
});

export const playersDec = () => ({
  type: PLAYERS_DEC
});

/**
 * THUNK CREATORS
 */


/**
 * REDUCER
 */
export default function (state = initialState, action) {
  const { gameClock, gameYear, gameType } = action;

  switch (action.type) {
    case GAME_START:
      return {
        ...state,
        isCurrentGame: true,
        secondsRemaining: 30,
        // isFirstGame: false,
        gameClock,
        gameType
      };
    case GAME_END:
      return {
        ...state,
        isCurrentGame: false,
        secondsRemaining: 0,
        gameClock: null,
        gameYear: null,
      };
    case COUNTDOWN_SECONDS:
      return { ...state, secondsRemaining: state.secondsRemaining - 1 };
    case GET_GAME_YEAR:
      return { ...state, gameYear };
    case PLAYERS_INC:
      return { ...state, players: state.players + 1 };
    case PLAYERS_DEC:
      return { ...state, players: state.players - 1 };
    default:
      return state;
  }
}
