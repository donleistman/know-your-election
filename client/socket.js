// CLIENT SOCKET

import io from 'socket.io-client';
import { store, playersInc, playersDec, updatePlayers } from './store';

// const { dispatch } = store;

const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('Connected!');

  // socket.on('players-inc', () => {
  //   store.dispatch(playersInc());
  // });

  // socket.on(players-dec, () => {
  //   store.dispatch(playersDec());
  // });

  socket.on('update-players', (numPlayers) => {
    console.log('IN UPDATE PLAYERS CLIENT SOCKET')
    store.dispatch(updatePlayers(numPlayers));
  });
});

export default socket;
