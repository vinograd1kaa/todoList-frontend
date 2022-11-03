import { all } from 'redux-saga/effects';
import projects from './projects';
import todo from './todo';

export default function* rootSaga() {
  yield all([projects()]);
  yield all([todo()]);
}
