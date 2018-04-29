
const elections = [1976, 2016];

const colors = {
  democrat: 'rgb(101, 188, 228)', // #65bce4
  republican: 'rgb(238, 104, 80)', // #ee6850
  deselected: 'rgb(235, 235, 235)',
  disabled: 'rgb(245, 245, 245)',
  correct: 'rgb(117, 245, 112)',
  incorrect: 'rgb(179, 129, 129)',
  stroke: 'rgb(78, 78, 78)',
  strokeDisabled: 'rgb(200, 200, 200)'
};

const events = {
  playersInc: 'players-inc',
  playersDec: 'players-dec'
};

const mapWidth = 900;
const mapHeight = 500;

// for map display
const submitted = 'submitted';
const playing = 'playing';

module.exports = {
  elections,
  colors,
  events,
  mapWidth,
  mapHeight,
  submitted,
  playing
};

