import React from 'react';
import { ItemCheckedCircle, SubTaskItem, SwitchStateSubTaskItem } from './styles/Todo';
import { CheckedTaskItem } from './styles';

const TodoItem = ({ title, items }) => {
  return (
    <SubTaskItem level={1}>
      <SwitchStateSubTaskItem />
      {title}
      <ItemCheckedCircle todoItem>
        <CheckedTaskItem />
      </ItemCheckedCircle>
      {items.map((item) => (
        <SubTaskItem level={2}>
          {item}
          <ItemCheckedCircle todoItem>
            <CheckedTaskItem />
          </ItemCheckedCircle>
        </SubTaskItem>
      ))}
    </SubTaskItem>
  );
};

export default TodoItem;
