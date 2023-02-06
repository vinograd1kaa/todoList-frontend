import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment/moment';
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
  TaskInfoCircle,
} from './styles/Todo';
import Calendar from '../../../components/Calendar';
import { getSubTasksId } from '../../../utils/todo';
import {
  selectTodoIdCalendarOpen,
  selectTodoItemIdToMove,
  selectTodoItems,
} from '../../../reducers/todo/selectors';
import { TodoTypeItem, TodoDate } from '../../../reducers/todo/types';

type TodoItemParams = {
  title: string;
  id: string;
  isExpanded: boolean;
  isChecked?: boolean;
  parentId?: string | boolean;
  rootEl: object;
  items: TodoTypeItem[];
  date: TodoDate;
};

const TodoItem: React.FC<TodoItemParams> = ({
  items,
  id,
  title,
  date,
  isExpanded,
  isChecked,
  parentId,
  rootEl,
}) => {
  const dispatch = useDispatch();
  const [subTaskAddingInputState, setSubTaskAddingInputState] = useState<string | false>(false);
  const [subTaskAddingInputValue, setSubTaskAddingInputValue] = useState('');
  const [titleEditingState, setTitleEditingState] = useState<string | false>(false);
  const [titleInputValue, setTitleInputValue] = useState<string>('');
  const [currentCalendarDay, setCurrentCalendarDay] = useState<number>();
  const idToMove = useSelector(selectTodoItemIdToMove);
  const idCalendarOpen = useSelector(selectTodoIdCalendarOpen);

  const stateItems = useSelector(selectTodoItems);

  const handleClickAddSubTaskInputBlur = async () => {
    const fields = {
      title: subTaskAddingInputValue,
      isChecked: false,
      isExpanded: true,
      parentId: id,
      date: stateItems[id].date,
    };

    dispatch({
      type: 'TODO/ASYNC_ADD_SUB_TASK',
      payload: { id, title: subTaskAddingInputValue, fields },
    });

    setSubTaskAddingInputValue('');
    setSubTaskAddingInputState(false);
  };

  const handleKeyDownAddSubTaskInput = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      const fields = {
        title: subTaskAddingInputState,
        isChecked: false,
        isExpanded: true,
        parentId: id,
        date: stateItems[id].date,
      };

      dispatch({
        type: 'TODO/ASYNC_ADD_SUB_TASK',
        payload: { id, title: subTaskAddingInputValue, fields },
      });

      setSubTaskAddingInputValue('');
      setSubTaskAddingInputState(false);
    }
  };

  const handleClickTitleEditingBlur = async () => {
    dispatch({ type: 'TODO/ASYNC_CHANGE_TASK_TITLE', payload: { id, title: titleInputValue } });
    setTitleEditingState(false);
  };

  const handleKeyDownTitleEditing = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      dispatch({ type: 'TODO/ASYNC_CHANGE_TASK_TITLE', payload: { id, title: titleInputValue } });
      setTitleEditingState(false);
    }
  };

  const handleClickTitle = () => {
    setTitleInputValue(title);
    setTitleEditingState(id);
  };

  const handleClickArrowIcon = async () => {
    dispatch({ type: 'TODO/ASYNC_CHANGE_IS_EXPANDED', payload: { id, isExpanded } });
  };

  const handleClickCircleIcon = async () => {
    dispatch({
      type: 'TODO/ASYNC_CHANGE_IS_CHECKED',
      payload: { id, items: stateItems, isChecked },
    });
  };

  const handleClickChangePos = () => {
    dispatch({ type: 'TODO/ITEM_ID_TO_MOVE', payload: { id } });
  };

  const handleClickConfirmChangePos = async () => {
    dispatch({
      type: 'TODO/ASYNC_CONFIRM_CHANGE_POS',
      payload: { id, items: stateItems, changePosItemId: idToMove },
    });
  };

  const handleClickPlusIcon = () => {
    setSubTaskAddingInputState(id);
  };

  const handleClickTrashIcon = async () => {
    dispatch({
      type: 'TODO/ASYNC_DELETE_TASK',
      payload: { id, items: stateItems },
    });
  };

  const handleClickCalendar = () => {
    dispatch({
      type: 'TODO/CHANGE_IS_CALENDAR_OPEN',
      payload: { id },
    });
  };

  const handleClickCalendarDay = async (time: number) => {
    if (currentCalendarDay === time) {
      dispatch({
        type: 'TODO/ASYNC_CHANGE_IS_CALENDAR_OPEN',
        payload: { id, items: stateItems, date: time },
      });
    }
    setCurrentCalendarDay(time);
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

  return (
    <TaskItem key={id} style={{ paddingLeft: `${title ? '25px' : '0'}` }}>
      {id !== 'first' && (
        <>
          <TaskArrowIcon onClick={handleClickArrowIcon} isOpened={idToMove || isExpanded} />
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
          <Link to={`/todo/${id}`}>
            <TaskInfoCircle>
              <FontAwesomeIcon icon="info-circle" />
            </TaskInfoCircle>
          </Link>

          {renderMoveIcon()}

          <TaskPlusIcon onClick={handleClickPlusIcon}>
            <FontAwesomeIcon icon="plus" />
          </TaskPlusIcon>

          <TaskCheckedCircle onClick={handleClickCircleIcon}>
            {isChecked && <FontAwesomeIcon icon="check" />}
          </TaskCheckedCircle>

          <TodoCalendarIcon onClick={handleClickCalendar} isOpened={idCalendarOpen === id}>
            <FontAwesomeIcon icon="calendar-alt" />
          </TodoCalendarIcon>

          <TaskTrashIcon onClick={handleClickTrashIcon}>
            <FontAwesomeIcon icon="trash" />
          </TaskTrashIcon>

          {idCalendarOpen === id && (
            <Calendar
              rootEl={rootEl}
              taskDate={date}
              handleClickCalendarDay={handleClickCalendarDay}
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
