import React from 'react';
import { connect } from 'react-redux';
import { Map } from '.';
import { usStates } from '../utils';

export const Home = (props) => {

  return (
    <div>
      home component
      <Map
        size={[900, 500]} // for bar chart test
        usStates={usStates}
      />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
  };
};

const mapDispatch = dispatch => {
  return {
  };
};

export default connect(mapState, mapDispatch)(Home);

