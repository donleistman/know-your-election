import { select } from 'd3-selection';
import { geoPath, geoAlbersUsa } from 'd3-geo';
import {
  store,
  updateMessage,
  updateMap,
  getMapNodes,
  gameStart,
  gameEnd,
  countdown,
  fetchAnswers,
  fetchCandidates,
  updateMapDisplay
} from '../store';
import { usStates } from '.';

import {
  correct,
  correctColor,
  deselectedColor,
  disabledColor,
  disabledStrokeColor,
  incorrectColor,
  mapHeight,
  mapWidth,
  partyColors,
  strokeColor,
  submitted
} from './constants';

const { dispatch } = store;

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
    .style('stroke', disabledStrokeColor)
    .style('fill', () => {
      // return `rgb(${i * 100 % 255}, 255, 255)`;
      return disabledColor;
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
  const mapNodes = store.getState().mapNodes;
  const gameClock = setInterval(() => {
    const sec = store.getState().game.secondsRemaining;
    if (sec >= 0) {
      dispatch(updateMessage(`Seconds Remaining: ${sec}`));
      dispatch(countdown());
    } else {
      endGame();
    }
  }, 1000);

  dispatch(gameStart(gameClock));

  const year = 2016; //TODO determine random year
  dispatch(fetchAnswers(year));
  dispatch(fetchCandidates(year));

  mapNodes
    .style('fill', (d, i) => {
      // add in condition here for whether a state was present
      // in a given year
      const stateExists = true;
      if (stateExists) return deselectedColor;
      else return disabledColor;
    })
    .style('stroke', strokeColor);
};

export const endGame = () => {
  clearInterval(store.getState().game.gameClock);
  dispatch(gameEnd());
  checkMap();
  console.log('game over!');
};

export const toggleState = function (data) {
  const isCurrentGame = store.getState().game.isCurrentGame;
  // update map state
  let newColor;
  const mapStatus = this.props.mapStatus;
  const stateId = Number(data.id);

  if (isCurrentGame) {
    if (!mapStatus[stateId] || mapStatus[stateId] === 'Republican') {
      dispatch(updateMap(stateId, 'Democrat'));
      newColor = partyColors['democrat'];
    } else if (mapStatus[stateId] === 'Democrat') {
      dispatch(updateMap(stateId, 'Republican'));
      newColor = partyColors['republican'];
    }
    // else if (mapStatus[stateId] === 'Republican') {
    //   dispatch(updateMap(stateId, '-'));
    //   newColor = deselectedColor;
    // }
    select(`#state${stateId}`)
      .style('fill', newColor);
  }
};


export const checkMap = () => {
  const { mapAnswers, mapStatus } = store.getState();

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
  const { mapAnswers, mapStatus } = store.getState();

  Object.keys(mapAnswers).forEach(stateId => {
    if (mapAnswers[stateId].winner === mapStatus[stateId]) {
      select(`#state${stateId}`)
        .style('fill', correctColor);
    } else {
      select(`#state${stateId}`)
        .style('fill', incorrectColor);
    }
  });

  dispatch(updateMapDisplay(submitted));
};

export const showMapAnswers = () => {
  const { mapAnswers } = store.getState();

  Object.keys(mapAnswers).forEach(stateId => {
    const state = mapAnswers[stateId];
    select(`#state${stateId}`)
      .style('fill', partyColors[state.winner.toLowerCase()]);
  });
  dispatch(updateMapDisplay(correct));
};
