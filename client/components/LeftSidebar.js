/*eslint-disable complexity */

import React from 'react';
import { connect } from 'react-redux';
import { Button, Segment } from 'semantic-ui-react';
import { endGame } from '../utils/gameLogic';
import socket from '../socket';

import { BtnAnswers, BtnStart, Candidates } from '.';

const LeftSidebar = props => {
  const { isCurrentGame, isFirstGame, gameType } = props;
  let { players } = props;

  if (players < 1) players = 1;

  return (
    <Segment id="leftSidebar">
      {!isFirstGame && <Candidates />}
      {isCurrentGame && (
        <Button
          onClick={() => {
            if (gameType === 'collab') socket.emit('end-game');
            endGame();
          }}
        >
          End Game
        </Button>
      )}
      {!isCurrentGame &&
        !isFirstGame && <BtnStart gameType={gameType} btnText="Try Another" />}
      <br />
      <br />
      {!isCurrentGame &&
        !isFirstGame && <BtnAnswers btnText={'Show Correct Answers'} />}
      {gameType === 'collab' && <h3>{`${players} players online`}</h3>}
    </Segment>
  );
};

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  return {
    mapStatus: state.mapStatus,
    isFirstGame: state.game.isFirstGame,
    isCurrentGame: state.game.isCurrentGame,
    gameType: state.game.gameType,
    players: state.game.players
  };
};

export default connect(mapStateToProps)(LeftSidebar);
