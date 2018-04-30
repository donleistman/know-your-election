// CLIENT SOCKET

import io from 'socket.io-client';
import { store, updatePlayers } from './store';
import { createLocalGame } from './utils/gameLogic';

// const { dispatch } = store;

const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('Connected!');

  socket.on('update-players', (numPlayers) => {
    store.dispatch(updatePlayers(numPlayers));
  });

  socket.on('send-game', serverGame => {
    console.log('serverGame', serverGame);
    // if there is NOT a current game
    if (!serverGame.isCurrentGame) {
      // create a new game here
      createLocalGame('collab');
    } else {
      // if there is a current game on the server
      // dispatch the entire server game to local state
      console.log('there is a current game already!');
      console.log('here is what it looks like', serverGame);
    }
  });
});

export default socket;
