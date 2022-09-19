import { uniqueId } from 'lodash';

interface Todo {
  title: string;
  checked: boolean;
  id: string;
  expanded: boolean;
  subTasks: Todo[];
}

const initialState = {
  items: [],
  itemToMove: null,
  itemToMoveParentId: null,
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
      if (!payload.title) {
        return state;
      }

      const newTodo: Todo = {
        id: uniqueId(),
        title: payload.title,
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
      if (!payload.title) {
        return state;
      }

      const todosFlat = collect(state.items);
      const todo: Todo | any = todosFlat.find((item: Todo) => item.id === payload.id);
      todo.title = payload.title;

      return { items: [...state.items] };
    }
    case 'SET_ITEM_TO_MOVE': {
      const todosFlat = collect(state.items);
      todosFlat.forEach((item) => {
        // @ts-ignore
        // eslint-disable-next-line no-param-reassign
        item.expanded = true;
      });

      return {
        ...state,
        items: [...state.items],
        itemToMove: payload.id,
        itemToMoveParentId: payload.parentId,
      };
    }

    case 'MOVE_ITEM': {
      const todosFlat = collect(state.items);
      const item = todosFlat.find(({ id }) => id === state.itemToMove);
      const oldParent = todosFlat.find(({ id }) => id === state.itemToMoveParentId);
      const newParent = todosFlat.find(({ id }) => id === payload.id);
      // eslint-disable-next-line no-debugger
      if (oldParent) {
        // @ts-ignore
        oldParent.subTasks = oldParent.subTasks.filter(({ id }) => id !== state.itemToMove);
      } else {
        // @ts-ignore
        // eslint-disable-next-line no-param-reassign
        state.items = state.items.filter(({ id }) => id !== state.itemToMove);
      }
      // @ts-ignore
      const itemSubtasksFlat = collect(item.subTasks);
      // @ts-ignore
      const isSubTask = itemSubtasksFlat.find(({ id }) => id === newParent.id);

      if (isSubTask) {
        return {
          ...state,
          itemToMove: null,
          itemToMoveParentId: null,
        };
      }
      // @ts-ignore
      newParent.subTasks = [...newParent.subTasks, item];

      return {
        itemToMove: null,
        itemToMoveParentId: null,
        items: [...state.items],
      };
    }

    default:
      return state;
  }
}
