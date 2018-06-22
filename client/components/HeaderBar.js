import React from 'react';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';

export const HeaderBar = props => {
  const { gameYear } = props;

  return (
    <Segment clearing id="header-container">
      <h1 id="banner">
        <div className="banner-icon" />
        MAKE HISTORY
        <div className="banner-icon" />
      </h1>
      <h2 id="sub-banner">Guess the electoral map</h2>
      {gameYear && <h2 id="year">{gameYear}</h2>}
    </Segment>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    gameYear: state.game.gameYear
  };
};

export default connect(mapState)(HeaderBar);
