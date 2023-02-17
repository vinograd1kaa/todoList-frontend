export type TodoDate = {
  current: number;
  time: string;
};

export type TodoTypeItem = {
  title: string;
  id: string;
  _id: string;
  isExpanded: boolean;
  isChecked: boolean;
  parentId: null | string;
  date: TodoDate;
};

export type TodoItems = { [key: TodoTypeItem['id']]: TodoTypeItem };

export interface TodoReducerState {
  posts: {
    items: TodoItems;
    status: string;
  };
  itemIdToMove: null | string;
  itemIdCalendarOpen: null | string;
}
