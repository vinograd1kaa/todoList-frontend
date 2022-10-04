import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import {
  TaskItem,
  TasksList,
  TaskArrowIcon,
  TaskTitle,
  TaskPlusIcon,
  TaskTitleEditingInput,
  TaskInputAddSubTask,
  TaskChangePosArrowIcon,
  TaskToggleIcon,
  TaskCheckedCircle,
  TaskTrashIcon,
} from './styles/Todo';

const TodoItem = ({ items, itemParentId, itemChecked, itemNotToMove, itemIdToMove }) => {
  const dispatch = useDispatch();
  const [subTaskAddingInputState, setSubTaskAddingInputState] = useState(false);
  const [subTaskAddingInputValue, setSubTaskAddingInputValue] = useState('');
  const [titleEditingState, setTitleEditingState] = useState(false);
  const [titleInputValue, setTitleInputValue] = useState('');

  const handleClickAddSubTaskInputBlur = (id) => {
    dispatch({
      type: 'TODO/ADD_SUB_TASK',
      payload: { id, title: subTaskAddingInputValue },
    });
    setSubTaskAddingInputValue('');
    setSubTaskAddingInputState(false);
  };

  const handleKeyDownAddSubTaskInput = (e, id) => {
    if (e.keyCode === 13) {
      dispatch({
        type: 'TODO/ADD_SUB_TASK',
        payload: {
          id,
          title: subTaskAddingInputValue,
        },
      });
      setSubTaskAddingInputValue('');
      setSubTaskAddingInputState(false);
    }
  };

  const handleClickTitleEditingBlur = (id) => {
    dispatch({ type: 'TODO/CHANGE_TASK_TITLE', payload: { id, title: titleInputValue } });
    setTitleEditingState('');
    setTitleEditingState(false);
  };

  const handleKeyDownTitleEditing = (e, id) => {
    if (e.keyCode === 13) {
      dispatch({ type: 'TODO/CHANGE_TASK_TITLE', payload: { id, title: titleInputValue } });
      setTitleInputValue('');
      setTitleEditingState(false);
    }
  };

  const handleClickTitle = (title, id) => {
    setTitleInputValue(title);
    setTitleEditingState(id);
  };

  const handleClickArrowIcon = (id, isExpended) => {
    dispatch({ type: 'TODO/CHANGE_IS_EXPENDED', payload: { id, isExpended } });
  };

  const handleClickCircleIcon = (id, isChecked) => {
    dispatch({ type: 'TODO/CHANGE_IS_CHECKED', payload: { id, isChecked } });
  };

  const handleClickChangePos = (id) => {
    dispatch({ type: 'TODO/ITEM_ID_TO_MOVE', payload: { id } });
  };

  const handleClickConfirmChangePos = (id) => {
    dispatch({
      type: 'TODO/CONFIRM_CHANGE_POS',
      payload: { id, changePosItemId: itemIdToMove },
    });
  };

  const handleClickPlusIcon = (id) => {
    setSubTaskAddingInputState(id);
  };

  const handleClickTrashIcon = (id) => {
    dispatch({
      type: 'TODO/DELETE_TASK',
      payload: { id },
    });
  };

  const renderMoveIcon = (item) => {
    switch (true) {
      case itemIdToMove === item.id:
        return (
          <TaskToggleIcon onClick={() => handleClickChangePos(item.id)}>
            <FontAwesomeIcon icon="cross" />
          </TaskToggleIcon>
        );
      case itemIdToMove && itemIdToMove !== item.id && !itemNotToMove:
        return (
          <TaskToggleIcon onClick={() => handleClickConfirmChangePos(item.id)}>
            <FontAwesomeIcon icon="sticky-note" />
          </TaskToggleIcon>
        );
      default:
        return (
          <TaskChangePosArrowIcon onClick={() => handleClickChangePos(item.id)}>
            <FontAwesomeIcon icon="arrow-right" />
          </TaskChangePosArrowIcon>
        );
    }
  };

  const renderItems = itemParentId
    ? Object.values(items).filter((obj) => obj.parentId === itemParentId)
    : Object.values(items).filter((item) => item.parentId === null);

  return (
    <TasksList>
      {renderItems.map((item) => (
        <TaskItem key={item.id}>
          {Object.values(items).find((obj) => obj.parentId === item.id) && (
            <TaskArrowIcon
              onClick={() => handleClickArrowIcon(item.id, item.isExpended)}
              isExpended={item.isExpended || itemIdToMove}
            />
          )}

          {titleEditingState !== item.id ? (
            <TaskTitle onClick={() => handleClickTitle(item.title, item.id)}>
              {item.title}
            </TaskTitle>
          ) : (
            <TaskTitleEditingInput
              type="text"
              value={titleInputValue}
              onBlur={() => handleClickTitleEditingBlur(item.id)}
              onChange={(e) => setTitleInputValue(e.target.value)}
              onKeyDown={(e) => handleKeyDownTitleEditing(e, item.id)}
              autoFocus
            />
          )}

          {subTaskAddingInputState === item.id && (
            <TaskInputAddSubTask
              type="text"
              value={subTaskAddingInputValue}
              onBlur={() => handleClickAddSubTaskInputBlur(item.id)}
              onChange={(e) => setSubTaskAddingInputValue(e.target.value)}
              onKeyDown={(e) => handleKeyDownAddSubTaskInput(e, item.id)}
              autoFocus
            />
          )}

          <TaskCheckedCircle onClick={() => handleClickCircleIcon(item.id, item.isChecked)}>
            {(item.isChecked || itemChecked) && <FontAwesomeIcon icon="check" />}
          </TaskCheckedCircle>

          {renderMoveIcon(item)}

          <TaskPlusIcon onClick={() => handleClickPlusIcon(item.id)}>
            <FontAwesomeIcon icon="plus" />
          </TaskPlusIcon>

          <TaskTrashIcon onClick={() => handleClickTrashIcon(item.id)}>
            <FontAwesomeIcon icon="trash" />
          </TaskTrashIcon>

          {(item.isExpended || itemIdToMove) && (
            <TodoItem
              items={items}
              itemChecked={itemChecked || item.isChecked}
              itemParentId={item.id}
              itemIdToMove={itemIdToMove}
              itemNotToMove={itemNotToMove || item.id === itemIdToMove}
            />
          )}
        </TaskItem>
      ))}
    </TasksList>
  );
};

export default TodoItem;
