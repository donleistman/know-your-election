import React from 'react';
import { connect } from 'react-redux';
import { Segment, Header } from 'semantic-ui-react';

export const MessageBar = (props) => {
  let { secondsRemaining, message } = props;

  if (secondsRemaining === -1) message = 'Time\'s Up!';
  return (
    <Segment clearing id="message-bar">
      <h3 id="message"
        className={secondsRemaining < 5 && secondsRemaining >= -1 && secondsRemaining !== null ? 'red' : null}>{message}</h3>
    </Segment>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    message: state.message,
    secondsRemaining: state.game.secondsRemaining
  };
};

const mapDispatch = dispatch => {
  return {
  };
};

export default connect(mapState, mapDispatch)(MessageBar);

