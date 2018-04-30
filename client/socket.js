// CLIENT SOCKET

import io from 'socket.io-client';
import { select } from 'd3-selection';

import { store, updatePlayers, updateMap } from './store';
import { createLocalGame } from './utils/gameLogic';
import { colors } from './utils/constants';

const { dispatch } = store;

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
      console.log('there is a current game already!');
      console.log('here is what it looks like', serverGame);
      const { gameYear, secondsRemaining } = serverGame;
      createLocalGame('collab', gameYear, secondsRemaining);
    }
  });

  socket.on('toggle-state', ({ stateId, party }) => {
    let newColor;

    if (party === 'democrat') {
      dispatch(updateMap(stateId, 'Democrat'));
    } else if (party === 'republican') {
      dispatch(updateMap(stateId, 'Republican'));
    }

    newColor = colors[party.toLowerCase()];

    select(`#state${stateId}`)
      .style('fill', newColor);
  });

});

export default socket;
