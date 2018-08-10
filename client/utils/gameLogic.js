import { select } from 'd3-selection';
import { geoPath, geoAlbersUsa } from 'd3-geo';

import socket from '../socket';
import { usStates, createGameClock } from '.';

import {
  store,
  clearMap,
  fetchAnswers,
  fetchCandidates,
  getMapNodes,
  gameStart,
  gameEnd,
  playFirstGame,
  updateMessage,
  updateMap,
  updateMapDisplay
} from '../store';

import {
  colors,
  elections,
  mapHeight,
  mapWidth,
  playing,
  submitted
} from './constants';

const { dispatch, getState } = store;

// ----HELPER FUNCTIONS -----------------------------------------------
// ----create a local game --------------------------------------------
export const createLocalGame = (
  gameType,
  gameYear = elections[Math.floor(Math.random() * elections.length)],
  secondsRemaining = 120,
  isGameOnServer = false,
  serverMap = null
) => {
  // create a game timer
  const gameClock = createGameClock();

  // create a fresh game with timer, type, and year on local state
  dispatch(gameStart(gameClock, gameType, gameYear, secondsRemaining));

  // grab candidates and answers from API
  dispatch(fetchAnswers(gameYear));
  dispatch(fetchCandidates(gameYear));

  if (gameType === 'collab' && !isGameOnServer) {
    // send an event to trigger game-start on the server
    socket.emit('start-new-game', { gameType, gameYear, secondsRemaining });
  }

  // clear out any previous game
  dispatch(clearMap());
  dispatch(updateMapDisplay(playing));

  // grab map nodes
  const mapNodes = getState().mapNodes;

  mapNodes
    .style('fill', () => {
      //TODO add in condition here for whether a state was present in a given year
      const stateExists = true;
      if (stateExists) return colors.deselected;
      else return colors.disabled;
    })
    .style('stroke', colors.stroke);

  if (isGameOnServer) {
    // change color to match serverMap
    let newColor;
    Object.keys(serverMap).forEach(stateId => {
      if (serverMap[stateId] === 'republican') {
        dispatch(updateMap(stateId, 'republican'));
        newColor = colors.republican;
      } else if (serverMap[stateId] === 'democrat') {
        dispatch(updateMap(stateId, 'democrat'));
        newColor = colors.democrat;
      }
      select(`#state${stateId}`).style('fill', newColor);
    });
  }
};

// ---- GAME LOOP -----------------------------------------------------
// --------------------------------------------------------------------

// --------- DRAW GAME MAP --------------------------------------------
export const drawMap = function() {
  const node = this.node;

  const projection = geoAlbersUsa()
    .translate([mapWidth / 2, mapHeight / 2])
    .scale([1100]);
  const path = geoPath().projection(projection);

  const mapNodes = select(node)
    .selectAll('path')
    .data(usStates.features)
    .enter()
    .append('path')
    .attr('d', path)
    .attr('id', data => {
      const stateId = Number(data.id);
      return 'state' + stateId;
    })
    .style('stroke', colors.strokeDisabled)
    .style('fill', () => {
      return colors.disabled;
    })
    .on('click', data => {
      // add in condition here for whether a state was present
      // in a given year
      const stateExists = true;
      if (stateExists) this.toggleState(data);
    });

  dispatch(getMapNodes(mapNodes));
};

// --------- START GAME ----------------------------------------------
export const startGame = gameType => {
  // if gameType is solo, disconnect socket
  if (gameType === 'solo') socket.disconnect();

  // set isFirstGame to false
  dispatch(playFirstGame());

  if (gameType === 'collab') {
    // FETCH GAME STATUS FROM SERVER
    // Listen for response in socket.js
    socket.emit('fetch-game');
  } else if (gameType === 'solo') {
    // CREATE A NEW LOCAL GAME
    createLocalGame(gameType);
  }
};

// ------ TOGGLE STATE ON CLICK -----------------------------------------
export const toggleState = function(data) {
  const { isCurrentGame, gameType } = getState().game;
  // update map state
  let newColor;
  const mapStatus = getState().mapStatus;
  const stateId = Number(data.id);

  if (isCurrentGame) {
    if (!mapStatus[stateId] || mapStatus[stateId] === 'republican') {
      dispatch(updateMap(stateId, 'democrat'));
      newColor = colors.democrat;
      if (gameType === 'collab') {
        socket.emit('toggle-state', { stateId, party: 'democrat' });
      }
    } else if (mapStatus[stateId] === 'democrat') {
      dispatch(updateMap(stateId, 'republican'));
      newColor = colors.republican;
      if (gameType === 'collab') {
        socket.emit('toggle-state', { stateId, party: 'republican' });
      }
    }

    select(`#state${stateId}`).style('fill', newColor);
  }
};

// --------- END GAME ----------------------------------------------
export const endGame = () => {
  clearInterval(getState().game.gameClock);
  dispatch(gameEnd());
  checkMap();
};

// -------- CHECK THE MAP ----------------------------------------------
export const checkMap = () => {
  const { mapAnswers, mapStatus } = getState();

  let numStatesCorrect = 0;
  Object.keys(mapAnswers).forEach(stateId => {
    if (mapAnswers[stateId].winner === mapStatus[stateId]) {
      numStatesCorrect++;
    }
  });

  showMapSubmittedAnswers();

  dispatch(updateMessage(`You got ${numStatesCorrect} / 50 states correct!`));
};

// ------ CONTROL MAP DISPLAY -------------------------------------------
export const showMapSubmittedAnswers = () => {
  const { mapAnswers, mapStatus } = getState();

  Object.keys(mapAnswers).forEach(stateId => {
    if (mapAnswers[stateId].winner === mapStatus[stateId]) {
      select(`#state${stateId}`).style('fill', colors.correct);
    } else {
      select(`#state${stateId}`).style('fill', colors.incorrect);
    }
  });

  dispatch(updateMapDisplay(submitted));
};

export const showMapAnswers = () => {
  const { mapAnswers } = getState();

  Object.keys(mapAnswers).forEach(stateId => {
    const state = mapAnswers[stateId];
    select(`#state${stateId}`).style('fill', colors[state.winner]);
  });
  dispatch(updateMapDisplay(playing));
};
