export { usStates } from './us-states';
export { createGameClock } from './createGameClock';

export const capitalizeFirstLetter = (string) => {
  const result = string.charAt(0).toUpperCase() + string.slice(1);
  return result;
};
