import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { startGame } from '../utils/gameLogic';

const BtnStart = props => {
  let { isFirstGame, btnText, gameType } = props;

  return (
    <Button
      id={isFirstGame ? 'start-btn' : ' '}
      onClick={() => {
        startGame(gameType);
      }}
    >
      {btnText}
    </Button>
  );
};

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  return {
    isFirstGame: state.game.isFirstGame
  };
};

export default connect(mapStateToProps)(BtnStart);
