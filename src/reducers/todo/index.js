import { omit, uniqueId } from 'lodash';
import {
  ADD_SUB_TASK,
  ADD_TASK,
  CHANGE_TASK_TITLE,
  CHANGE_IS_EXPENDED,
  CONFIRM_CHANGE_POS,
  ITEM_ID_TO_MOVE,
  CHANGE_IS_CHECKED,
  DELETE_TASK,
  CHANGE_DATE,
  CALENDAR_TASK,
} from '../../actions/Todo';

const initialState = {
  items: {},
  itemIdToMove: null,
  calendarItem: null,
  date: { current: null, calendar: null },
};

function getSubTasksId(id, obj) {
  let result = [id];
  Object.values(obj).forEach((item) => {
    if (item.parentId === id) {
      result = result.concat(getSubTasksId(item.id, obj));
    }
  });
  return result;
}

export default function todoReducer(state = initialState, { type, payload }) {
  const b = new Date().toString().split(' ');
  const dateLetters = b.map((el) => el);

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
            isExpended: false,
            isChecked: false,
            parentId: null,
            date: {
              day: dateLetters[2],
              month: dateLetters[1],
              year: dateLetters[3],
            },
          },
        },
      };

    case ADD_SUB_TASK:
      if (!payload.title) return { ...state };
      state.items[payload.id].isExpended = true;
      const idOfSubItem = uniqueId();

      return {
        ...state,
        items: {
          [idOfSubItem]: {
            title: payload.title,
            id: idOfSubItem,
            isExpended: false,
            isChecked: false,
            parentId: payload.id,
            date: state.items[payload.id].date || {
              day: dateLetters[2],
              month: dateLetters[1],
              year: dateLetters[3],
            },
          },
          ...state.items,
        },
      };

    case CHANGE_TASK_TITLE:
      if (!payload.title) return { ...state };
      state.items[payload.id].title = payload.title;

      return {
        ...state,
        items: { ...state.items },
      };

    case CHANGE_IS_EXPENDED:
      state.items[payload.id].isExpended = !payload.isExpended;

      return {
        ...state,
        items: { ...state.items },
      };

    case CHANGE_IS_CHECKED:
      state.items[payload.id].isChecked = !payload.isChecked;

      return {
        ...state,
        items: { ...state.items },
      };

    case CONFIRM_CHANGE_POS:
      const itemWhichChange = state.items[payload.changePosItemId];
      const itemWhereChange = state.items[payload.id];

      if (
        itemWhichChange.date.day !== itemWhereChange.date.day ||
        itemWhichChange.date.month !== itemWhereChange.date.month ||
        itemWhichChange.date.year !== itemWhereChange.date.year
      ) {
        const moveTasksWithDate = (parentId, obj, itemWhereChangeDate) => {
          const allIds = getSubTasksId(parentId, obj);
          return allIds.map((id) => (obj[id].date = itemWhereChangeDate));
        };

        moveTasksWithDate(payload.changePosItemId, state.items, itemWhereChange.date);
      }

      itemWhereChange.isExpended = true;
      itemWhichChange.parentId = payload.id;

      return {
        ...state,
        itemIdToMove: null,
      };

    case ITEM_ID_TO_MOVE:
      if (payload.id === state.itemIdToMove) {
        return {
          ...state,
          itemIdToMove: false,
        };
      }

      return {
        ...state,
        itemIdToMove: payload.id,
      };

    case DELETE_TASK:
      const removeTasks = (parentId, obj) => {
        const allIds = getSubTasksId(parentId, obj);
        return omit(obj, allIds);
      };

      state.items = removeTasks(payload.id, state.items);

      return {
        ...state,
        items: { ...state.items },
      };

    case CHANGE_DATE:
      const changeTasksDate = (parentId, obj) => {
        const allIds = getSubTasksId(parentId, obj);
        return allIds.map((id) => (obj[id].date = payload.date));
      };

      state.items[state.calendarItem].parentId = null;
      changeTasksDate(state.calendarItem, state.items);

      return {
        ...state,
        date: { current: payload.date, calendar: payload.calendarDate },
      };

    case CALENDAR_TASK:
      if (payload.id === state.calendarItem) {
        return {
          ...state,
          calendarItem: null,
        };
      }

      return {
        ...state,
        calendarItem: payload.id,
      };

    default:
      return state;
  }
}
