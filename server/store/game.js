// SERVER STORE

const initialState = {
  isCurrentGame: false,
  secondsRemaining: 0,
  gameClock: null,
  gameYear: null,
  gameType: null,

  // TODO -- move players to a separate reducer
  players: 0
};

/**
 * ACTION TYPES
 */
const COUNTDOWN_SECONDS = 'COUNTDOWN_SECONDS';
const GAME_START_SERVER = 'GAME_START_SERVER';
const GAME_END_SERVER = 'GAME_END_SERVER';

// TODO -- move players to a separate reducer
const PLAYERS_INC = 'PLAYERS_INC';
const PLAYERS_DEC = 'PLAYERS_DEC';

/**
 * ACTION CREATORS
 */

const gameStartServer = (gameClock, gameType, gameYear, secondsRemaining) => ({
  type: GAME_START_SERVER,
  gameClock,
  gameType,
  gameYear,
  secondsRemaining
});

const gameEndServer = () => ({
  type: GAME_END_SERVER
});

const countdownServer = () => ({
  type: COUNTDOWN_SECONDS
});

// TODO -- move players to a separate reducer
const playersInc = () => ({
  type: PLAYERS_INC
});

const playersDec = () => ({
  type: PLAYERS_DEC
});

/**
 * THUNK CREATORS
 */


/**
 * REDUCER
 */
const reducer = function (state = initialState, action) {
  const { gameClock, gameYear, gameType, secondsRemaining } = action;

  switch (action.type) {
    case GAME_START_SERVER:
      return Object.assign({}, state, {
        isCurrentGame: true,
        secondsRemaining,
        gameClock,
        gameType,
        gameYear
      });
    case GAME_END_SERVER:
      return Object.assign({}, initialState, { players: state.players });
    case COUNTDOWN_SECONDS:
      return Object.assign({}, state, { secondsRemaining: state.secondsRemaining - 1 });

    // TODO -- move players to a separate reducer
    // ternary's are a bandaid fix for playercount bug right now
    case PLAYERS_INC:
      return Object.assign({}, state, {
        players: state.players >= 0 ? state.players + 1 : 1
      });
    case PLAYERS_DEC:
      return Object.assign({}, state, {
        players: state.players > 1 ? state.players - 1 : 1
      });
    default:
      return state;
  }
};

module.exports = {
  reducer,
  gameStartServer,
  gameEndServer,
  countdownServer,
  playersInc,
  playersDec
};
