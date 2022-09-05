import { uniqueId } from 'lodash';
import {
  ADD_SUB_TASK,
  ADD_TASK,
  CHANGE_TASK_CHECKED,
  CHANGE_SUB_TASK_CHECKED,
} from '../../actions/Todo';

const initialState = {
  items: [
    {
      title: 'Test',
      id: 5,
      checked: false,
      subTasks: [],
    },
    {
      title: 'Production',
      id: 1,
      checked: false,
      subTasks: [
        {
          title: 'Production 1',
          id: 2,
          checked: false,
          subTasks: [
            {
              title: 'Production 1 - 1',
              id: 3,
              checked: false,
              subTasks: [],
            },
            {
              title: 'Production 1 - 2',
              id: 4,
              checked: false,
              subTasks: [],
            },
          ],
        },
      ],
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
            id: uniqueId(),
            checked: false,
            subTasks: [],
          },
        ],
      };

    case CHANGE_TASK_CHECKED:
      return {
        ...state,
        items: (state.items || payload.item).map((obj) => {
          if (obj.id === payload.id) {
            return { ...obj, checked: !payload.checked };
          }

          return obj;
        }),
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

    case CHANGE_SUB_TASK_CHECKED:
      // eslint-disable-next-line no-case-declarations,no-param-reassign
      payload.item.checked = !payload.item.checked;

      return {
        ...state,
        ...state.items,
      };

    default:
      return state;
  }
}
