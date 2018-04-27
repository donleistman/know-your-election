export const checkMap = (mapState, answer, year) => {
  let numStatesCorrect = 0;
  Object.keys(mapState).forEach(stateId => {
    if (answer[year][stateId].winner === mapState[stateId]) {
      numStatesCorrect++;
    }
  });
  return `You got ${numStatesCorrect} / 51 states correct!`;
};
