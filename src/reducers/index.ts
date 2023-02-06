import { combineReducers } from 'redux';
import projects from './projects';
import todo from './todo';
import todoSettings from './todoSettings';
// eslint-disable-next-line import/named
import { auth } from './auth';

export const rootReducer = combineReducers({
  projects,
  todo,
  todoSettings,
  auth,
});

export type RootState = ReturnType<typeof rootReducer>;
