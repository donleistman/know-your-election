import React from 'react';
import { connect } from 'react-redux';
import { select } from 'd3-selection';
import { geoPath, geoAlbersUsa } from 'd3-geo';
import { updateMessage, startGame } from '../store';
import { checkMap, answers, toggleState } from '../utils';
import { Button, Segment } from 'semantic-ui-react';
import { deselectedColor, mapWidth, mapHeight } from '../utils/properties';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.drawMap = this.drawMap.bind(this);
    this.toggleState = toggleState.bind(this);
  }

  componentDidMount() {
    this.drawMap();
  }

  drawMap() {
    const node = this.node;

    const projection = geoAlbersUsa()
      .translate([mapWidth / 2, mapHeight / 2])
      .scale([1100]);
    const path = geoPath()
      .projection(projection);

    select(node)
      .selectAll('path')
      .data(this.props.usStates.features)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('id', d => {
        return 'state' + d.id;
      })
      .style('fill', (d, i) => {
        // return `rgb(${i * 100 % 255}, 255, 255)`;
        return deselectedColor;
      })
      .on('click', this.toggleState);
  }

  render() {
    return (
      <div>
        {!this.props.currentGame
          ? <Button onClick={this.props.handleStartGame} >
            Start Game
        </Button>
          : <Button onClick={() => this.props.handleCheckMap(this.props.map, answers, '2008')} >
            Check Map
        </Button>}
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
    mapState: state.mapState,
    currentGame: state.game.isCurrentGame
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleCheckMap: (mapState, answer, year) => dispatch(updateMessage(checkMap(mapState, answer, year))),
    handleStartGame: () => dispatch(startGame())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);

