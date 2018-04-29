// CLIENT SOCKET

import io from 'socket.io-client';
import { store, playersInc, playersDec, updatePlayers } from './store';
import { events } from './utils/constants';

// const { dispatch } = store;

const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('Connected!');
  console.log('events.playersInc', events.playersInc);

  // socket.on(events.playersInc, () => {
  //   store.dispatch(playersInc());
  // });

  // socket.on(events.playersDec, () => {
  //   store.dispatch(playersDec());
  // });

  socket.on(events.updatePlayers, (numPlayers) => {
    console.log('IN UPDATE PLAYERS CLIENT SOCKET')
    store.dispatch(updatePlayers(numPlayers));
  });
});

export default socket;
