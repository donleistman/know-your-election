import { select } from 'd3-selection';
import { store, updateMap } from '../store';
import {
  demColor,
  repubColor,
  deselectedColor,
  disabledColor
} from './properties';

const { dispatch } = store;

export const toggleState = function (d, i) {
  // update map state
  let newColor;
  const map = this.props.mapState;

  if (!map[d.id] || map[d.id] === '-') {
    dispatch(updateMap(d.id, 'D'));
    newColor = demColor;
  } else if (map[d.id] === 'D') {
    dispatch(updateMap(d.id, 'R'));
    newColor = repubColor;
  } else if (map[d.id] === 'R') {
    dispatch(updateMap(d.id, '-'));
    newColor = deselectedColor;
  }
  select(`#state${d.id}`)
    .style('fill', newColor);
};

export const checkMap = (mapState, answer, year) => {
  let numStatesCorrect = 0;
  Object.keys(mapState).forEach(stateId => {
    if (answer[year][stateId].winner === mapState[stateId]) {
      numStatesCorrect++;
    }
  });
  return `You got ${numStatesCorrect} / 51 states correct!`;
};
