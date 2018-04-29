// SERVER SOCKET

const store = require('../store');
const {
  playersInc, playersDec, countdownServer, gameStartServer
} = require('../store/game');

const { dispatch, getState } = store;

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`);

    socket.on('players-inc', () => {
      dispatch(playersInc());
      io.emit('update-players', getState().game.players);
    });

    socket.on('fetch-game', () => {
      socket.emit('send-game', getState().game);
    });

    socket.on('start-new-game', ({ gameType, gameYear, secondsRemaining }) => {
      // create a new game on the server store
      // for new players to grab game state

      // create a game timer
      const gameClock = createServerGameClock();

      // create a fresh game with timer, type, and year on local state
      dispatch(gameStartServer(gameClock, gameType, gameYear, secondsRemaining));
    });

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`);
      dispatch(playersDec());
      io.emit('update-players', getState().game.players);
    });
  });
};


// ----HELPER FUNCTIONS -----------------------------------------------
const createServerGameClock = () => {
  return setInterval(() => {
    const sec = getState().game.secondsRemaining;
    if (sec >= 0) {
      dispatch(countdownServer());
    } else {
      // no need to call endGame just yet
      // need to think about what this looks like on server
      // emits an event and clears gameState?
      // immediately starts a new game?

      // endGame();
    }
  }, 1000);
};
