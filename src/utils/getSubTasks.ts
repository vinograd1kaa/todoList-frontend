import { TodoTypeItem } from '../reducers/todo/types';

export const getSubTasksId = (arr: TodoTypeItem[], id: string | undefined) => {
  let result = [id];
  arr.forEach((item: TodoTypeItem) => {
    if (item.parentId === id) {
      result = result.concat(getSubTasksId(arr, item.id));
    }
  });
  return result;
};
