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
  const [subTaskEditingState, setSubTaskEditingState] = useState(false);
  const [subTaskEditingInputValue, setSubTaskEditingInputValue] = useState('');
  const [titleInputValue, setTitleInputValue] = useState('');
  const [titleEditingState, setTitleEditingState] = useState(false);

  const handleClickAddSubTaskInputBlur = (id, subTasks) => {
    if (!subTaskEditingInputValue) {
      setSubTaskEditingState(false);
      return;
    }
    changeIsExpended(id, false);
    addSubTask(id, subTaskEditingInputValue, subTasks);
    setSubTaskEditingState(false);
    setSubTaskEditingInputValue('');
  };

  const handleKeyPressAddSubTaskInput = (e, id, item) => {
    if (e.which === 13 && !subTaskEditingInputValue) {
      setSubTaskEditingState(false);
    } else if (e.which === 13 && subTaskEditingInputValue) {
      changeIsExpended(id, false);
      addSubTask(id, subTaskEditingInputValue, item);
      setSubTaskEditingState(false);
      setSubTaskEditingInputValue('');
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

  const handleKeyPressTitleEditing = (e, id, item) => {
    if (e.which === 13 && !titleInputValue) {
      setTitleEditingState(false);
    } else if (e.which === 13 && titleInputValue) {
      changeTaskTitle(id, titleInputValue, item);
      setTitleEditingState('');
      setTitleEditingState(false);
    }
  };

  const handleClickTitle = (title, id) => {
    setTitleInputValue(title);
    setTitleEditingState(id);
  };

  const handleClickArrowIcon = (id, isExpended) => changeIsExpended(id, isExpended);
  const handleClickPlusIcon = (id) => setSubTaskEditingState(id);

  return (
    <SubTasksList>
      {items.map((item) => (
        <SubTaskItem>
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
              onKeyPress={(e) => handleKeyPressTitleEditing(e, item.id, { ...item })}
              autoFocus="true"
            />
          )}

          {subTaskEditingState === item.id && (
            <AddSubTaskInput
              type="text"
              value={subTaskEditingInputValue}
              onBlur={() => handleClickAddSubTaskInputBlur(item.id, item.subTasks)}
              onChange={(e) => setSubTaskEditingInputValue(e.target.value)}
              onKeyPress={(e) => handleKeyPressAddSubTaskInput(e, item.id, { ...item })}
              autoFocus="true"
            />
          )}
          <SubTaskPlusIcon onClick={() => handleClickPlusIcon(item.id)}>
            <FontAwesomeIcon icon="plus" />
          </SubTaskPlusIcon>
          {item.isExpended && (
            <TodoItem
              key={item.id + item.title}
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
