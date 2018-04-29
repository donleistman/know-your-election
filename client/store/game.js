// CLIENT STORE
/* eslint-disable complexity*/

// import socket from '../socket';

const initialState = {
  isCurrentGame: false,
  secondsRemaining: 0,
  gameClock: null,
  gameYear: null,
  gameType: null,

  // TODO -- move players to a separate reducer
  isFirstGame: true,
  players: 0
};

/**
 * ACTION TYPES
 */
const COUNTDOWN_SECONDS = 'COUNTDOWN_SECONDS';
const GAME_START = 'GAME_START';
const GAME_JOIN = 'GAME_JOIN';
const GAME_END = 'GAME_END';

// TODO -- move players to a separate reducer
const PLAY_FIRST_GAME = 'PLAY_FIRST_GAME';
const PLAYERS_INC = 'PLAYERS_INC';
const UPDATE_PLAYERS = 'UPDATE_PLAYERS';

/**
 * ACTION CREATORS
 */

export const gameStart = (gameClock, gameType, gameYear, secondsRemaining) => ({
  type: GAME_START,
  gameClock,
  gameType,
  gameYear,
  secondsRemaining
});

export const gameEnd = () => ({
  type: GAME_END
});

export const countdown = () => ({
  type: COUNTDOWN_SECONDS
});


// TODO -- move players to a separate reducer
export const playFirstGame = () => ({
  type: PLAY_FIRST_GAME
});

export const playersInc = () => ({
  type: PLAYERS_INC
});

export const updatePlayers = (players) => ({
  type: UPDATE_PLAYERS,
  players
});

/**
 * THUNK CREATORS
 */


/**
 * REDUCER
 */
export default function (state = initialState, action) {
  const {
    gameClock, gameYear, gameType, players, secondsRemaining
  } = action;

  switch (action.type) {
    case GAME_START:
      return {
        ...state,
        isCurrentGame: true,
        secondsRemaining,
        gameClock,
        gameType,
        gameYear
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

    // TODO -- move players to a separate reducer
    case PLAY_FIRST_GAME:
      return { ...state, isFirstGame: false };
    case PLAYERS_INC:
      return { ...state, players: state.players + 1 };
    case UPDATE_PLAYERS:
      return { ...state, players };
    default:
      return state;
  }
}
