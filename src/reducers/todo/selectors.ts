import { RootState } from '../index';

// @ts-ignore
export const selectTodoItems = (state: RootState) => state.todo.items;
// @ts-ignore
export const selectTodoItemIdToMove = (state: RootState) => state.todo.itemIdToMove;
// @ts-ignore
export const selectTodoIdCalendarOpen = (state: RootState) => state.todo.itemIdCalendarOpen;
