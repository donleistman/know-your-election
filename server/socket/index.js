const { events } = require('../../client/utils/constants');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`);

    socket.on(events.playerInc, () => {
      console.log('a player has joined');
      socket.broadcast.emit(events.playersInc);
    });

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`);
      socket.emit(events.playersDec);
    });
  });
};
