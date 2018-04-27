import React from 'react';
import { connect } from 'react-redux';
import { select } from 'd3-selection';
import { geoPath, geoAlbersUsa } from 'd3-geo';
import { updateMap, updateMessage, startGame } from '../store';
import { checkMap, answers } from '../utils';
import { Button, Segment } from 'semantic-ui-react';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.drawMap.bind(this);
  }

  width = this.props.size[0];
  height = this.props.size[1];

  componentDidMount() {
    this.drawMap();
  }

  drawMap() {
    const handleUpdateMap = this.props.handleUpdateMap;

    const node = this.node;
    const w = this.width;
    const h = this.height;

    const demColor = 'rgb(27, 93, 216)';
    const repubColor = 'rgb(212, 47, 47)';
    const deselectedColor = 'rgb(165, 165, 165)';
    const disabledColor = 'rgb(238, 238, 238)';

    const projection = geoAlbersUsa()
      .translate([w / 2, h / 2])
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
      .on('click', (d, i) => {
        // update map state
        let newColor;
        const map = this.props.map;

        if (!map[d.id] || map[d.id] === '-') {
          handleUpdateMap(d.id, 'D');
          newColor = demColor;
        } else if (map[d.id] === 'D') {
          handleUpdateMap(d.id, 'R');
          newColor = repubColor;
        } else if (map[d.id] === 'R') {
          handleUpdateMap(d.id, '-');
          newColor = deselectedColor;
        }
        select(`#state${d.id}`)
          .style('fill', newColor);
      });
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
            width={this.width}
            height={this.height}
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
    handleUpdateMap: (stateId, status) => dispatch(updateMap(stateId, status)),
    handleCheckMap: (mapState, answer, year) => dispatch(updateMessage(checkMap(mapState, answer, year))),
    handleStartGame: () => dispatch(startGame())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);

