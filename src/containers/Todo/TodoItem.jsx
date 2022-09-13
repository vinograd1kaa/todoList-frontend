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
  const [subTaskAddingInputState, setSubTaskAddingInputState] = useState(false);
  const [subTaskAddingInputValue, setSubTaskAddingInputValue] = useState('');
  const [titleInputValue, setTitleInputValue] = useState('');
  const [titleEditingState, setTitleEditingState] = useState(false);

  const handleClickAddSubTaskInputBlur = (id, subTasks) => {
    if (!subTaskAddingInputValue) {
      setSubTaskAddingInputState(false);
      return;
    }
    changeIsExpended(id, false);
    addSubTask(id, subTaskAddingInputValue, subTasks);
    setSubTaskAddingInputState(false);
    setSubTaskAddingInputValue('');
  };

  const handleKeyDownAddSubTaskInput = (e, id, subTasks) => {
    if (e.keyCode === 13) {
      if (!subTaskAddingInputValue) {
        setSubTaskAddingInputState(false);
      } else {
        changeIsExpended(id, false);
        addSubTask(id, subTaskAddingInputValue, subTasks);
        setSubTaskAddingInputState(false);
        setSubTaskAddingInputValue('');
      }
    }
  };

  const handleClickTitleEditingBlur = (id, item) => {
    if (!titleInputValue) {
      setTitleEditingState(false);
      return;
    }
    changeTaskTitle(id, titleInputValue, item);
    setTitleEditingState('');
    setTitleEditingState(false);
  };

  const handleKeyDownTitleEditing = (e, id, item) => {
    if (e.keyCode === 13) {
      if (!titleInputValue) {
        setTitleEditingState(false);
      } else {
        changeTaskTitle(id, titleInputValue, item);
        setTitleEditingState('');
        setTitleEditingState(false);
      }
    }
  };

  const handleClickTitle = (title, id) => {
    setTitleInputValue(title);
    setTitleEditingState(id);
  };

  const handleClickArrowIcon = (id, isExpended) => changeIsExpended(id, isExpended);
  const handleClickPlusIcon = (id) => setSubTaskAddingInputState(id);

  return (
    <SubTasksList>
      {items.map((item) => (
        <SubTaskItem key={item.id}>
          {Boolean(item.subTasks.length) && (
            <SubTaskArrowIcon
              onClick={() => handleClickArrowIcon(item.id, item.isExpended)}
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
              onKeyDown={(e) => handleKeyDownTitleEditing(e, item.id, { ...item })}
              autoFocus
            />
          )}

          {subTaskAddingInputState === item.id && (
            <AddSubTaskInput
              type="text"
              value={subTaskAddingInputValue}
              onBlur={() => handleClickAddSubTaskInputBlur(item.id, item.subTasks)}
              onChange={(e) => setSubTaskAddingInputValue(e.target.value)}
              onKeyDown={(e) => handleKeyDownAddSubTaskInput(e, item.id, item.subTasks)}
              autoFocus
            />
          )}
          <SubTaskPlusIcon onClick={() => handleClickPlusIcon(item.id)}>
            <FontAwesomeIcon icon="plus" />
          </SubTaskPlusIcon>
          {item.isExpended && (
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
