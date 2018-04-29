import React from 'react';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import { toggleState, drawMap } from '../utils/gameLogic';
import { mapWidth, mapHeight } from '../utils/constants';
import { LeftSidebar, RightSidebar, BtnStart } from '.';

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
    const { isCurrentGame, isFirstGame } = this.props;

    return (
      <Segment.Group horizontal id="game">
        <LeftSidebar />
        <Segment id="map-container">
          <svg
            id="map"
            ref={node => this.node = node}
            width={mapWidth}
            height={mapHeight}
          />
          {!isCurrentGame && isFirstGame &&
            <div id="start-btn-container">
              <BtnStart gameType="solo" btnText="Play Solo" />
              <BtnStart gameType="collab" btnText="Play Online!" />
            </div>
          }
        </Segment>
        <RightSidebar />
      </Segment.Group>
    );
  }
}

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  return {
    mapStatus: state.mapStatus,
    isCurrentGame: state.game.isCurrentGame,
    isFirstGame: state.game.isFirstGame,
    mapNodes: state.game.mapNodes
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);

