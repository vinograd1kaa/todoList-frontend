import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Container, TodoBlock, Title, Form } from './styles';
import { TodoAddTasksInput, TaskListItem, TodoButton, TodoItemDate } from './styles/Todo';
import TodoItem from './TodoItem';
import Header from '../../components/Header';

const Todo = ({ t }) => {
  const dispatch = useDispatch();
  const [addTaskInputValue, setAddTaskInputValue] = useState('');

  const items = useSelector((state) => state.todo.items);
  const sortButtons = useSelector((state) => state.todoSettings.sortButtons);
  const dateSettings = useSelector((state) => state.todoSettings.dateSettings);

  useEffect(() => {
    const localStorageButton = localStorage.getItem('activeButton') || 0;
    const findSortBy = sortButtons[localStorageButton].sortBy;

    dispatch({
      type: 'TODO_SETTINGS/SETTINGS_DATE',
      payload: { id: localStorageButton, sortBy: findSortBy },
    });
  }, [dispatch, items, sortButtons]);

  const handleClickAddTaskBtn = () => {
    dispatch({ type: 'TODO/ADD_TASK', payload: { title: addTaskInputValue } });
    setAddTaskInputValue('');
  };

  const checkDate = (arrDate) => {
    const dateString = new Date(arrDate).toString().split(' ');
    const arrDateLetters = dateString.map((el) => el);

    const currentDateString = new Date().toString().split(' ');
    const currentDateLetters = currentDateString.map((el) => el);

    if (
      arrDateLetters[1] === currentDateLetters[1] &&
      arrDateLetters[2] === currentDateLetters[2] &&
      arrDateLetters[3] === currentDateLetters[3]
    ) {
      return 'Today';
    }
    const date = {
      day: arrDateLetters[2],
      month: arrDateLetters[1],
      year: arrDateLetters[3],
      dayOfWeek: arrDateLetters[0],
    };

    return Object.values(
      Object.fromEntries(
        Object.entries(dateSettings.sortBy).map(([k, v]) => [k, v === true ? date[k] : v]),
      ),
    ).map((item) => (item && item.length !== 1 ? `${item}${dateSettings.sortBy.divide}` : ''));
  };

  const sortedItems = Object.values(
    Object.values(items)
      .sort((a, b) => b.date - a.date)
      .reduce((acc, obj) => {
        const val = moment(obj.date).format('DMYYYY');
        if (!acc[val]) acc[val] = [];
        acc[val].push(obj);
        return acc;
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
