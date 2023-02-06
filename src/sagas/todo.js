import { put, takeEvery } from 'redux-saga/effects';
import moment from 'moment/moment';
import {
  ADD_SUB_TASK,
  ADD_TASK,
  ASYNC_ADD_SUB_TASK,
  ASYNC_ADD_TASK,
  ASYNC_CHANGE_IS_CALENDAR_OPEN,
  ASYNC_CHANGE_IS_CHECKED,
  ASYNC_CHANGE_IS_EXPANDED,
  ASYNC_CHANGE_TASK_TITLE,
  ASYNC_CONFIRM_CHANGE_POS,
  ASYNC_DELETE_TASK,
  ASYNC_GET_POSTS,
  CHANGE_IS_CALENDAR_OPEN,
  CHANGE_IS_CHECKED,
  CHANGE_IS_EXPANDED,
  CHANGE_TASK_TITLE,
  CONFIRM_CHANGE_POS,
  DELETE_TASK,
  GET_POSTS,
} from '../actions/Todo';
import axios from '../axios';
import { getSubTasksId } from '../utils/todo';
import { findTask } from '../reducers/todo';

export function* fetchGetPosts(action) {
  try {
    const { data } = yield axios.get(`/posts/${action.payload.idAuthUser}`);

    yield put({
      type: GET_POSTS,
      payload: {
        posts: data,
      },
    });
  } catch (err) {
    console.warn('Ошибка при получении статей', err);
  }
}

export function* fetchAddTask(action) {
  try {
    const { data } = yield axios.post('/posts', action.payload.fields);

    yield put({
      type: ADD_TASK,
      payload: {
        id: data._id,
        title: action.payload.title,
      },
    });
  } catch (err) {
    console.warn('Ошибка при создании статьи', err);
  }
}

export function* fetchAddSubTask(action) {
  try {
    const { data } = yield axios.post('/posts', action.payload.fields);

    yield put({
      type: ADD_SUB_TASK,
      payload: {
        id: action.payload.id,
        idOfSubItem: data._id,
        title: action.payload.title,
      },
    });
  } catch (err) {
    console.warn('Ошибка при обновлении статьи', err);
  }
}

export function* fetchUpdateTitle(action) {
  try {
    yield axios.patch(`/posts/title/${action.payload.id}`, { title: action.payload.title });
  } catch (err) {
    console.warn('Ошибка при обновлении статьи', err);
  }

  yield put({
    type: CHANGE_TASK_TITLE,
    payload: {
      id: action.payload.id,
      title: action.payload.title,
    },
  });
}

export function* fetchUpdateIsChecked(action) {
  try {
    const allIdsToChangeChecked = getSubTasksId(
      Object.values(action.payload.items),
      action.payload.id,
    );
    yield axios.patch('/posts/isChecked', {
      ids: allIdsToChangeChecked,
      isChecked: !action.payload.isChecked,
    });
  } catch (err) {
    console.warn('Ошибка при обновлении статьи', err);
  }

  yield put({
    type: CHANGE_IS_CHECKED,
    payload: {
      id: action.payload.id,
      isChecked: action.payload.isChecked,
    },
  });
}

export function* fetchUpdateIsExpanded(action) {
  try {
    yield axios.patch(`/posts/isExpanded/${action.payload.id}`, {
      isExpanded: !action.payload.isExpanded,
    });
  } catch (err) {
    console.warn('Ошибка при обновлении статьи');
  }

  yield put({
    type: CHANGE_IS_EXPANDED,
    payload: {
      id: action.payload.id,
      isExpanded: action.payload.isExpanded,
    },
  });
}

export function* fetchUpdatePosition(action) {
  try {
    const allIdsToChangeDate = getSubTasksId(
      Object.values(action.payload.items),
      action.payload.changePosItemId,
    );
    const itemToChangeTo = findTask(action.payload.items, action.payload.id) || '';

    yield axios.patch(`/posts/changePos/${allIdsToChangeDate[0]}`, {
      ids: allIdsToChangeDate,
      parentId: itemToChangeTo.id,
      currentTime: itemToChangeTo.date.current,
    });
  } catch (err) {
    console.warn('Ошибка при обновлении статьи', err);
  }

  yield put({
    type: CONFIRM_CHANGE_POS,
    payload: {
      id: action.payload.id,
      changePosItemId: action.payload.changePosItemId,
    },
  });
}

export function* fetchDelete(action) {
  try {
    const allIdsToDelete = getSubTasksId(Object.values(action.payload.items), action.payload.id);
    yield axios.delete('/posts', { data: allIdsToDelete });
  } catch (err) {
    console.warn('Ошибка при удалении статей', err);
  }

  yield put({
    type: DELETE_TASK,
    payload: {
      id: action.payload.id,
    },
  });
}

export function* fetchUpdateDate(action) {
  try {
    const allIdsToChangeDate = getSubTasksId(
      Object.values(action.payload.items),
      action.payload.id,
    );

    axios.patch(`/posts/date/${allIdsToChangeDate[0]}`, {
      ids: allIdsToChangeDate,
      parentId: null,
      date: { current: action.payload.date, time: moment().format('h:mm:ss') },
    });
  } catch (err) {
    console.warn('Ошибка при обновлении статей', err);
  }

  yield put({
    type: CHANGE_IS_CALENDAR_OPEN,
    payload: {
      id: action.payload.id,
      date: action.payload.date,
    },
  });
}

export function* fetchTodoPostsWorker() {
  yield takeEvery(ASYNC_GET_POSTS, fetchGetPosts);
  yield takeEvery(ASYNC_ADD_TASK, fetchAddTask);
  yield takeEvery(ASYNC_ADD_SUB_TASK, fetchAddSubTask);
  yield takeEvery(ASYNC_CHANGE_TASK_TITLE, fetchUpdateTitle);
  yield takeEvery(ASYNC_CHANGE_IS_CHECKED, fetchUpdateIsChecked);
  yield takeEvery(ASYNC_CHANGE_IS_EXPANDED, fetchUpdateIsExpanded);
  yield takeEvery(ASYNC_CONFIRM_CHANGE_POS, fetchUpdatePosition);
  yield takeEvery(ASYNC_DELETE_TASK, fetchDelete);
  yield takeEvery(ASYNC_CHANGE_IS_CALENDAR_OPEN, fetchUpdateDate);
}
