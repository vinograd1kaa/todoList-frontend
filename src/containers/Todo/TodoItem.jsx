import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  SubTaskItem,
  ItemCircleIcon,
  SubTasksList,
  SubTaskArrowIcon,
  SubTaskTitle,
  AddSubTaskInput,
} from './styles/Todo';
import { CheckedTaskItem } from './styles';

const TodoItem = ({ items, addSubTask, changeSubTaskChecked }) => {
  const [subTaskState, setSubTaskState] = useState(false);
  const [subTaskEditingState, setSubTaskEditingState] = useState(false);
  const [subTaskEditingInputValue, setSubTaskEditingInputValue] = useState('');

  const handleEditingInputBlur = (id, item) => {
    if (subTaskEditingInputValue === '') {
      setSubTaskEditingState(false);
      return;
    }

    addSubTask(id, subTaskEditingInputValue, item);
    setSubTaskEditingState(false);
    setSubTaskEditingInputValue('');
  };

  const handleClickCircleIcon = (id, checked, item) => changeSubTaskChecked(id, checked, item);
  const handleClickTitle = (id) => setSubTaskEditingState(id);
  const handleClickArrow = (id) => setSubTaskState(id);

  return (
    <SubTasksList>
      {items.map((item) => (
        <SubTaskItem>
          {item.subTasks && (
            <SubTaskArrowIcon
              onClick={() => handleClickArrow(item.id)}
              subTaskState={subTaskState === item.id}
            />
          )}
          <SubTaskTitle onClick={() => handleClickTitle(item.id)}>{item.title}</SubTaskTitle>
          {subTaskEditingState === item.id && (
            <AddSubTaskInput
              type="text"
              value={subTaskEditingInputValue}
              onBlur={() => handleEditingInputBlur(item.id, { ...item })}
              onChange={(e) => setSubTaskEditingInputValue(e.target.value)}
              /* eslint-disable-next-line jsx-a11y/no-autofocus */
              autoFocus
            />
          )}
          {item.subTasks && subTaskState === item.id && (
            <TodoItem
              key={item.id}
              items={item.subTasks}
              addSubTask={addSubTask}
              changeSubTaskChecked={changeSubTaskChecked}
            />
          )}
          <ItemCircleIcon
            onClick={() => handleClickCircleIcon(item.id, item.checked, { ...item })}
            todoItem
          >
            <CheckedTaskItem>{item.checked && <FontAwesomeIcon icon="check" />}</CheckedTaskItem>
          </ItemCircleIcon>
        </SubTaskItem>
      ))}
    </SubTasksList>
  );
};

export default TodoItem;
