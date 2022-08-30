import { all } from 'redux-saga/effects';
import projects from './projects';

export default function* rootSaga() {
  yield all([projects()]);
}
