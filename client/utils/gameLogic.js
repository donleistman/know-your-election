import { select } from 'd3-selection';
import { geoPath, geoAlbersUsa } from 'd3-geo';

import socket from '../socket';
import { usStates } from '.';

import {
  store,
  clearMap,
  countdown,
  fetchAnswers,
  fetchCandidates,
  getGameYear,
  getMapNodes,
  gameStart,
  gameEnd,
  playFirstGame,
  playersInc,
  playersDec,
  updateMessage,
  updateMap,
  updateMapDisplay
} from '../store';

import {
  colors,
  elections,
  events,
  mapHeight,
  mapWidth,
  playing,
  submitted
} from './constants';

const { dispatch, getState } = store;

// --------- DRAW GAME MAP --------------------------------------------
export const drawMap = function () {
  const node = this.node;

  const projection = geoAlbersUsa()
    .translate([mapWidth / 2, mapHeight / 2])
    .scale([1100]);
  const path = geoPath()
    .projection(projection);

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
      // return `rgb(${i * 100 % 255}, 255, 255)`;
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
export const startGame = (gameType) => {

  // clear out any previous game
  dispatch(clearMap());
  dispatch(updateMapDisplay(playing));

  // create a game timer
  const gameClock = setInterval(() => {
    const sec = getState().game.secondsRemaining;
    if (sec >= 0) {
      dispatch(updateMessage(`Seconds Remaining: ${sec}`));
      dispatch(countdown());
    } else {
      endGame();
    }
  }, 1000);

  // create a fresh game on local state
  dispatch(gameStart(gameClock, gameType));

  // if playing online, broadcast joining game
  console.log('outside inc player');
  console.log('gameType', gameType);
  console.log('getState().game.isFirstGame', getState().game.isFirstGame);
  if (gameType === 'collab' && getState().game.isFirstGame) {
    console.log('inside inc player');
    socket.emit('players-inc');
    // dispatch(playersInc());
  }

  // set isFirstGame to false
  dispatch(playFirstGame());

  // choose a random election, and grab data from API
  const randomElectionYear = elections[Math.floor(Math.random() * elections.length)];
  dispatch(getGameYear(randomElectionYear));
  dispatch(fetchAnswers(randomElectionYear));
  dispatch(fetchCandidates(randomElectionYear));

  // grab map nodes and change color to deselected
  const mapNodes = getState().mapNodes;
  mapNodes
    .style('fill', (d, i) => {
      //TODO add in condition here for whether a state was present in a given year
      const stateExists = true;
      if (stateExists) return colors.deselected;
      else return colors.disabled;
    })
    .style('stroke', colors.stroke);
};

// --------- END GAME ----------------------------------------------
export const endGame = () => {
  clearInterval(getState().game.gameClock);
  dispatch(gameEnd());
  checkMap();
};

// ------ TOGGLE STATE ON CLICK -----------------------------------------
export const toggleState = function (data) {
  const isCurrentGame = getState().game.isCurrentGame;
  // update map state
  let newColor;
  const mapStatus = this.props.mapStatus;
  const stateId = Number(data.id);

  if (isCurrentGame) {
    if (!mapStatus[stateId] || mapStatus[stateId] === 'Republican') {
      dispatch(updateMap(stateId, 'Democrat'));
      newColor = colors['democrat'];
    } else if (mapStatus[stateId] === 'Democrat') {
      dispatch(updateMap(stateId, 'Republican'));
      newColor = colors['republican'];
    }

    select(`#state${stateId}`)
      .style('fill', newColor);
  }
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
      select(`#state${stateId}`)
        .style('fill', colors.correct);
    } else {
      select(`#state${stateId}`)
        .style('fill', colors.incorrect);
    }
  });

  dispatch(updateMapDisplay(submitted));
};

export const showMapAnswers = () => {
  const { mapAnswers } = getState();

  Object.keys(mapAnswers).forEach(stateId => {
    const state = mapAnswers[stateId];
    select(`#state${stateId}`)
      .style('fill', colors[state.winner.toLowerCase()]);
  });
  dispatch(updateMapDisplay(playing));
};
