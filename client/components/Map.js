import React from 'react';
import { connect } from 'react-redux';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection';
import { geoPath, geoAlbersUsa } from 'd3-geo';
import { updateMap } from '../store';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.drawMap.bind(this);
  }

  width = this.props.size[0];
  height = this.props.size[1];

  componentDidMount() {
    console.log('component did mount!');
    this.drawMap();
  }

  drawMap() {
    const updateMap = this.props.updateMap;

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
        console.log(d.id, d.properties.name);
        return 'state' + d.id;
      })
      .style('fill', (d, i) => {
        // return `rgb(${i * 100 % 255}, 255, 255)`;
        return 'gray';
      })
      .on('click', d => {
        // update map state
        let newColor;
        const map = this.props.map;

        if (!map[d.id] || map[d.id] === 'gray') {
          updateMap(d.id, 'blue');
          newColor = 'blue';
        } else if (map[d.id] === 'blue') {
          updateMap(d.id, 'red');
          newColor = 'red';
        } else if (map[d.id] === 'red') {
          updateMap(d.id, 'gray');
          newColor = 'gray';
        }
        select(`#state${d.id}`)
          .style('fill', newColor);
      })
      ;


  }

  render() {
    return (
      <div>
        <p>map component</p>
        <svg ref={node => this.node = node} width={this.width} height={this.height} />
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
    updateMap: (stateId, status) => dispatch(updateMap(stateId, status))
  };
};

export default connect(mapState, mapDispatch)(Map);

