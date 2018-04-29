import React from 'react';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';


const RightSidebar = (props) => {

  return (
    <Segment id="rightSidebar">
    </Segment>
  );
};

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  return {
    mapStatus: state.mapStatus,
    isCurrentGame: state.game.isCurrentGame
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RightSidebar);

