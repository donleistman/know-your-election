export const checkMap = (map, answer, year) => {
  console.log('inside check map');
  let numStatesCorrect = 0;
  Object.keys(map).forEach(stateId => {
    if (answer[year][stateId].winner === map[stateId]) {
      numStatesCorrect++;
    }
  });
  console.log(`You got ${numStatesCorrect} / 51 states correct!`);
  return `You got ${numStatesCorrect} / 51 states correct!`;
};
