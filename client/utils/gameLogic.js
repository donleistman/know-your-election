import { select } from 'd3-selection';
import { geoPath, geoAlbersUsa } from 'd3-geo';
import { store, updateMap, gameStart, gameEnd } from '../store';
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
  const node = this.node;

  const projection = geoAlbersUsa()
    .translate([mapWidth / 2, mapHeight / 2])
    .scale([1100]);
  const path = geoPath()
    .projection(projection);

  this.states = select(node)
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
};


export const startGame = (states) => {
  store.dispatch(gameStart());
  states.style('fill', (d, i) => {
    // add in condition here for whether a state was present
    // in a given year
    const stateExists = true;
    if (stateExists) return deselectedColor;
    else return disabledColor;
  });

  // should instead set an interval to update game counter
  // then continually check state
  // and end the game when the seconds remaining on the state reaches 0
  setTimeout(endGame, 3000);
};

export const endGame = () => {
  store.dispatch(gameEnd());
  console.log('game over!');
};

export const toggleState = function (d, i) {
  const isCurrentGame = store.getState().game.isCurrentGame;
  // update map state
  let newColor;
  const mapStatus = this.props.mapStatus;

  if (isCurrentGame) {
    if (!mapStatus[d.id] || mapStatus[d.id] === '-') {
      dispatch(updateMap(d.id, 'D'));
      newColor = demColor;
    } else if (mapStatus[d.id] === 'D') {
      dispatch(updateMap(d.id, 'R'));
      newColor = repubColor;
    } else if (mapStatus[d.id] === 'R') {
      dispatch(updateMap(d.id, '-'));
      newColor = deselectedColor;
    }
    select(`#state${d.id}`)
      .style('fill', newColor);
  }
};


export const checkMap = (mapStatus, answer, year) => {
  let numStatesCorrect = 0;
  Object.keys(mapStatus).forEach(stateId => {
    if (answer[year][stateId].winner === mapStatus[stateId]) {
      numStatesCorrect++;
    }
  });
  return `You got ${numStatesCorrect} / 51 states correct!`;
};
