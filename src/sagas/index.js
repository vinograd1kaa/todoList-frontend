import { all } from 'redux-saga/effects';
import projects from './projects';
import todoSettings from './todoSettings';

export default function* rootSaga() {
  yield all([projects()]);
  yield all([todoSettings()]);
}
