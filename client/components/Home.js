import React from 'react';
import { connect } from 'react-redux';
import { Game, HeaderBar, MessageBar } from '.';

export const Home = () => {

  return (
    <div>
      <HeaderBar />
      <MessageBar />
      <Game />
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

