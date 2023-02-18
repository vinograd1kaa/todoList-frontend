import React from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Container, FullTodoBlock, FullTodoItem, Line, FullTodoItemWrap } from './styles';
import Header from '../../../components/Header';
import EmptyFullTodo from './EmptyFullTodo';
import { getSubTasksId } from '../../../utils/getSubTasks';
import { selectDateSortBy } from '../../../reducers/todoSettings/selectors';
import { selectTodoItems } from '../../../reducers/todo/selectors';

export const FullTodo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const items = useSelector(selectTodoItems);
  const dateSettingsSortBy = useSelector(selectDateSortBy);

  const item = id && items[id];
  if (!item) return <EmptyFullTodo />;
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
            {subTasksId.length
              ? ` ${subTasksId.map((i: any) => items[i].title).join(', ')}`
              : ' null'}
            <Line />
          </FullTodoItem>
        </FullTodoBlock>
      </Container>
    </>
  );
};
