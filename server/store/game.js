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
const GAME_START = 'GAME_START';
const GAME_END = 'GAME_END';

// TODO -- move players to a separate reducer
const PLAYERS_INC = 'PLAYERS_INC';
const PLAYERS_DEC = 'PLAYERS_DEC';

/**
 * ACTION CREATORS
 */

const gameStartServer = (gameClock, gameType, gameYear, secondsRemaining) => ({
  type: GAME_START,
  gameClock,
  gameType,
  gameYear,
  secondsRemaining
});

const gameEnd = () => ({
  type: GAME_END
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
    case GAME_START:
      return Object.assign({}, state, {
        isCurrentGame: true,
        secondsRemaining,
        gameClock,
        gameType,
        gameYear
      });
    // case GAME_END:
    //   return {
    //     ...state,
    //     isCurrentGame: false,
    //     secondsRemaining: 0,
    //     gameClock: null,
    //     gameYear: null,
    //   };
    // case COUNTDOWN_SECONDS:
    //   return { ...state, secondsRemaining: state.secondsRemaining - 1 };

    // TODO -- move players to a separate reducer
    case PLAYERS_INC:
      return Object.assign({}, state, { players: state.players + 1 });
    case PLAYERS_DEC:
      return Object.assign({}, state, { players: state.players - 1 });
    default:
      return state;
  }
};

module.exports = {
  reducer,
  gameStartServer,
  gameEnd,
  countdownServer,
  playersInc,
  playersDec
};
