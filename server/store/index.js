// SERVER STORE

import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import game from './game';


const reducer = combineReducers({
  game
});
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
));
export const store = createStore(reducer, middleware);

export default store;
export * from './game';
