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
  fetchCandidates
} from '../store';
import { usStates } from '.';

import {
  demColor,
  repubColor,
  deselectedColor,
  mapWidth, mapHeight,
  disabledColor
} from './properties';

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
    .attr('id', d => {
      return 'state' + d.id;
    })
    .style('fill', (d, i) => {
      // return `rgb(${i * 100 % 255}, 255, 255)`;
      return disabledColor;
    })
    .on('click', (d, i) => {
      // add in condition here for whether a state was present
      // in a given year
      const stateExists = true;
      if (stateExists) this.toggleState(d, i);
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

  mapNodes.style('fill', (d, i) => {
    // add in condition here for whether a state was present
    // in a given year
    const stateExists = true;
    if (stateExists) return deselectedColor;
    else return disabledColor;
  });



};

export const endGame = () => {
  clearInterval(store.getState().game.gameClock);
  dispatch(gameEnd());
  checkMap();
  console.log('game over!');
};

export const toggleState = function (d, i) {
  const isCurrentGame = store.getState().game.isCurrentGame;
  // update map state
  let newColor;
  const mapStatus = this.props.mapStatus;
  const stateId = Number(d.id);

  if (isCurrentGame) {
    if (!mapStatus[stateId] || mapStatus[stateId] === '-') {
      dispatch(updateMap(stateId, 'Democrat'));
      newColor = demColor;
    } else if (mapStatus[stateId] === 'Democrat') {
      dispatch(updateMap(stateId, 'Republican'));
      newColor = repubColor;
    } else if (mapStatus[stateId] === 'Republican') {
      dispatch(updateMap(stateId, '-'));
      newColor = deselectedColor;
    }
    select(`#state${d.id}`)
      .style('fill', newColor);
  }
};


export const checkMap = () => {
  const { mapAnswers, mapStatus } = store.getState();

  let numStatesCorrect = 0;
  Object.keys(mapStatus).forEach(stateId => {
    if (mapAnswers[stateId].winner === mapStatus[stateId]) {
      numStatesCorrect++;
    }
  });
  dispatch(updateMessage(`You got ${numStatesCorrect} / 51 states correct!`));

  // TODO Change map color to reflect correct answers
  const mapNodes = store.getState().mapNodes;
  mapNodes.style('fill', disabledColor);

};
