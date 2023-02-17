import React, { useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {
  TaskItem,
  TaskArrowIcon,
  TaskTitle,
  TaskPlusIcon,
  TaskTitleEditInput,
  TaskInputAddSubTask,
  TaskChangePosArrowIcon,
  TaskToggleIcon,
  TaskCheckedCircle,
  TaskTrashIcon,
  TodoCalendarIcon,
  TaskInfoCircle,
} from './styles/Todo';
import Calendar from '../../../components/Calendar';
import { getSubTasksId } from '../../../utils/getSubTasks';
import { TodoTypeItem, TodoDate } from '../../../reducers/todo/types';
import {
  changeIdItemToMove,
  changeIsCalendarOpen,
  fetchCreate,
  fetchDelete,
  fetchHandleUpdate,
  fetchUserPosts,
} from '../../../reducers/todo';
import { getIdIsAuth } from '../../../reducers/auth/selectors';
import { selectTodoIdCalendarOpen, selectTodoItemIdToMove } from '../../../reducers/todo/selectors';

type TodoItemParams = {
  title: string;
  _id: string;
  isExpanded: boolean;
  isChecked?: boolean;
  parentId?: string | boolean;
  rootEl: object;
  items: TodoTypeItem[];
  date: TodoDate;
};

type TodoInputState = {
  state: boolean | string;
  value: string;
};

const TodoItem: React.FC<TodoItemParams> = ({
  items,
  _id,
  title,
  date,
  isExpanded,
  isChecked,
  parentId,
  rootEl,
}) => {
  const dispatch = useDispatch();
  const [subTaskAddInput, setSubTaskAddInput] = useState<TodoInputState>({
    state: false,
    value: '',
  });
  const [taskEditInput, setTaskEditInput] = useState<TodoInputState>({
    state: false,
    value: '',
  });
  const [currentCalendarDay, setCurrentCalendarDay] = useState<number>();

  const id = _id;
  const idAuthUser = useSelector(getIdIsAuth);
  const idToMove = useSelector(selectTodoItemIdToMove);
  const idCalendarOpen = useSelector(selectTodoIdCalendarOpen);

  const handleAddSubTaskInputBlur = async () => {
    const fields = {
      title: subTaskAddInput.value,
      isChecked: false,
      isExpanded: true,
      parentId: id,
      date,
    };

    await dispatch(fetchHandleUpdate({ id: parentId, params: { isExpanded: true } }));
    await dispatch(fetchCreate(fields));
    await dispatch(fetchUserPosts(idAuthUser));
    setSubTaskAddInput({ value: '', state: false });
  };

  const onKeyDownAddSubTaskInput = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      const fields = {
        title: subTaskAddInput.value,
        isChecked: false,
        isExpanded: true,
        parentId: id,
        date,
      };

      await dispatch(fetchCreate(fields));
      await dispatch(fetchUserPosts(idAuthUser));
      setSubTaskAddInput({ value: '', state: false });
    }
  };

  const handleTitleEditBlur = async () => {
    await dispatch(fetchHandleUpdate({ id, params: { title: taskEditInput.value } }));
    await dispatch(fetchUserPosts(idAuthUser));
    setTaskEditInput({ ...taskEditInput, state: false });
  };

  const onKeyDownTitleEdit = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      await dispatch(fetchHandleUpdate({ id, params: { title: taskEditInput.value } }));
      await dispatch(fetchUserPosts(idAuthUser));
      setTaskEditInput({ ...taskEditInput, state: false });
    }
  };

  const handleTitle = () => {
    setTaskEditInput({ value: title, state: id });
  };

  const handleArrowIcon = async () => {
    await dispatch(fetchHandleUpdate({ id, params: { isExpanded: !isExpanded } }));
    await dispatch(fetchUserPosts(idAuthUser));
  };

  const handleCircleIcon = async () => {
    await dispatch(fetchHandleUpdate({ id, params: { isChecked: !isChecked } }));
    await dispatch(fetchUserPosts(idAuthUser));
  };

  const handleChangePos = async () => {
    await dispatch(changeIdItemToMove(id));
    await dispatch(fetchUserPosts(idAuthUser));
  };

  const handleConfirmChangePos = async () => {
    await dispatch(
      fetchHandleUpdate({ id: idToMove, params: { parentId: id, date: date.current } }),
    );
    await dispatch(fetchUserPosts(idAuthUser));
  };

  const handlePlusIcon = () => {
    setSubTaskAddInput({ ...subTaskAddInput, state: id });
  };

  const handleTrashIcon = async () => {
    await dispatch(fetchDelete(id));
    await dispatch(fetchUserPosts(idAuthUser));
  };

  const handleCalendar = async () => {
    await dispatch(changeIsCalendarOpen(id));
    await dispatch(fetchUserPosts(idAuthUser));
  };

  const handleCalendarDay = async (time: number) => {
    if (currentCalendarDay === time) {
      await dispatch(
        fetchHandleUpdate({
          id,
          params: {
            parentId: null,
            date: { current: time, time: moment().format('h:mm:ss') },
          },
        }),
      );
      await dispatch(fetchUserPosts(idAuthUser));
    }
    setCurrentCalendarDay(time);
  };

  const renderMoveIcon = () => {
    switch (true) {
      case idToMove === id:
        return (
          <TaskToggleIcon onClick={handleChangePos}>
            <FontAwesomeIcon icon="cross" />
          </TaskToggleIcon>
        );
      case idToMove && idToMove !== id && !getSubTasksId(items, idToMove).includes(id):
        return (
          <TaskToggleIcon onClick={handleConfirmChangePos}>
            <FontAwesomeIcon icon="sticky-note" />
          </TaskToggleIcon>
        );
      default:
        return (
          <TaskChangePosArrowIcon onClick={handleChangePos}>
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
          <TaskArrowIcon onClick={handleArrowIcon} isOpened={Boolean(idToMove) || isExpanded} />
          {taskEditInput.state !== id ? (
            <TaskTitle onClick={handleTitle}>{title}</TaskTitle>
          ) : (
            <TaskTitleEditInput
              type="text"
              value={taskEditInput.value}
              onBlur={handleTitleEditBlur}
              onChange={(e) => setTaskEditInput({ ...taskEditInput, value: e.target.value })}
              onKeyDown={(e) => onKeyDownTitleEdit(e)}
              autoFocus
            />
          )}
          {subTaskAddInput.state === id && (
            <TaskInputAddSubTask
              type="text"
              value={subTaskAddInput.value}
              onBlur={handleAddSubTaskInputBlur}
              onChange={(e) => setSubTaskAddInput({ ...subTaskAddInput, value: e.target.value })}
              onKeyDown={(e) => onKeyDownAddSubTaskInput(e)}
              autoFocus
            />
          )}
          <Link to={`/todo/${id}`}>
            <TaskInfoCircle>
              <FontAwesomeIcon icon="info-circle" />
            </TaskInfoCircle>
          </Link>

          {renderMoveIcon()}

          <TaskPlusIcon onClick={handlePlusIcon}>
            <FontAwesomeIcon icon="plus" />
          </TaskPlusIcon>

          <TaskCheckedCircle onClick={handleCircleIcon}>
            {isChecked && <FontAwesomeIcon icon="check" />}
          </TaskCheckedCircle>

          <TodoCalendarIcon onClick={handleCalendar} isOpened={idCalendarOpen === id}>
            <FontAwesomeIcon icon="calendar-alt" />
          </TodoCalendarIcon>

          <TaskTrashIcon onClick={handleTrashIcon}>
            <FontAwesomeIcon icon="trash" />
          </TaskTrashIcon>

          {idCalendarOpen === id && (
            <Calendar rootEl={rootEl} taskDate={date} handleCalendarDay={handleCalendarDay} />
          )}
        </>
      )}
      <ul>
        {isExpanded &&
          renderItems.map((task) => (
            <TodoItem key={task._id} {...task} parentId={task._id} items={items} rootEl={rootEl} />
          ))}
      </ul>
    </TaskItem>
  );
};

export default TodoItem;
