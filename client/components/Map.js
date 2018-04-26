import React from 'react';
import { connect } from 'react-redux';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection';
import { geoPath, geoAlbersUsa } from 'd3-geo';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.drawMap.bind(this);
    // this.createBarChart.bind(this)
  }

  width = this.props.size[0];
  height = this.props.size[1];

  componentDidMount() {
    console.log('component did mount!');
    this.drawMap();
    // this.createBarChart();
  }

  drawMap() {
    console.log('in draw map function');

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
      .attr('id', d => 'state' + d.id)
      .style('fill', (d, i) => {
        // return `rgb(${i * 100 % 255}, 255, 255)`;
        return 'gray';
      })
      .on('click', d => {
        // update map state
        let newColor;
        if (!this.state[d.id] || this.state[d.id] === 'gray') {
          this.setState({ [d.id]: 'blue' })
          newColor = 'blue';
        } else if (this.state[d.id] === 'blue') {
          this.setState({ [d.id]: 'red' })
          newColor = 'red';
        } else if (this.state[d.id] === 'red') {
          this.setState({ [d.id]: 'gray' })
          newColor = 'gray';
        }
        console.log(d);
        console.log(d.properties.name, d.id);
        select(`#state${d.id}`)
          .style('fill', newColor);
      })
      ;


  }

  // createBarChart() {
  //   const node = this.node
  //   const dataMax = max(this.props.data);
  //   const yScale = scaleLinear()
  //     .domain([0, dataMax])
  //     .range([0, this.props.size[1]])

  //   select(node)
  //     .selectAll('rect')
  //     .data(this.props.data)
  //     .enter()
  //     .append('rect')

  //   select(node)
  //     .selectAll('rect')
  //     .data(this.props.data)
  //     .exit()
  //     .remove()

  //   select(node)
  //     .selectAll('rect')
  //     .data(this.props.data)
  //     .style('fill', '#fe9922')
  //     .attr('x', (d, i) => i * 25)
  //     .attr('y', d => this.props.size[1] - yScale(d))
  //     .attr('height', d => yScale(d))
  //     .attr('width', 25)
  // }

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
  };
};

const mapDispatch = dispatch => {
  return {
    updateMap: (stateId, status) => dispatch(updateMap(stateId, status))
  };
};

export default connect(mapState, mapDispatch)(Map);

