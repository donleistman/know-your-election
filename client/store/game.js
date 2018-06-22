// CLIENT STORE
/* eslint-disable complexity*/

const initialState = {
  isCurrentGame: false,
  secondsRemaining: null,
  gameClock: null,
  gameYear: null,
  gameType: null,
  isFirstGame: true,

  // TODO -- move players to a separate reducer
  players: 0
};

/**
 * ACTION TYPES
 */
const COUNTDOWN_SECONDS = 'COUNTDOWN_SECONDS';
const GAME_START = 'GAME_START';
const GAME_END = 'GAME_END';
const PLAY_FIRST_GAME = 'PLAY_FIRST_GAME';

// TODO -- move players to a separate reducer
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

export const playFirstGame = () => ({
  type: PLAY_FIRST_GAME
});

// TODO -- move players to a separate reducer

export const playersInc = () => ({
  type: PLAYERS_INC
});

export const updatePlayers = players => ({
  type: UPDATE_PLAYERS,
  players
});

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  const { gameClock, gameYear, gameType, players, secondsRemaining } = action;

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
        secondsRemaining: null,
        gameClock: null,
        gameYear: null
      };
    case COUNTDOWN_SECONDS:
      return { ...state, secondsRemaining: state.secondsRemaining - 1 };
    case PLAY_FIRST_GAME:
      return { ...state, isFirstGame: false };

    // TODO -- move players to a separate reducer
    case PLAYERS_INC:
      return { ...state, players: state.players + 1 };
    case UPDATE_PLAYERS:
      return { ...state, players };
    default:
      return state;
  }
}
