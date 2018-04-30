import React from 'react';
import { connect } from 'react-redux';
import { Container, Divider, Segment } from 'semantic-ui-react';
import { colors, playing } from '../utils/constants';
import { capitalizeFirstLetter } from '../utils';


const Candidates = (props) => {
  const { candidates, mapDisplay } = props;

  const showCandidates = mapDisplay === playing;

  const labels = [
    { id: 1, name: 'Correct!', party: 'Correct' },
    { id: 2, name: 'Wrong!', party: 'Incorrect' },
  ];

  let legend;

  if (showCandidates) legend = candidates;
  else legend = labels;

  return (
    <Segment id="candidates">
      {legend && legend.map((candidate, index) => (
        <Container key={candidate.id}>
          <Segment
            className={'party-label'}
            style={{ backgroundColor: colors[candidate.party.toLowerCase()] }}
          >
            {showCandidates && capitalizeFirstLetter(candidate.party)}
          </Segment>
          <div className="candidate-name">{candidate.name}</div>
          {(index !== legend.length - 1) && <Divider />}
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
    candidates: state.candidates,
    mapDisplay: state.mapDisplay
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Candidates);

