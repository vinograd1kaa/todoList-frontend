import { RootState } from '../index';

export const selectTodoItems = (state: RootState) => state.todo.posts.items;

export const selectTodoItemIdToMove = (state: RootState) => state.todo.itemIdToMove;

export const selectTodoIdCalendarOpen = (state: RootState) => state.todo.itemIdCalendarOpen;
