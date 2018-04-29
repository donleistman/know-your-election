import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { startGame } from '../utils/gameLogic';

const StartButton = (props) => {
  let { isFirstGame, btnText } = props;

  if (!btnText) btnText = 'Start Game';

  return (
    <Button
      id={isFirstGame ? 'start-btn' : ' '}
      onClick={startGame} >
      {btnText}
    </Button>
  );
};

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  return {
    mapStatus: state.mapStatus,
    isCurrentGame: state.game.isCurrentGame,
    isFirstGame: state.game.isFirstGame
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StartButton);

