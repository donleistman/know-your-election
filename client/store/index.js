import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import mapState from './mapState';
import user from './user';
import message from './message';
import game from './game';


const reducer = combineReducers({ mapState, user, message, game });
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
));
const store = createStore(reducer, middleware);

export default store;
export * from './mapState';
export * from './user';
export * from './message';
export * from './game';
