import { select } from 'd3-selection';
import { geoPath, geoAlbersUsa } from 'd3-geo';

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

export const drawMap = function () {
  console.log('drawing map');
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


export const startGame = () => {
  console.log('game start!');
  dispatch(clearMap());
  dispatch(updateMapDisplay(playing));

  const mapNodes = getState().mapNodes;
  const gameClock = setInterval(() => {
    const sec = getState().game.secondsRemaining;
    if (sec >= 0) {
      dispatch(updateMessage(`Seconds Remaining: ${sec}`));
      dispatch(countdown());
    } else {
      endGame();
    }
  }, 1000);

  dispatch(gameStart(gameClock));

  const randomElectionYear = elections[Math.floor(Math.random() * elections.length)];

  dispatch(getGameYear(randomElectionYear));
  dispatch(fetchAnswers(randomElectionYear));
  dispatch(fetchCandidates(randomElectionYear));

  mapNodes
    .style('fill', (d, i) => {
      // add in condition here for whether a state was present
      // in a given year
      const stateExists = true;
      if (stateExists) return colors.deselected;
      else return colors.disabled;
    })
    .style('stroke', colors.stroke);
};

export const endGame = () => {
  clearInterval(getState().game.gameClock);
  dispatch(gameEnd());
  checkMap();
  console.log('game over!');
};

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
    // else if (mapStatus[stateId] === 'Republican') {
    //   dispatch(updateMap(stateId, '-'));
    //   newColor = colors.deselected;
    // }
    select(`#state${stateId}`)
      .style('fill', newColor);
  }
};


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
