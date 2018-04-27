import React from 'react';
import { connect } from 'react-redux';
import { Game, HeaderBar, MessageBar } from '.';
import { usStates } from '../utils';


export const Home = () => {

  return (
    <div>
      <HeaderBar />
      <MessageBar />
      <Game
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

