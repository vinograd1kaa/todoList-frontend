import { takeLatest, call, put } from 'redux-saga/effects';
import { GET_PROJECTS_FAIL, GET_PROJECTS_PENDING, GET_PROJECTS_SUCCESS } from '../actions/Projects';

import service from '../api/projects';
import serviceMock from '../api/mocks/projects';

const getService = (isMocked = false) => (isMocked ? serviceMock : service);

function* fetchProjects(action) {
  try {
    const { search } = action.payload;
    const { data } = yield call(getService(true).getProjects, { search });
    yield put({
      type: GET_PROJECTS_SUCCESS,
      payload: {
        items: data,
      },
    });
  } catch (e) {
    yield put({
      type: GET_PROJECTS_FAIL,
      payload: e,
    });
  }
}

export default function* () {
  yield takeLatest(GET_PROJECTS_PENDING, fetchProjects);
}
