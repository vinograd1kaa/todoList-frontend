import { combineReducers } from 'redux';
import projects from './projects';
import todo from './todo';

export default combineReducers({
  projects,
  todo,
});
