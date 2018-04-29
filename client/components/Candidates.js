import React from 'react';
import { connect } from 'react-redux';
import { Container, Divider, Segment } from 'semantic-ui-react';


const Candidates = (props) => {
  const { candidates } = props;

  return (
    <Segment id="candidates">
      {candidates && candidates.map((candidate, index) => (
        <Container key={candidate.id}>
          <Segment
            className={candidate.party.toLowerCase() + ' party'}
          >
            {candidate.party}
          </Segment>
          <div className="candidate-name">{candidate.name}</div>
          {(index !== candidates.length - 1) && <Divider />}
        </Container>
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

