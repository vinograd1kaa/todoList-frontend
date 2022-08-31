import { ADD_TASK, CHANGE_TASK_CHECKED } from '../../actions/Todo';

const initialState = {
  items: [
    {
      title: 'победить андрея лобби на сфах',
      checked: false,
      id: 1,
    },
    {
      title: 'посапортить на земеле',
      checked: false,
      id: 2,
    },
    {
      title: 'посапортить на вилке',
      checked: false,
      id: 3,
    },
  ],
};

let lastPost = null;

export default function todoReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ADD_TASK:
      if (state.items[state.items.length - 1] === undefined) {
        lastPost = 0;
      } else {
        lastPost = state.items[state.items.length - 1].id;
      }

      return {
        ...state,
        items: [
          ...state.items,
          {
            title: payload.title,
            checked: false,
            id: lastPost + 1,
          },
        ],
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
