import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import mapStatus from './mapStatus';
import mapNodes from './mapNodes';
import user from './user';
import message from './message';
import game from './game';
import mapAnswers from './mapAnswers';
import candidates from './candidates';


const reducer = combineReducers({
  mapNodes,
  mapStatus,
  user,
  message,
  game,
  mapAnswers,
  candidates
});
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
));
export const store = createStore(reducer, middleware);

export default store;
export * from './mapStatus';
export * from './mapNodes';
export * from './user';
export * from './message';
export * from './game';
export * from './mapAnswers';
export * from './candidates';
