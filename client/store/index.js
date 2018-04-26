import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import map from './map';
import user from './user';

const reducer = combineReducers({ map, user });
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
));
const store = createStore(reducer, middleware);

export default store;
export * from './map';
export * from './user';
