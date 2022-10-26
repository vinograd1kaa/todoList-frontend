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
  CHANGE_IS_CALENDAR_OPEN,
} from '../../actions/Todo';
import { getSubTasksId } from '../../utils/todo';

const initialState = {
  items: {},
  itemIdToMove: null,
  itemIdCalendarOpen: null,
  date: null,
  dateSettings: null,
};

const changeTasksDate = (parentId, obj, dateToChange) => {
  const allIds = getSubTasksId(Object.values(obj), parentId);
  return allIds.map((id) => (obj[id].date = dateToChange));
};

export default function todoReducer(state = initialState, { type, payload }) {
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
            isCalendarOpen: false,
            date: new Date().getTime(),
          },
        },
      };

    case ADD_SUB_TASK:
      if (!payload.title) return { ...state };
      state.items[payload.id].isExpanded = true;
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
            isCalendarOpen: false,
            date: state.items[payload.id].date || new Date().getTime(),
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
      state.items[payload.id].isExpanded = !state.items[payload.id].isExpanded;

      return {
        ...state,
        items: { ...state.items },
      };

    case CHANGE_IS_CHECKED:
      const changeIsCheckedTasks = (parentId, obj) => {
        const allIds = getSubTasksId(Object.values(obj), parentId);
        return allIds.map((id) => (obj[id].isChecked = !payload.isChecked));
      };

      changeIsCheckedTasks(payload.id, state.items);

      return {
        ...state,
        items: { ...state.items },
      };

    case CONFIRM_CHANGE_POS:
      const itemWhichChange = state.items[payload.changePosItemId];
      const itemWhereChange = state.items[payload.id];

      itemWhereChange.isExpanded = true;
      itemWhichChange.parentId = payload.id;

      changeTasksDate(payload.changePosItemId, state.items, itemWhereChange.date);

      return {
        ...state,
        items: { ...state.items },
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
      const removeTasks = (parentId, obj) => {
        const allIds = getSubTasksId(Object.values(obj), parentId);
        return omit(obj, allIds);
      };

      state.items = removeTasks(payload.id, state.items);
      return {
        ...state,
        items: { ...state.items },
      };

    case CHANGE_IS_CALENDAR_OPEN:
      if (payload.id === state.itemIdCalendarOpen) {
        changeTasksDate(payload.id, state.items, state.date);

        if (state.items[state.items[payload.id].parentId]) state.items[payload.id].parentId = null;
        return {
          ...state,
          items: { ...state.items },
          itemIdCalendarOpen: null,
        };
      }

      return {
        ...state,
        items: { ...state.items },
        date: state.date,
        itemIdCalendarOpen: payload.id,
      };

    case CHANGE_DATE:
      console.log(payload.date);
      return {
        ...state,
        date: payload.date,
      };

    default:
      return state;
  }
}
