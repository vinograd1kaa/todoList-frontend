import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { WithTranslation } from 'react-i18next';
import { Container, TodoBlock, Form } from './styles';
import { TodoAddTasksInput, TaskListItem, TodoButton, TodoItemDate } from './styles/Todo';
import TodoItem from './TodoItem';
import Header from '../../../components/Header';
import { selectDateSortBy } from '../../../reducers/todoSettings/selectors';
import { TodoDate, TodoTypeItem } from '../../../reducers/todo/types';
import { getIdIsAuth } from '../../../reducers/auth/selectors';
import { changeIsCalendarOpen, fetchCreate, fetchUserPosts } from '../../../reducers/todo';
import { selectTodoItems } from '../../../reducers/todo/selectors';

const Todo: React.FC<WithTranslation> = ({ t }) => {
  const dispatch = useDispatch();
  const [addTaskInputValue, setAddTaskInputValue] = useState('');
  const rootEl = useRef<HTMLDivElement>(null);

  const items = useSelector(selectTodoItems);
  const idAuthUser = useSelector(getIdIsAuth);
  const dateSettingsSortBy = useSelector(selectDateSortBy);

  React.useEffect(() => {
    if (idAuthUser) {
      dispatch(fetchUserPosts(idAuthUser));
    }
  }, []);

  useEffect(() => {
    const onClick = (e: any) => {
      if (
        rootEl.current &&
        !rootEl.current.contains(e.target) &&
        e.target.tagName !== 'path' &&
        e.target.tagName !== 'svg' &&
        !e.target.className.includes('react-calendar')
      ) {
        dispatch(changeIsCalendarOpen({ id: null }));
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [rootEl]);

  const handleClickAddTaskBtn = async () => {
    const fields = {
      title: addTaskInputValue,
      isChecked: false,
      isExpanded: false,
      parentId: null,
      date: { current: new Date().getTime(), time: moment().format('h:mm:ss') },
    };

    await dispatch(fetchCreate(fields));
    await dispatch(fetchUserPosts(idAuthUser));
    setAddTaskInputValue('');
  };

  const checkDate = (arrDate: TodoDate) => {
    if (moment(arrDate.current).format('DMYYYY') === moment(new Date()).format('DMYYYY')) {
      return 'Today';
    }

    return `${dateSettingsSortBy.time ? `${arrDate.time} ` : ''}${moment(arrDate.current).format(
      dateSettingsSortBy.date,
    )}`;
  };

  const onChangeAddTaskInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddTaskInputValue(event.target.value);
  };

  const sortedItems: TodoTypeItem[][] = Object.values(
    // @ts-ignore
    Object.values(items)
      .sort((a: any, b: any) => b.date.current - a.date.current)
      .reduce((acc: any, obj: any) => {
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
          <Form>
            <TodoAddTasksInput
              type="text"
              placeholder={t('Todo.addTasksPlaceholder')}
              value={addTaskInputValue}
              onChange={onChangeAddTaskInput}
            />
            <TodoButton disabled={!addTaskInputValue} onClick={handleClickAddTaskBtn}>
              {t('Todo.addTasksButton')}
            </TodoButton>
          </Form>
        </TodoBlock>
        {sortedItems.map((arr: TodoTypeItem[], index) => (
          <TaskListItem key={index}>
            <TodoItemDate>{checkDate(arr[0].date)}</TodoItemDate>
            <TodoItem
              _id="first"
              title=""
              rootEl={rootEl}
              items={arr}
              date={{ current: 0, time: '' }}
              isExpanded
            />
          </TaskListItem>
        ))}
      </Container>
    </>
  );
};

export default Todo;
