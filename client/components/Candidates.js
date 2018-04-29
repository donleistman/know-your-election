import React from 'react';
import { connect } from 'react-redux';
import { Button, Segment } from 'semantic-ui-react';
import { endGame } from '../utils/gameLogic';
import { StartButton } from '.';

const Candidates = (props) => {
  const { candidates } = props;

  return (
    <Segment id="candidates">
      {candidates && candidates.map(candidate => (
        <div key={candidate.id}>
          <div>{candidate.name}</div>
          <div>{candidate.party}</div>
        </div>
      ))}
    </Segment>
  );
};

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  return {
    candidates: state.candidates
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Candidates);

