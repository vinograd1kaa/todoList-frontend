import { combineReducers } from 'redux';
import projects from './projects';
import todo from './todo';
import todoSettings from './todoSettings';

export const rootReducer = combineReducers({
  projects,
  todo,
  todoSettings,
});

// eslint-disable-next-line no-undef
export type RootState = ReturnType<typeof rootReducer>;
