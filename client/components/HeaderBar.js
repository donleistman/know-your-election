import React from 'react';
import { connect } from 'react-redux';
import { Segment, Header } from 'semantic-ui-react';

export const HeaderBar = (props) => {

  return (
    <Segment clearing id="header-container">
      <h1 id="banner">Fill in the Map!</h1>
      <h2 id="sub-banner">Guess the electoral map for 2008</h2>
    </Segment>
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

export default connect(mapState, mapDispatch)(HeaderBar);

