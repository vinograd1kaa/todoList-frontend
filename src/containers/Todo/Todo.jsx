import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, TodoBlock, Title, Form } from './styles';
import { TodoAddTasksInput, TaskListItem, TodoButton, TodoItemDate } from './styles/Todo';
import TodoItem from './TodoItem';
import Header from '../../components/Header';

const Todo = ({ t }) => {
  const dispatch = useDispatch();
  const [addTaskInputValue, setAddTaskInputValue] = useState('');

  const items = useSelector((state) => state.todo.items);

  const calculateCurrentTime = (time = new Date().getTime()) =>
    (new Date(time).getTime() - (new Date(time).getTime() % 1000000)) / 1000000;

  const handleClickAddTaskBtn = () => {
    dispatch({ type: 'TODO/ADD_TASK', payload: { title: addTaskInputValue } });
    setAddTaskInputValue('');
  };

  const checkDate = (arrDate) => {
    const dateString = new Date(arrDate).toString().split(' ');
    const arrDateLetters = dateString.map((el) => el);

    if (calculateCurrentTime(arrDate) === calculateCurrentTime()) {
      return 'Today';
    }
    return `${arrDateLetters[0]} ${arrDateLetters[1]} ${arrDateLetters[2]} ${arrDateLetters[3]}`;
  };

  const sortedItems = Object.values(
    Object.values(items)
      .sort((a, b) => b.date - a.date)
      .reduce((b, a) => {
        const val = calculateCurrentTime(a.date);
        if (!b[val]) b[val] = [];
        b[val].push(a);
        return b;
      }, {}),
  );

  return (
    <>
      <Header />
      <Container>
        <TodoBlock>
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
        </TodoBlock>
        {sortedItems.map((arr) => (
          <TaskListItem key={arr[0].date}>
            <TodoItemDate>{checkDate(arr[0].date)}</TodoItemDate>
            <TodoItem id={false} items={arr} isExpanded />
          </TaskListItem>
        ))}
      </Container>
    </>
  );
};

export default Todo;
