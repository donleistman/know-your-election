import React from 'react';
import { connect } from 'react-redux';
import { Button, Segment } from 'semantic-ui-react';
import { updateMessage } from '../store';
import { answers } from '../utils';
import { startGame, checkMap, toggleState, drawMap } from '../utils/gameLogic';
import { mapWidth, mapHeight } from '../utils/properties';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.drawMap = drawMap.bind(this);
    this.toggleState = toggleState.bind(this);
  }

  componentDidMount() {
    this.drawMap();
  }

  render() {
    const { isCurrentGame, mapStatus, handleCheckMap } = this.props;

    return (
      <div>
        {!isCurrentGame
          ? <Button onClick={() => {
            startGame(this.states);
          }} >
            Start Game
            </Button>
          : <Button
            onClick={() => handleCheckMap(mapStatus, answers, '2008')}
          >
            Check Map
            </Button>
        }
        <Segment id="map-segment">
          <svg
            ref={node => this.node = node}
            width={mapWidth}
            height={mapHeight}
          />
        </Segment>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  return {
    mapStatus: state.mapStatus,
    isCurrentGame: state.game.isCurrentGame
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleCheckMap: (mapStatus, answer, year) => dispatch(updateMessage(checkMap(mapStatus, answer, year)))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);

