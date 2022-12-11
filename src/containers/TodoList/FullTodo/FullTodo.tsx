import React from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { WithTranslation } from 'react-i18next';
import { Container, FullTodoBlock, FullTodoItem, Line, FullTodoItemWrap } from './styles';
import Header from '../../../components/Header';
import EmptyFullTodo from './EmptyFullTodo';
import { getSubTasksId } from '../../../utils/todo';
import { selectTodoItems } from '../../../reducers/todo/selectors';
import { selectDateSortBy } from '../../../reducers/todoSettings/selectors';

const FullTodo: React.FC<WithTranslation> = () => {
  const { id } = useParams<{ id: string }>();
  const items = useSelector(selectTodoItems);
  const dateSettingsSortBy = useSelector(selectDateSortBy);

  const item = items[id];
  if (!item) return <EmptyFullTodo />;
  // @ts-ignore
  const subTasksId = getSubTasksId(Object.values(items), id).filter((taskId) => taskId !== id);

  const itemDate = dateSettingsSortBy
    ? moment(item.date.current).format(dateSettingsSortBy.date)
    : '  Today';

  return (
    <>
      <Header />
      <Container>
        <FullTodoBlock>
          <FullTodoItem>
            date:
            {` ${itemDate}`}
            <Line />
          </FullTodoItem>
          {Object.entries(item).map(
            (obj) =>
              obj[0] !== 'date' && (
                <FullTodoItemWrap key={obj[0]}>
                  <FullTodoItem>{`${obj[0]}: ${obj[1]}`}</FullTodoItem>
                  <Line />
                </FullTodoItemWrap>
              ),
          )}
          <FullTodoItem>
            subTasks:
            {subTasksId.length ? ` ${subTasksId.map((i) => items[i].title).join(', ')}` : ' null'}
            <Line />
          </FullTodoItem>
        </FullTodoBlock>
      </Container>
    </>
  );
};

export default FullTodo;
