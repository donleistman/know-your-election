import { store, countdown, updateMessage } from '../store';
import socket from '../socket';
import { endGame } from './gameLogic';

const { dispatch, getState } = store;

export const createGameClock = () => {
  console.log('creating local game clock on ln8')
  const gameClock = setInterval(() => {
    const { secondsRemaining, gameType } = getState().game;
    console.log(`Seconds Remaining: ${secondsRemaining}`);
    if (secondsRemaining >= 0) {
      dispatch(updateMessage(`${secondsRemaining}`));
      dispatch(countdown());
    } else {
      console.log('calling endGame from ln15 in createGameClock');
      endGame();
      if (gameType === 'collab') {
        socket.emit('end-game');
      }
      clearInterval(gameClock);
    }
  }, 1000);

  return gameClock;
}

