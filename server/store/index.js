// SERVER STORE

const { createStore, combineReducers, applyMiddleware } = require('redux');
const createLogger = require('redux-logger');
// const thunkMiddleware = require('redux-thunk');
const { composeWithDevTools } = require('redux-devtools-extension');

const game = require('./game');

const reducer = combineReducers({
  game: game.reducer
});

// HAD TO TAKE OUT MIDDLEWARE DUE TO AN ERROR
// don't think its necessary on server-side anyway
// delete when sure

const middleware = composeWithDevTools(applyMiddleware(
  // thunkMiddleware,
  createLogger()
));

const store = createStore(reducer, middleware);

module.exports = store;

