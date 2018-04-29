import React from 'react';
import { connect } from 'react-redux';
import { Button, Segment } from 'semantic-ui-react';
import { endGame } from '../utils/gameLogic';
import { StartButton, Candidates } from '.';

const LeftSidebar = (props) => {
  const { isCurrentGame, isFirstGame } = props;

  return (
    <Segment id="leftSidebar">
      {isCurrentGame && <Button onClick={endGame}>End Game</Button>}
      {!isCurrentGame && !isFirstGame &&
        <StartButton btnText="Try Again" />}
      {isCurrentGame && <Candidates />}
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
    isCurrentGame: state.game.isCurrentGame
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftSidebar);

