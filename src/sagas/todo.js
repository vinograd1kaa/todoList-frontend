import { put, takeEvery } from 'redux-saga/effects';
import { ASYNC_SETTINGS_DATE, SETTINGS_DATE } from '../actions/TodoSettings';

export default function* fetchTodo(action) {
  localStorage.setItem('activeButton', action.payload.id);

  yield put({
    type: SETTINGS_DATE,
    payload: {
      id: action.payload.id,
      sortBy: action.payload.sortBy,
    },
  });
}

export function* fetchTodoWorker() {
  yield takeEvery(ASYNC_SETTINGS_DATE, fetchTodo);
}
