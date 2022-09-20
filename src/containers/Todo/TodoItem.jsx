import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import {
  SubTaskItem,
  SubTasksList,
  SubTaskArrowIcon,
  SubTaskTitle,
  SubTaskPlusIcon,
  SubTaskTitleEditingInput,
  AddSubTaskInput,
  ChangePosArrowIcon,
  ChangePosCrossIcon,
  ItemCheckedCircle,
} from './styles/Todo';

const TodoItem = ({ items, itemIdToMove, itemsIdNotToMove }) => {
  const dispatch = useDispatch();
  const [subTaskAddingInputState, setSubTaskAddingInputState] = useState(false);
  const [subTaskAddingInputValue, setSubTaskAddingInputValue] = useState('');
  const [titleEditingState, setTitleEditingState] = useState(false);
  const [titleInputValue, setTitleInputValue] = useState('');

  const handleClickAddSubTaskInputBlur = (id, subTasks) => {
    dispatch({
      type: 'TODO/ADD_SUB_TASK',
      payload: { id, title: subTaskAddingInputValue, subTasks },
    });
    setSubTaskAddingInputValue('');
    setSubTaskAddingInputState(false);
  };

  const handleKeyDownAddSubTaskInput = (e, id, subTasks) => {
    if (e.keyCode === 13) {
      dispatch({
        type: 'TODO/ADD_SUB_TASK',
        payload: {
          id,
          title: subTaskAddingInputValue,
          subTasks,
        },
      });
      setSubTaskAddingInputValue('');
      setSubTaskAddingInputState(false);
    }
  };

  const handleClickTitleEditingBlur = (id, item) => {
    dispatch({ type: 'TODO/CHANGE_TASK_TITLE', payload: { id, title: titleInputValue, item } });
    setTitleEditingState('');
    setTitleEditingState(false);
  };

  const handleKeyDownTitleEditing = (e, id, item) => {
    if (e.keyCode === 13) {
      dispatch({ type: 'TODO/CHANGE_TASK_TITLE', payload: { id, title: titleInputValue, item } });
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

  const handleClickCircleIcon = (id, isChecked, subTasks) => {
    dispatch({ type: 'TODO/CHANGE_IS_CHECKED', payload: { id, isChecked, subTasks } });
  };

  const handleClickChangePos = (id) => {
    dispatch({ type: 'TODO/ITEM_ID_TO_MOVE', payload: { id } });
  };

  const handleClickConfirmChangePos = (id, item) => {
    dispatch({
      type: 'TODO/CONFIRM_CHANGE_POS',
      payload: { id, item, changePosItemId: itemIdToMove },
    });
  };

  const handleClickPlusIcon = (id) => setSubTaskAddingInputState(id);

  const renderMoveIcon = (item) => {
    switch (true) {
      case itemIdToMove === item.id:
        return (
          <ChangePosCrossIcon onClick={() => handleClickChangePos(item.id)}>
            <FontAwesomeIcon icon="cross" />
          </ChangePosCrossIcon>
        );
      case itemIdToMove &&
        itemIdToMove !== item.id &&
        !itemsIdNotToMove.find((obj) => obj === item.id):
        return (
          <ChangePosCrossIcon onClick={() => handleClickConfirmChangePos(item.id, item)}>
            <FontAwesomeIcon icon="sticky-note" />
          </ChangePosCrossIcon>
        );
      default:
        return (
          <ChangePosArrowIcon onClick={() => handleClickChangePos(item.id)}>
            <FontAwesomeIcon icon="arrow-right" />
          </ChangePosArrowIcon>
        );
    }
  };

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

          <ItemCheckedCircle
            onClick={() => handleClickCircleIcon(item.id, item.isChecked, item.subTasks)}
          >
            {item.isChecked && <FontAwesomeIcon icon="check" />}
          </ItemCheckedCircle>

          {renderMoveIcon(item)}

          <SubTaskPlusIcon onClick={() => handleClickPlusIcon(item.id)}>
            <FontAwesomeIcon icon="plus" />
          </SubTaskPlusIcon>
          {(item.isExpended || itemIdToMove) && (
            <TodoItem
              key={item.id}
              items={item.subTasks}
              itemIdToMove={itemIdToMove}
              itemsIdNotToMove={itemsIdNotToMove}
            />
          )}
        </SubTaskItem>
      ))}
    </SubTasksList>
  );
};

export default TodoItem;
