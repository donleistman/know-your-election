
const elections = [1964, 1976, 1996, 2004, 2016];

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


const mapWidth = 900;
const mapHeight = 500;

// for map display
const submitted = 'submitted';
const playing = 'playing';

module.exports = {
  elections,
  colors,
  mapWidth,
  mapHeight,
  submitted,
  playing
};

