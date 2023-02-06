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
  items: TodoItems;
  itemIdToMove: null | string;
  itemIdCalendarOpen: null | string;
}

export interface TodoReducerPayload {
  type: string;
  payload: {
    posts: TodoTypeItem[];
    id: string;
    idOfSubItem: string;
    title: string;
    date: number;
    isChecked: boolean;
    isExpanded: boolean;
    changePosItemId: string;
  };
}
