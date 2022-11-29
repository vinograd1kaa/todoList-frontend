import { omit, uniqueId } from 'lodash';
import moment from 'moment';
import {
  ADD_SUB_TASK,
  ADD_TASK,
  CHANGE_TASK_TITLE,
  CHANGE_IS_EXPENDED,
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

const findTask = (items: TodoItems, id: string) => {
  return items[id];
};

export default function todoReducer(state = initialState, { type, payload }: TodoReducerPayload) {
  switch (type) {
    case ADD_TASK:
      const idOfItem = uniqueId();
      return {
        ...state,
        items: {
          ...state.items,
          [idOfItem]: {
            title: payload.title,
            id: idOfItem,
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
      const idOfSubItem = uniqueId();

      return {
        ...state,
        items: {
          [idOfSubItem]: {
            title: payload.title,
            id: idOfSubItem,
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

    case CHANGE_IS_EXPENDED:
      findTask(state.items, payload.id).isExpanded = !findTask(state.items, payload.id).isExpanded;

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

      allIdsDateToChange.forEach((id) => {
        newDateObj = {
          ...newDateObj,
          [id]: {
            ...newDateObj[id],
            parentId: payload.changePosItemId === id ? payload.id : newDateObj[id].parentId,
            isExpanded: payload.id === id,
            date: {
              current: findTask(state.items, payload.id).date.current,
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
          // @ts-ignore
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
