import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Header, Title, Form } from './styles';
import { TodoAddTasksInput, TaskListItem, TodoButton, TodoItemDate } from './styles/Todo';
import TodoItem from './TodoItem';

const Todo = ({ t }) => {
  const dispatch = useDispatch();
  const [addTaskInputValue, setAddTaskInputValue] = useState('');

  const items = useSelector((state) => state.todo.items);

  const handleClickAddTaskBtn = () => {
    dispatch({ type: 'TODO/ADD_TASK', payload: { title: addTaskInputValue } });
    setAddTaskInputValue('');
  };

  const checkDate = (arrDate) => {
    const string = new Date(arrDate).toString().split(' ');
    const arrDateLetters = string.map((el) => el);
    const currentTime = new Date().getTime() - (new Date().getTime() % 100000);
    if (arrDate === currentTime) return 'Today';

    return `${arrDateLetters[0]} ${arrDateLetters[1]} ${arrDateLetters[2]} ${arrDateLetters[3]}`;
  };

  const sortedItems = Object.values(
    Object.values(items)
      .sort((a, b) => b.date - a.date)
      .reduce((b, a) => {
        const val = a.date;
        if (!b[val]) b[val] = [];
        b[val].push(a);
        return b;
      }, {}),
  );

  return (
    <Container>
      <Header>
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
        <Link to="/settings">
          <TodoButton>Settings</TodoButton>
        </Link>
      </Header>
      {sortedItems.map((arr) => (
        <TaskListItem>
          <TodoItemDate>{checkDate(arr[0].date)}</TodoItemDate>
          <TodoItem id={false} items={arr} isExpanded />
        </TaskListItem>
      ))}
    </Container>
  );
};

export default Todo;
