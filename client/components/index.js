/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export { default as Navbar } from './boilerplate/navbar';
export { default as UserHome } from './boilerplate/user-home';
export { Login, Signup } from './boilerplate/auth-form';

export { default as HeaderBar } from './HeaderBar';
export { default as MessageBar } from './MessageBar';

export { default as Home } from './Home';
export { default as Game } from './Game';
