import { combineReducers } from 'redux';
import projects from './projects';
import todo from './todo/index';

export default combineReducers({
  projects,
  todo,
});
