import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { showMapAnswers, showMapSubmittedAnswers } from '../utils/gameLogic';
import { submitted } from '../utils/constants';

const BtnAnswers = (props) => {
  let { btnText, mapDisplay } = props;

  btnText = mapDisplay === submitted
    ? 'Show Correct Answers'
    : 'Show Submitted Answers';

  return (
    <Button
      id="answers-btn"
      onClick={
        mapDisplay === submitted
          ? showMapAnswers
          : showMapSubmittedAnswers
      } >
      {btnText}
    </Button>
  );
};

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  return {
    mapDisplay: state.mapDisplay
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BtnAnswers);

