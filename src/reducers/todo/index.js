import { uniqueId } from 'lodash';

const initialState = {
  items: [
    {
      title: 'Production',
      checked: false,
      id: uniqueId(),
      isEditing: false,
      expanded: true,
      subTasks: [
        {
          title: 'Production 1',
          checked: false,
          id: uniqueId(),
          isEditing: false,
          expanded: true,
          subTasks: [
            {
              title: 'Production 1 - 1',
              checked: false,
              id: uniqueId(),
              isEditing: false,
              expanded: true,
              subTasks: [],
            },
            {
              title: 'Production 1 - 2',
              checked: false,
              id: uniqueId(),
              isEditing: false,
              expanded: true,
              subTasks: [],
            },
          ],
        },
        {
          title: 'Production 2',
          checked: false,
          id: uniqueId(),
          isEditing: false,
          expanded: true,
          subTasks: [],
        },
      ],
    },
    { title: 'Production -', checked: false, id: uniqueId(), isEditing: false, subTasks: [] },
  ],
};

const collect = (arr, result = []) => {
  arr.forEach((prop) => {
    result.push(prop);
    collect(prop.subTasks, result);
  });
  return result;
};

export default function todoReducer(state = initialState, { type, payload }) {
  switch (type) {
    case 'ADD_TODO': {
      const newTodo = {
        id: uniqueId(),
        title: payload.title,
        isEditing: false,
        expanded: true,
        checked: false,
        subTasks: [],
      };

      if (!payload.parentId) {
        return { items: [...state.items, newTodo] };
      }

      const todosFlat = collect(state.items);
      const todo = todosFlat.find((item) => item.id === payload.parentId);
      todo.subTasks = [newTodo, ...todo.subTasks];
      todo.expanded = true;

      return { items: [...state.items] };
    }
    case 'TOGGLE_ITEM': {
      const todosFlat = collect(state.items);
      const todo = todosFlat.find((item) => item.id === payload.id);
      todo.expanded = !todo.expanded;

      return { items: [...state.items] };
    }
    case 'EDIT_TODO_TITLE': {
      const todosFlat = collect(state.items);
      const todo = todosFlat.find((item) => item.id === payload.id);
      todo.title = payload.title;

      return { items: [...state.items] };
    }
    default:
      return state;
  }
}
