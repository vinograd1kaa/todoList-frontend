import { combineReducers } from 'redux';
import projects from './projects';
import todoSettings from './todoSettings';
import { auth } from './auth';
import { todo } from './todo';

export const rootReducer = combineReducers({
  projects,
  auth,
  todo,
  todoSettings,
});

export type RootState = ReturnType<typeof rootReducer>;
