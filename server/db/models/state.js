const Sequelize = require('sequelize');
const db = require('../db');

const State = db.define('state', {
  year: Sequelize.INTEGER,
  name: Sequelize.STRING,
  ev: Sequelize.INTEGER,
  votesWon: Sequelize.INTEGER
});

module.exports = State;

/**
 * instanceMethods
 */

/**
 * classMethods
 */


/**
 * hooks
 */
