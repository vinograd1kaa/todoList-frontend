import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Header, Title, Form } from './styles';
import {
  TodoAddTasksInput,
  TaskListItem,
  TodoButton,
  TodoCalendarIcon,
  TodoItemDate,
} from './styles/Todo';
import TodoItem from './TodoItem';
import Calendar from './Calendar/Calendar';

const Todo = ({ t }) => {
  const dispatch = useDispatch();

  const [addTaskInputValue, setAddTaskInputValue] = useState('');
  const [calendarState, setCalendarState] = useState(false);

  const items = useSelector((state) => state.todo.items);
  const itemIdToMove = useSelector((state) => state.todo.itemIdToMove);
  const date = useSelector((state) => state.todo.date.current);
  const calendarDate = useSelector((state) => state.todo.date.calendar);

  const handleClickAddTaskBtn = () => {
    dispatch({ type: 'TODO/ADD_TASK', payload: { title: addTaskInputValue } });
    setAddTaskInputValue('');
  };

  const sortedItems = Object.values(
    Object.values(items).reduce((acc, obj) => {
      const val = Object.values(obj.date).join('');
      if (!acc[val]) acc[val] = [];
      acc[val].push(obj);
      return acc;
    }, {}),
  );

  const checkDate = (itemDate) => {
    const b = new Date().toString().split(' ');
    const dateLetters = b.map((el) => el);

    if (
      itemDate.day === dateLetters[2] &&
      itemDate.month === dateLetters[1] &&
      itemDate.year === dateLetters[3]
    )
      return 'Today';
    return `${itemDate.day} ${itemDate.month} ${itemDate.year}`;
  };

  return (
    <Container>
      <Header>
        <TodoCalendarIcon onClick={() => setCalendarState(!calendarState)} state={calendarState}>
          <FontAwesomeIcon icon="calendar-alt" />
        </TodoCalendarIcon>
        <Title>{t('Todo.pageTitle')}</Title>
        <Form>
          <TodoAddTasksInput
            type="text"
            placeholder={t('Todo.addTasksPlaceholder')}
            value={addTaskInputValue}
            onChange={(e) => setAddTaskInputValue(e.target.value)}
          />
          <TodoButton disabled={!addTaskInputValue} onClick={handleClickAddTaskBtn}>
            {t('Todo.addTasksButton')}
          </TodoButton>
        </Form>
      </Header>
      {calendarState && <Calendar calendarDate={calendarDate} />}
      {sortedItems.map((arr) => (
        <TaskListItem>
          <TodoItemDate>{checkDate(arr[0].date)}</TodoItemDate>
          <TodoItem items={arr} itemIdToMove={itemIdToMove} date={date} />
        </TaskListItem>
      ))}
    </Container>
  );
};

export default Todo;
