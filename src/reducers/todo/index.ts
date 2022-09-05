import { uniqueId } from 'lodash';

interface Todo {
  title: string;
  checked: boolean;
  id: string;
  isEditing: boolean;
  expanded: boolean;
  subTasks: Todo[];
}

const initialState = {
  items: [],
};

const collect = (arr: Array<Todo>, result = []) => {
  arr.forEach((prop: Todo) => {
    // @ts-ignore
    result.push(prop);
    collect(prop.subTasks, result);
  });
  return result;
};

export default function todoReducer(
  state = initialState,
  { type, payload }: { type: string; payload: any },
) {
  switch (type) {
    case 'ADD_TODO': {
      const newTodo: Todo = {
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
      const todo: Todo | any = todosFlat.find((item: Todo) => item.id === payload.parentId);

      if (todo) {
        todo.subTasks = [newTodo, ...todo.subTasks];
        todo.expanded = true;
      }

      return { items: [...state.items] };
    }
    case 'TOGGLE_ITEM': {
      const todosFlat = collect(state.items);
      const todo: Todo | any = todosFlat.find((item: Todo) => item.id === payload.id);
      todo.expanded = !todo.expanded;

      return { items: [...state.items] };
    }
    case 'EDIT_TODO_TITLE': {
      const todosFlat = collect(state.items);
      const todo: Todo | any = todosFlat.find((item: Todo) => item.id === payload.id);
      todo.title = payload.title;

      return { items: [...state.items] };
    }
    default:
      return state;
  }
}
