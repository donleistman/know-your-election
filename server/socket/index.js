// SERVER SOCKET

const store = require('../store');
const {
  playersInc, playersDec, countdownServer, gameStartServer, gameEndServer
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
      const serverGame = getState().game;
      const { gameYear, gameType, secondsRemaining, isCurrentGame } = serverGame;
      socket.emit('send-game', { gameYear, gameType, secondsRemaining, isCurrentGame });
    });

    socket.on('start-new-game', ({ gameType, gameYear, secondsRemaining }) => {
      // create a new game on the server store
      // for new players to grab game state

      // create a game timer
      const gameClock = createServerGameClock();

      // create a fresh game with timer, type, and year on local state
      dispatch(gameStartServer(gameClock, gameType, gameYear, secondsRemaining));

      // emit event to cause clients to pull down new game
      socket.broadcast.emit('new-game');
    });

    socket.on('toggle-state', ({ stateId, party }) => {
      socket.broadcast.emit('toggle-state', { stateId, party });
    });

    socket.on('end-game', () => {
      // tell clients to all end their games
      socket.broadcast.emit('end-game');

      // clear the game state
      dispatch(gameEndServer());
    });

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`);
      dispatch(playersDec());
      io.emit('update-players', getState().game.players);
    });

    // ----HELPER FUNCTIONS -----------------------------------------------
    const createServerGameClock = () => {
      const gameClock = setInterval(() => {
        const sec = getState().game.secondsRemaining;
        if (sec >= 0) {
          dispatch(countdownServer());
        } else {
          // io.emit('end-game');
          clearInterval(gameClock);
        }
      }, 1000);

      return gameClock;
    };
  });
};



