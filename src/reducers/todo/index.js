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
} from '../../actions/Todo';

const initialState = {
  items: {},
  itemIdToMove: null,
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
            isExpended: false,
            isChecked: false,
            parentId: null,
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
      state.items[payload.id].isExpended = true;
      state.items[payload.changePosItemId].parentId = payload.id;

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
      const getSubTasksId = (id, obj) => {
        let result = [id];
        Object.values(obj).forEach((item) => {
          if (item.parentId === id) {
            result = result.concat(getSubTasksId(item.id, obj));
          }
        });
        return result;
      };

      const removeTaskAndSubTasks = (parentId, obj) => {
        const allIds = getSubTasksId(parentId, obj);
        return omit(obj, allIds);
      };

      state.items = removeTaskAndSubTasks(payload.id, state.items);

      return {
        ...state,
        items: { ...state.items },
      };

    default:
      return state;
  }
}
