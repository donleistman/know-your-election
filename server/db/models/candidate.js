const Sequelize = require('sequelize');
const db = require('../db');

const Candidate = db.define('candidate', {
  name: Sequelize.STRING,
  party: Sequelize.STRING,
  year: Sequelize.INTEGER
});

module.exports = Candidate;

/**
 * instanceMethods
 */

/**
 * classMethods
 */


/**
 * hooks
 */
