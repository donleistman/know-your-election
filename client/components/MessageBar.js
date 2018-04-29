import React from 'react';
import { connect } from 'react-redux';
import { Segment, Header } from 'semantic-ui-react';

export const MessageBar = (props) => {

  return (
    <Segment clearing id="message-bar">
      <h3 id="message">{props.message}</h3>
    </Segment>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    message: state.message
  };
};

const mapDispatch = dispatch => {
  return {
  };
};

export default connect(mapState, mapDispatch)(MessageBar);

