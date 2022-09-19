import { uniqueId } from 'lodash';
import {
  ADD_SUB_TASK,
  ADD_TASK,
  CHANGE_TASK_TITLE,
  CHANGE_IS_EXPENDED,
  CONFIRM_CHANGE_POS,
  ITEM_ID_TO_MOVE,
} from '../../actions/Todo';

const initialState = {
  items: [],
  itemIdToMove: false,
  itemsIdNotToMove: false,
};

function findTaskById(id, arr) {
  let result = arr.find((obj) => obj.id === id);

  if (!result) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === id) {
        return arr[id];
      }
      if ('subTasks' in arr[i]) {
        result = findTaskById(id, arr[i].subTasks);
        if (result) {
          return result;
        }
      }
    }
  }

  return result;
}

function removeTask(id, arr) {
  arr.forEach((item, index) => {
    if (item.id === id) {
      arr.splice(index, 1);
    }
    removeTask(id, item.subTasks);
  });
}

function findSubtasksNotToMove(arr, itemToPush, oldItemsArr) {
  const newItemsArr = oldItemsArr || [];
  itemToPush && newItemsArr.push(itemToPush);

  arr.forEach((item) => {
    if ('subTasks' in item) {
      const result = findSubtasksNotToMove(item.subTasks, item.id, newItemsArr);
      if (result) {
        return result;
      }
    }
  });
  return newItemsArr;
}

export default function todoReducer(state = initialState, { type, payload }) {
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
            subTasks: [],
          },
        ],
      };

    case ADD_SUB_TASK:
      if (!payload.title) return { ...state };
      findTaskById(payload.id, state.items).subTasks = [
        ...payload.subTasks,
        {
          title: payload.title,
          id: uniqueId(),
          isExpended: true,
          subTasks: [],
        },
      ];

      return {
        ...state,
        items: [...state.items],
      };

    case CHANGE_TASK_TITLE:
      if (!payload.title) return { ...state };
      findTaskById(payload.id, state.items).title = payload.title;

      return {
        ...state,
        items: [...state.items],
      };

    case CHANGE_IS_EXPENDED:
      findTaskById(payload.id, state.items).isExpended = !payload.isExpended;

      return {
        ...state,
        items: [...state.items],
      };

    case CONFIRM_CHANGE_POS:
      state.itemIdToMove = false;
      const oldTask = findTaskById(payload.changePosItemId, state.items);

      findTaskById(payload.id, state.items).subTasks = [
        ...payload.item.subTasks,
        {
          title: oldTask.title,
          id: uniqueId(),
          isExpended: oldTask.isExpended,
          changePos: false,
          subTasks: oldTask.subTasks,
        },
      ];

      removeTask(payload.changePosItemId, state.items);

      return {
        ...state,
        items: [...state.items],
      };

    case ITEM_ID_TO_MOVE:
      if (payload.id === state.itemIdToMove) {
        state.itemIdToMove = false;
        return {
          ...state,
        };
      }
      if (payload.id) {
        const findItem = findTaskById(payload.id, state.items);
        state.itemsIdNotToMove = findSubtasksNotToMove(findItem.subTasks);
      }

      state.itemIdToMove = payload.id;

      return {
        ...state,
      };

    default:
      return state;
  }
}
