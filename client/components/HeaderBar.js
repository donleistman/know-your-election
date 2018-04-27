import React from 'react';
import { connect } from 'react-redux';
import { Segment, Header } from 'semantic-ui-react';

export const HeaderBar = (props) => {

  return (
    <Segment clearing>
      <Header as="h2" align="center">Welcome!</Header>
      <Header as="h3" align="center">Guess the electoral map for 2008</Header>
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

