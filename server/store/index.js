// SERVER STORE

const { createStore, combineReducers, applyMiddleware } = require('redux');
const createLogger = require('redux-logger');
const { composeWithDevTools } = require('redux-devtools-extension');

const game = require('./game');
const mapStatus = require('./mapStatus');

const reducer = combineReducers({
  game: game.reducer,
  mapStatus: mapStatus.reducer
});

const middleware = composeWithDevTools(applyMiddleware(createLogger()));

const store = createStore(reducer, middleware);

module.exports = store;
