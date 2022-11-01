import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import {
  TaskItem,
  TaskArrowIcon,
  TaskTitle,
  TaskPlusIcon,
  TaskTitleEditingInput,
  TaskInputAddSubTask,
  TaskChangePosArrowIcon,
  TaskToggleIcon,
  TaskCheckedCircle,
  TaskTrashIcon,
  TodoCalendarIcon,
} from './styles/Todo';
import Calendar from '../../components/Calendar/index';
import { getSubTasksId } from '../../utils/todo';

const TodoItem = ({ items, id, title, date, isExpanded, isChecked, parentId, rootEl }) => {
  const dispatch = useDispatch();
  const [subTaskAddingInputState, setSubTaskAddingInputState] = useState(false);
  const [subTaskAddingInputValue, setSubTaskAddingInputValue] = useState('');
  const [titleEditingState, setTitleEditingState] = useState(false);
  const [titleInputValue, setTitleInputValue] = useState('');
  const [currentCalendarDay, setCurrentCalendarDay] = useState('');

  const idToMove = useSelector((state) => state.todo.itemIdToMove);
  const idCalendarOpen = useSelector((state) => state.todo.itemIdCalendarOpen);

  const handleClickAddSubTaskInputBlur = () => {
    dispatch({
      type: 'TODO/ADD_SUB_TASK',
      payload: { id, title: subTaskAddingInputValue },
    });
    setSubTaskAddingInputValue('');
    setSubTaskAddingInputState(false);
  };

  const handleKeyDownAddSubTaskInput = (e) => {
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

  const handleClickTitleEditingBlur = () => {
    dispatch({ type: 'TODO/CHANGE_TASK_TITLE', payload: { id, title: titleInputValue } });
    setTitleEditingState('');
    setTitleEditingState(false);
  };

  const handleKeyDownTitleEditing = (e) => {
    if (e.keyCode === 13) {
      dispatch({ type: 'TODO/CHANGE_TASK_TITLE', payload: { id, title: titleInputValue } });
      setTitleInputValue('');
      setTitleEditingState(false);
    }
  };

  const handleClickTitle = () => {
    setTitleInputValue(title);
    setTitleEditingState(id);
  };

  const handleClickArrowIcon = () => {
    dispatch({ type: 'TODO/CHANGE_IS_EXPENDED', payload: { id } });
  };

  const handleClickCircleIcon = () => {
    dispatch({ type: 'TODO/CHANGE_IS_CHECKED', payload: { id, isChecked } });
  };

  const handleClickChangePos = () => {
    dispatch({ type: 'TODO/ITEM_ID_TO_MOVE', payload: { id } });
  };

  const handleClickConfirmChangePos = () => {
    dispatch({
      type: 'TODO/CONFIRM_CHANGE_POS',
      payload: { id, changePosItemId: idToMove },
    });
  };

  const handleClickPlusIcon = () => {
    setSubTaskAddingInputState(id);
  };

  const handleClickTrashIcon = () => {
    dispatch({
      type: 'TODO/DELETE_TASK',
      payload: { id },
    });
  };

  const handleClickCalendar = () => {
    dispatch({
      type: 'TODO/CHANGE_IS_CALENDAR_OPEN',
      payload: { id },
    });
  };

  const handleClickCalendarDay = (time) => {
    dispatch({
      type: 'TODO/CHANGE_DATE',
      payload: {
        date: time,
        currentTime: new Date().getTime(),
        id,
      },
    });
  };

  const renderMoveIcon = () => {
    switch (true) {
      case idToMove === id:
        return (
          <TaskToggleIcon onClick={handleClickChangePos}>
            <FontAwesomeIcon icon="cross" />
          </TaskToggleIcon>
        );
      case idToMove && idToMove !== id && !getSubTasksId(items, idToMove).includes(id):
        return (
          <TaskToggleIcon onClick={handleClickConfirmChangePos}>
            <FontAwesomeIcon icon="sticky-note" />
          </TaskToggleIcon>
        );
      default:
        return (
          <TaskChangePosArrowIcon onClick={handleClickChangePos}>
            <FontAwesomeIcon icon="arrow-right" />
          </TaskChangePosArrowIcon>
        );
    }
  };

  const renderItems =
    items && parentId
      ? items.filter((obj) => obj.parentId === parentId)
      : items.filter((item) => item.parentId === null);

  const handleBlurClick = (e) => {
    if (currentCalendarDay === e.target.innerText) {
      handleClickCalendar();
      setCurrentCalendarDay(null);
    }
    setCurrentCalendarDay(e.target.innerText);
  };

  return (
    <TaskItem key={id} style={{ paddingLeft: `${title ? '25px' : '0'}` }}>
      {id && (
        <>
          <TaskArrowIcon onClick={handleClickArrowIcon} isExpanded={idToMove || isExpanded} />
          {titleEditingState !== id ? (
            <TaskTitle onClick={handleClickTitle}>{title}</TaskTitle>
          ) : (
            <TaskTitleEditingInput
              type="text"
              value={titleInputValue}
              onBlur={handleClickTitleEditingBlur}
              onChange={(e) => setTitleInputValue(e.target.value)}
              onKeyDown={(e) => handleKeyDownTitleEditing(e)}
              autoFocus
            />
          )}
          {subTaskAddingInputState === id && (
            <TaskInputAddSubTask
              type="text"
              value={subTaskAddingInputValue}
              onBlur={handleClickAddSubTaskInputBlur}
              onChange={(e) => setSubTaskAddingInputValue(e.target.value)}
              onKeyDown={(e) => handleKeyDownAddSubTaskInput(e)}
              autoFocus
            />
          )}
          <TodoCalendarIcon onClick={handleClickCalendar} state={idCalendarOpen === id}>
            <FontAwesomeIcon icon="calendar-alt" />
          </TodoCalendarIcon>
          <TaskCheckedCircle onClick={handleClickCircleIcon}>
            {isChecked && <FontAwesomeIcon icon="check" />}
          </TaskCheckedCircle>
          {renderMoveIcon()}
          <TaskPlusIcon onClick={handleClickPlusIcon}>
            <FontAwesomeIcon icon="plus" />
          </TaskPlusIcon>
          <TaskTrashIcon onClick={handleClickTrashIcon}>
            <FontAwesomeIcon icon="trash" />
          </TaskTrashIcon>
          {idCalendarOpen === id && (
            <Calendar
              rootEl={rootEl}
              taskDate={date}
              handleClickCalendarDay={(time) => handleClickCalendarDay(time)}
              handleBlurClick={(e) => handleBlurClick(e)}
            />
          )}
        </>
      )}
      <ul>
        {isExpanded &&
          renderItems.map((task) => (
            <TodoItem key={task.id} {...task} items={items} parentId={task.id} rootEl={rootEl} />
          ))}
      </ul>
    </TaskItem>
  );
};

export default TodoItem;
