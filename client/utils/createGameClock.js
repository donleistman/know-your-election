import { store, countdown, updateMessage } from '../store';
import { endGame } from './gameLogic';

const { dispatch, getState } = store;

export const createGameClock = () => {
  return setInterval(() => {
    const sec = getState().game.secondsRemaining;
    if (sec >= 0) {
      dispatch(updateMessage(`Seconds Remaining: ${sec}`));
      dispatch(countdown());
    } else {
      endGame();
    }
  }, 1000);
}

