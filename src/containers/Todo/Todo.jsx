import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Header, Title, Form, Prompt } from './styles';
import { TodoAddTasksInput, TaskListItem, TodoButton, TodoItemDate } from './styles/Todo';
import TodoItem from './TodoItem';

const Todo = ({ t }) => {
  const dispatch = useDispatch();
  const [addTaskInputValue, setAddTaskInputValue] = useState('');

  const items = useSelector((state) => state.todo.items);
  const itemIdToMove = useSelector((state) => state.todo.itemIdToMove);
  const calendarItem = useSelector((state) => state.todo.calendarItem);
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
        <Prompt>{t('Todo.prompt')}</Prompt>
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
      {sortedItems.map((arr) => (
        <TaskListItem>
          <TodoItemDate>{checkDate(arr[0].date)}</TodoItemDate>
          <TodoItem
            items={arr}
            itemIdToMove={itemIdToMove}
            date={date}
            calendarItem={calendarItem}
            calendarDate={calendarDate}
          />
        </TaskListItem>
      ))}
    </Container>
  );
};

export default Todo;
