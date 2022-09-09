import { uniqueId } from 'lodash';
import { ADD_SUB_TASK, ADD_TASK, CHANGE_TASK_TITLE, CHANGE_IS_EXPENDED } from '../../actions/Todo';

const initialState = {
  items: [],
};

function findTaskById(id, arr) {
  let result = arr.find((obj) => obj.id === id);

  if (!result) {
    // eslint-disable-next-line no-plusplus
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
            isExpended: false,
            subTasks: [],
          },
        ],
      };

    case ADD_SUB_TASK:
      payload.item.subTasks.push({
        title: payload.title,
        id: uniqueId(),
        isExpended: false,
        subTasks: [],
      });

      return {
        ...state,
      };

    case CHANGE_TASK_TITLE:
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

    default:
      return state;
  }
}
