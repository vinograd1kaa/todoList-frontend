export type TodoDate = {
  current: number;
  time: string;
};

export type CreateTodoTaskFields = {
  title: string;
  isChecked: boolean;
  isExpanded: boolean;
  parentId: string | null;
  date: TodoDate;
};

export type TodoUpdateTaskType = {
  id: any;
  params: {
    changeParentId?: any;
    values: {
      isExpanded?: boolean;
      title?: string;
      isChecked?: boolean;
      parentId?: string | null;
      date?: any;
    };
  };
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

export type TodoItems = {
  [key: TodoTypeItem['id']]: TodoTypeItem;
};

export interface TodoReducerState {
  posts: {
    items: TodoItems;
    status: string;
  };
  itemIdToMove: null | string;
  itemIdCalendarOpen: null | string;
}
