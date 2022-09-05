import { uniqueId } from 'lodash';
import { ADD_SUB_TASK, ADD_TASK, CHANGE_TASK_TITLE, CHANGE_IS_EXPENDED } from '../../actions/Todo';

const initialState = {
  items: [
    {
      title: 'Production',
      id: 1,
      isExpended: false,
      subTasks: [
        {
          title: 'Production 1',
          id: 2,
          isExpended: false,
          subTasks: [
            {
              title: 'Production 1 - 1',
              id: 3,
              isExpended: false,
              subTasks: [],
            },
            {
              title: 'Production 1 - 2',
              id: 4,
              checked: false,
              isExpended: false,
              subTasks: [],
            },
          ],
        },
      ],
    },
  ],
};

const findTaskById = (id, arr) => {
  let result = arr.find((obj) => obj.id === id);

  if (!result) {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === id) {
        return arr[id];
      }
      if ('subTasks' in arr[i]) {
        // eslint-disable-next-line no-unused-vars
        result = findTaskById(id, arr[i].subTasks);
      }
    }
  }

  return result;
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
            id: uniqueId(),
            checked: false,
            subTasks: [],
          },
        ],
      };

    case ADD_SUB_TASK:
      payload.item.subTasks.push({
        title: payload.title,
        id: uniqueId(),
        checked: false,
        subTasks: [],
      });

      return {
        ...state,
      };

    case CHANGE_TASK_TITLE:
      // eslint-disable-next-line no-param-reassign,no-multi-assign,no-case-declarations
      const changedTitleState = (findTaskById(payload.id, state.items).title = payload.title);

      return {
        ...state,
        ...state.items,
        ...changedTitleState,
      };

    case CHANGE_IS_EXPENDED:
      // eslint-disable-next-line no-multi-assign,no-case-declarations
      const changedIsExpendedState = (findTaskById(
        payload.id,
        state.items,
      ).isExpended = !payload.isExpended);

      return {
        ...state,
        ...state.items,
        ...changedIsExpendedState,
      };

    default:
      return state;
  }
}
