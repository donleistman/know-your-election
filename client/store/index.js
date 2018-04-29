// CLIENT STORE

import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import candidates from './candidates';
import game from './game';
import mapAnswers from './mapAnswers';
import mapDisplay from './mapDisplay';
import mapNodes from './mapNodes';
import mapStatus from './mapStatus';
import message from './message';
import user from './user';


const reducer = combineReducers({
  candidates,
  game,
  mapAnswers,
  mapDisplay,
  mapNodes,
  mapStatus,
  message,
  user,
});
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
));
export const store = createStore(reducer, middleware);

export default store;
export * from './candidates';
export * from './mapAnswers';
export * from './mapDisplay';
export * from './mapNodes';
export * from './mapStatus';
export * from './message';
export * from './game';
export * from './user';
