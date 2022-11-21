import { RootState } from '../index';

export const selectActiveDateButton = (state: RootState) =>
  state.todoSettings.dateSettings.activeButton;

export const selectDateButtons = (state: RootState) => state.todoSettings.dateSortButtons;

export const selectDateSortBy = (state: RootState) => state.todoSettings.dateSettings.sortBy;
