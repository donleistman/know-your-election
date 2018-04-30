import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { startGame } from '../utils/gameLogic';

const BtnStart = (props) => {
  let { isFirstGame, btnText, gameType } = props;

  if (!btnText) btnText = 'placeholder text';
  console.log('gameType in BtnStart props', gameType);

  return (
    <Button
      id={isFirstGame ? 'start-btn' : ' '}
      onClick={() => {
        startGame(gameType);
      }} >
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
    isFirstGame: state.game.isFirstGame,
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BtnStart);

