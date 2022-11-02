import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Container, TodoBlock, Title, Form } from './styles';
import { TodoAddTasksInput, TaskListItem, TodoButton, TodoItemDate } from './styles/Todo';
import TodoItem from './TodoItem';
import Header from '../../components/Header';

const Todo = ({ t }) => {
  const dispatch = useDispatch();
  const [addTaskInputValue, setAddTaskInputValue] = useState('');
  const rootEl = useRef(null);

  const items = useSelector((state) => state.todo.items);
  const dateSettings = useSelector((state) => state.todoSettings.dateSettings);

  useEffect(() => {
    const onClick = (e) => {
      // eslint-disable-next-line
      if (rootEl.current && !rootEl.current.contains(e.target) && e.target.tagName !== 'path' && e.target.tagName !== 'svg') {
        dispatch({
          type: 'TODO/CHANGE_IS_CALENDAR_OPEN',
          payload: { id: null },
        });
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [rootEl]);

  const handleClickAddTaskBtn = () => {
    dispatch({ type: 'TODO/ADD_TASK', payload: { title: addTaskInputValue } });
    setAddTaskInputValue('');
  };

  const checkDate = (arrDate) => {
    if (moment(arrDate.current).format('DMYYYY') === moment(new Date()).format('DMYYYY')) {
      return 'Today';
    }

    return `${dateSettings.sortBy.time ? `${arrDate.time} ` : ''}${moment(arrDate.current).format(
      dateSettings.sortBy.date,
    )}`;
  };

  const sortedItems = Object.values(
    Object.values(items)
      .sort((a, b) => b.date.current - a.date.current)
      .reduce((acc, obj) => {
        const val = moment(obj.date.current).format('DMYYYY');
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
          <TaskListItem key={arr[0].date.current}>
            <TodoItemDate>{checkDate(arr[0].date)}</TodoItemDate>
            <TodoItem id={false} rootEl={rootEl} items={arr} isExpanded />
          </TaskListItem>
        ))}
      </Container>
    </>
  );
};

export default Todo;
