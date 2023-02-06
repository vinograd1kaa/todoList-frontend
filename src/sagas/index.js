import { all } from 'redux-saga/effects';
import projects from './projects';
import todoSettings from './todoSettings';
import {
  fetchUpdateTitle,
  fetchUpdateIsExpanded,
  fetchAddSubTask,
  fetchAddTask,
  fetchGetPosts,
  fetchUpdateIsChecked,
  fetchUpdatePosition,
  fetchDelete,
  fetchUpdateDate,
} from './todo';

export default function* rootSaga() {
  yield all([projects()]);
  yield all([todoSettings()]);
  yield all([fetchUpdateTitle()]);
  yield all([fetchUpdateIsExpanded()]);
  yield all([fetchAddSubTask()]);
  yield all([fetchAddTask()]);
  yield all([fetchGetPosts()]);
  yield all([fetchUpdateIsChecked()]);
  yield all([fetchUpdatePosition()]);
  yield all([fetchDelete()]);
  yield all([fetchUpdateDate()]);
}
