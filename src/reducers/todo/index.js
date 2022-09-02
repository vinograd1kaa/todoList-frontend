import { uniqueId } from 'lodash';
import { ADD_SUB_TASK, ADD_TASK, CHANGE_TASK_CHECKED } from '../../actions/Todo';

const initialState = {
  items: [
    {
      title: 'Production',
      checked: false,
      id: uniqueId(),
      subTasks: [],
    },
  ],
};

export default function todoReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ADD_TASK:
      return {
        ...state,
        items: [
          ...state.items,
          {
            title: payload.title,
            checked: false,
            id: uniqueId(),
            subTasks: [],
          },
        ],
      };

    case ADD_SUB_TASK:
      // eslint-disable-next-line no-case-declarations
      const findItem = state.items.find((obj) => obj.id === payload.id);
      findItem.subTasks = [...findItem.subTasks];
      findItem.subTasks.push({ title: payload.title, subTasks: [] });

      return {
        ...state,
        ...state.items,
      };

    case CHANGE_TASK_CHECKED:
      return {
        ...state,
        items: state.items.map((obj) => {
          if (obj.id === payload.id) {
            return { ...obj, checked: !payload.checked };
          }

          return obj;
        }),
      };
    default:
      return state;
  }
}
