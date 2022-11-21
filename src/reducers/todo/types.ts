export type TodoDate = {
  current: number;
  time: string;
};

export type TodoTypeItem = {
  title: string;
  id: string;
  isExpanded: boolean;
  isChecked: boolean;
  parentId: null | string;
  date: TodoDate;
};

export type TodoItems = { [key: TodoTypeItem['id']]: TodoTypeItem };

export interface TodoReducerState {
  items: TodoItems;
  itemIdToMove: null | string;
  itemIdCalendarOpen: null | string;
  date: null | number;
}

export interface TodoReducerPayload {
  type: string;
  payload: {
    id: string;
    title: string;
    date: number;
    isChecked: boolean;
    changePosItemId: string;
  };
}
