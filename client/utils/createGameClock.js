import { store, countdown, updateMessage } from '../store';
import socket from '../socket';
import { endGame } from './gameLogic';

const { dispatch, getState } = store;

export const createGameClock = () => {
  const gameClock = setInterval(() => {
    const { secondsRemaining, gameType } = getState().game;
    if (secondsRemaining >= 0) {
      dispatch(updateMessage(`${Math.floor(secondsRemaining / 60)}:${secondsRemaining % 60 < 10 ? '0' : ''}${secondsRemaining % 60}`));
      dispatch(countdown());
    } else {
      endGame();
      if (gameType === 'collab') {
        socket.emit('end-game');
      }
      clearInterval(gameClock);
    }
  }, 1000);

  return gameClock;
};
