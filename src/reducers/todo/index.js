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
  items: [],
  itemIdToMove: null,
  itemsIdNotToMove: false,
};

function removeTask(id, arr) {
  arr.forEach((item, index) => {
    if (item.id === id) {
      arr.splice(index, 1);
    }
    removeTask(id, item.subTasks);
  });
}

function findSubtasksNotToMove(arr, itemToPush, oldItemsArr = []) {
  oldItemsArr.push(itemToPush);
  arr.forEach((item) => {
    findSubtasksNotToMove(item.subTasks, item.id, oldItemsArr);
  });
  return oldItemsArr;
}

function collect(arr, item, newArr = []) {
  arr.forEach((task) => {
    newArr.push(task);
    if (task.subTasks.length !== 0) {
      collect(task.subTasks, task, newArr);
    }
  });
  return newArr;
}
export default function todoReducer(state = initialState, { type, payload }) {
  const stateItems = collect(state.items);
  switch (type) {
    case ADD_TASK:
      return {
        ...state,
        items: [
          ...state.items,
          {
            title: payload.title,
            id: uniqueId(),
            isExpended: true,
            isChecked: false,
            subTasks: [],
          },
        ],
      };

    case ADD_SUB_TASK:
      if (!payload.title) return { ...state };
      stateItems.find((item) => item.id === payload.id).subTasks = [
        ...payload.subTasks,
        {
          title: payload.title,
          id: uniqueId(),
          isExpended: true,
          isChecked: false,
          subTasks: [],
        },
      ];

      return {
        ...state,
        items: [...state.items],
      };

    case CHANGE_TASK_TITLE:
      if (!payload.title) return { ...state };
      stateItems.find((item) => item.id === payload.id).title = payload.title;

      return {
        ...state,
        items: [...state.items],
      };

    case CHANGE_IS_EXPENDED:
      stateItems.find((item) => item.id === payload.id).isExpended = !payload.isExpended;

      return {
        ...state,
        items: [...state.items],
      };

    case CHANGE_IS_CHECKED:
      stateItems.find((item) => item.id === payload.id).isChecked = !payload.isChecked;
      collect(payload.subTasks).map((item) => item.isChecked !== payload.isChecked);

      return {
        ...state,
        items: [...state.items],
      };

    case CONFIRM_CHANGE_POS:
      const oldTask = stateItems.find((item) => item.id === payload.changePosItemId);
      // stateItems.filter((item) => item.id !== payload.changePosItemId);
      removeTask(payload.changePosItemId, state.items);
      stateItems.find((item) => item.id === payload.id).subTasks = [
        ...payload.item.subTasks,
        { ...oldTask },
      ];

      return {
        ...state,
        items: [...state.items],
        itemIdToMove: null,
      };

    case ITEM_ID_TO_MOVE:
      if (payload.id === state.itemIdToMove) {
        return {
          ...state,
          itemIdToMove: false,
        };
      }
      if (payload.id) {
        const findItem = stateItems.find((item) => item.id === payload.id);
        state.itemsIdNotToMove = findSubtasksNotToMove(findItem.subTasks);
      }

      return {
        ...state,
        itemIdToMove: payload.id,
      };

    default:
      return state;
  }
}
