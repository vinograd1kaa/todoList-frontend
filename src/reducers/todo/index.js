import { uniqueId } from 'lodash';
import {
  ADD_SUB_TASK,
  ADD_TASK,
  CHANGE_TASK_TITLE,
  CHANGE_IS_EXPENDED,
  CONFIRM_CHANGE_POS,
  ITEM_ID_TO_MOVE,
  CHANGE_IS_CHECKED,
} from '../../actions/Todo';

const initialState = {
  items: {},
  itemIdToMove: null,
};

export default function todoReducer(state = initialState, { type, payload }) {
  const state_items = Object.values(state.items);
  const keyOfNewTask = state_items.length + 1;
  switch (type) {
    case ADD_TASK:
      return {
        ...state,
        items: {
          ...state.items,
          [keyOfNewTask]: {
            title: payload.title,
            id: uniqueId(),
            isExpended: false,
            isChecked: false,
            parentId: null,
          },
        },
      };
    case ADD_SUB_TASK:
      if (!payload.title) return { ...state };
      state_items.find((item) => item.id === payload.id).isExpended = true;

      return {
        ...state,
        items: {
          [keyOfNewTask]: {
            title: payload.title,
            id: uniqueId(),
            isExpended: false,
            isChecked: false,
            parentId: payload.id,
          },
          ...state.items,
        },
      };

    case CHANGE_TASK_TITLE:
      if (!payload.title) return { ...state };
      state_items.find((item) => item.id === payload.id).title = payload.title;

      return {
        ...state,
        items: { ...state.items },
      };

    case CHANGE_IS_EXPENDED:
      state_items.find((item) => item.id === payload.id).isExpended = !payload.isExpended;

      return {
        ...state,
        items: { ...state.items },
      };

    case CHANGE_IS_CHECKED:
      state_items.find((item) => item.id === payload.id).isChecked = !payload.isChecked;

      return {
        ...state,
        items: { ...state.items },
      };

    case CONFIRM_CHANGE_POS:
      state_items.find((item) => item.id === payload.id).isExpended = true;
      state_items.find((item) => item.id === payload.changePosItemId).parentId = payload.id;

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

    default:
      return state;
  }
}
