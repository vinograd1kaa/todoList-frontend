import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  SubTaskItem,
  SubTasksList,
  SubTaskArrowIcon,
  SubTaskTitle,
  SubTaskPlusIcon,
  SubTaskTitleEditingInput,
  AddSubTaskInput,
} from './styles/Todo';

const TodoItem = ({ items, addSubTask, changeIsExpended, changeTaskTitle }) => {
  const [subTaskState, setSubTaskState] = useState(false);
  const [subTaskEditingState, setSubTaskEditingState] = useState(false);
  const [subTaskEditingInputValue, setSubTaskEditingInputValue] = useState('');
  const [titleInputValue, setTitleInputValue] = useState('');
  const [titleEditingState, setTitleEditingState] = useState(false);

  const handleEditingInputBlur = (id, item) => {
    if (subTaskEditingInputValue === '') {
      setSubTaskEditingState(false);
      return;
    }

    addSubTask(id, subTaskEditingInputValue, item);
    setSubTaskEditingState(false);
    setSubTaskEditingInputValue('');
  };

  const handleClickTitleEditingBlur = (id, item) => {
    changeTaskTitle(id, titleInputValue, item);
    setTitleEditingState('');
    setTitleEditingState(false);
  };

  const handleClickTitle = (title, id) => {
    setTitleInputValue(title);
    setTitleEditingState(id);
  };

  const handleClickArrowIcon = (id, isExpended) => {
    setSubTaskState(id);
    changeIsExpended(id, isExpended);
  };

  const handleClickPlusIcon = (id) => {
    setSubTaskEditingState(id);
  };

  console.log(items);

  return (
    <SubTasksList>
      {items.map((item) => (
        <SubTaskItem>
          {item.subTasks && (
            <SubTaskArrowIcon
              onClick={() => handleClickArrowIcon(item.id, item.isExpended, item.subTasks)}
              subTaskState={subTaskState.id === item.id}
              isExpended={item.isExpended}
            />
          )}

          {titleEditingState !== item.id ? (
            <SubTaskTitle onClick={() => handleClickTitle(item.title, item.id)}>
              {item.title}
            </SubTaskTitle>
          ) : (
            <SubTaskTitleEditingInput
              type="text"
              value={titleInputValue}
              onBlur={() => handleClickTitleEditingBlur(item.id, { ...item })}
              onChange={(e) => setTitleInputValue(e.target.value)}
              /* eslint-disable-next-line jsx-a11y/no-autofocus */
              autoFocus
            />
          )}

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
          <SubTaskPlusIcon onClick={() => handleClickPlusIcon(item.id)}>
            <FontAwesomeIcon icon="plus" />
          </SubTaskPlusIcon>
          {item.subTasks && subTaskState === item.id && (
            <TodoItem
              key={item.id}
              items={item.subTasks}
              addSubTask={addSubTask}
              changeTaskTitle={changeTaskTitle}
              changeIsExpended={changeIsExpended}
            />
          )}
        </SubTaskItem>
      ))}
    </SubTasksList>
  );
};

export default TodoItem;
