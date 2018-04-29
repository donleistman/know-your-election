import io from 'socket.io-client';
import { store, playersInc, playersDec } from './store';
import { events } from './utils/constants';

// const { dispatch } = store;

const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('Connected!');
  console.log('events.playerInc', events.playerInc);

  socket.on(events.playersInc, () => {
    store.dispatch(playersInc());
  });

  socket.on(events.playersDec, () => {
    store.dispatch(playersDec());
  });
});

export default socket;
