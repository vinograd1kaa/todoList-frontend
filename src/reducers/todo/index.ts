import { omit } from 'lodash';
import moment from 'moment';
import {
  GET_POSTS,
  ADD_SUB_TASK,
  ADD_TASK,
  CHANGE_TASK_TITLE,
  CHANGE_IS_EXPANDED,
  CONFIRM_CHANGE_POS,
  ITEM_ID_TO_MOVE,
  CHANGE_IS_CHECKED,
  DELETE_TASK,
  CHANGE_IS_CALENDAR_OPEN,
} from '../../actions/Todo';
import { getSubTasksId } from '../../utils/todo';
import { TodoItems, TodoReducerPayload, TodoReducerState } from './types';

const initialState: TodoReducerState = {
  items: {},
  itemIdToMove: null,
  itemIdCalendarOpen: null,
};

export const findTask = (items: TodoItems, id: string) => {
  return items[id];
};

export default function todoReducer(state = initialState, { type, payload }: TodoReducerPayload) {
  switch (type) {
    case GET_POSTS:
      const getItems = Object.values(payload.posts).reduce((acc, item) => {
        acc = {
          ...acc,
          [item._id]: { ...item, id: item._id },
        };
        return acc;
      }, {});

      return {
        ...state,
        items: getItems,
      };

    case ADD_TASK:
      return {
        ...state,
        items: {
          ...state.items,
          [payload.id]: {
            title: payload.title,
            id: payload.id,
            isExpanded: false,
            isChecked: false,
            parentId: null,
            date: { current: new Date().getTime(), time: moment().format('h:mm:ss') },
          },
        },
      };

    case ADD_SUB_TASK:
      if (!payload.title) return { ...state };

      findTask(state.items, payload.id).isExpanded = true;

      return {
        ...state,
        items: {
          [payload.idOfSubItem]: {
            title: payload.title,
            id: payload.idOfSubItem,
            isExpanded: false,
            isChecked: false,
            parentId: payload.id,
            date: findTask(state.items, payload.id).date || {
              current: new Date().getTime(),
              time: moment().format('h:mm:ss'),
            },
          },
          ...state.items,
        },
      };

    case CHANGE_TASK_TITLE:
      if (!payload.title) return { ...state };
      findTask(state.items, payload.id).title = payload.title;

      return {
        ...state,
        items: { ...state.items },
      };

    case CHANGE_IS_EXPANDED:
      findTask(state.items, payload.id).isExpanded = !payload.isExpanded;

      return {
        ...state,
        items: { ...state.items },
      };

    case CHANGE_IS_CHECKED:
      const changeIsCheckedTasks = (parentId: string, items: TodoItems) => {
        const allIds = getSubTasksId(Object.values(items), parentId);
        return allIds.map((id) => (items[id].isChecked = !payload.isChecked));
      };

      changeIsCheckedTasks(payload.id, state.items);

      return {
        ...state,
        items: { ...state.items },
      };

    case CONFIRM_CHANGE_POS:
      let newDateObj = { ...state.items };
      const allIdsDateToChange = getSubTasksId(Object.values(state.items), payload.changePosItemId);
      const itemToChangeTo = findTask(state.items, payload.id);

      allIdsDateToChange.forEach((id) => {
        newDateObj = {
          ...newDateObj,
          [id]: {
            ...newDateObj[id],
            parentId: payload.changePosItemId === id ? payload.id : newDateObj[id].parentId,
            isExpanded: payload.id === id,
            date: {
              current: itemToChangeTo.date.current,
              time: newDateObj[id].date.time,
            },
          },
        };
      });

      return {
        ...state,
        items: { ...newDateObj },
        itemIdToMove: null,
      };

    case ITEM_ID_TO_MOVE:
      if (payload.id === state.itemIdToMove) {
        return {
          ...state,
          itemIdToMove: false,
        };
      }

      Object.values(state.items).map((item) => (item.isExpanded = true));

      return {
        ...state,
        items: { ...state.items },
        itemIdToMove: payload.id,
      };

    case DELETE_TASK:
      const removeTasks = (parentId: string, items: TodoItems) => {
        const allIds = getSubTasksId(Object.values(items), parentId);
        return omit(items, allIds);
      };

      state.items = removeTasks(payload.id, state.items);

      return {
        ...state,
        items: { ...state.items },
      };

    case CHANGE_IS_CALENDAR_OPEN:
      if (payload.id === state.itemIdCalendarOpen) {
        const allIds = getSubTasksId(Object.values(state.items), payload.id);
        let newObj1 = { ...state.items };

        allIds.forEach((id) => {
          newObj1 = {
            ...newObj1,
            [id]: {
              ...newObj1[id],
              parentId: payload.id === id ? null : newObj1[id].parentId,
              date: { current: payload.date || new Date().getTime(), time: newObj1[id].date.time },
            },
          };
        });

        return {
          ...state,
          items: { ...newObj1 },
          itemIdCalendarOpen: null,
        };
      }

      return {
        ...state,
        items: { ...state.items },
        itemIdCalendarOpen: payload.id,
      };

    default:
      return state;
  }
}
