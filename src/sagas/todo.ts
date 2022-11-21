import { put, takeEvery } from 'redux-saga/effects';
import { ASYNC_SETTINGS_DATE, SETTINGS_DATE } from '../actions/TodoSettings';

type FetchTodoTypeAction = {
  payload: {
    id: string;
    sortBy: string;
  };
};

export default function* fetchTodo(action: FetchTodoTypeAction) {
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
  // @ts-ignore
  yield takeEvery(ASYNC_SETTINGS_DATE, fetchTodo);
}
