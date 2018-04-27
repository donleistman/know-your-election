import React from 'react';
import { connect } from 'react-redux';
import { select } from 'd3-selection';
import { geoPath, geoAlbersUsa } from 'd3-geo';
import { updateMap, updateMessage } from '../store';
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
        return 'gray';
      })
      .on('click', (d, i) => {
        // update map state
        let newColor;
        const map = this.props.map;

        if (!map[d.id] || map[d.id] === '-') {
          handleUpdateMap(d.id, 'D');
          newColor = 'blue';
        } else if (map[d.id] === 'D') {
          handleUpdateMap(d.id, 'R');
          newColor = 'red';
        } else if (map[d.id] === 'R') {
          handleUpdateMap(d.id, '-');
          newColor = 'gray';
        }
        select(`#state${d.id}`)
          .style('fill', newColor);
      });
  }

  render() {
    return (
      <div>
        <Segment id="map-segment">
          <svg
            ref={node => this.node = node}
            width={this.width}
            height={this.height}
          />
        </Segment>
        <Button onClick={() => this.props.handleCheckMap(this.props.map, answers, '2008')} >
          Check Map
        </Button>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    map: state.map
  };
};

const mapDispatch = dispatch => {
  return {
    handleUpdateMap: (stateId, status) => dispatch(updateMap(stateId, status)),
    handleCheckMap: (map, answer, year) => dispatch(updateMessage(checkMap(map, answer, year)))
  };
};

export default connect(mapState, mapDispatch)(Game);

