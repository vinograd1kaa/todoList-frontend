import React from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Container, FullTodoBlock, FullTodoItem, Line, FullTodoItemWrap } from './index';
import Header from '../../../components/Header';
import { getSubTasksId } from '../../../utils/todo';

const FullTodo = () => {
  const { id } = useParams();
  const items = useSelector((state) => state.todo.items);
  const dateSettings = useSelector((state) => state.todoSettings.dateSettings);

  const item = items[id];
  if (!item) return 'Nothing found...';

  const subTasksId = getSubTasksId(Object.values(items), id).filter((taskId) => taskId !== id);

  const itemDate = dateSettings.sortBy
    ? moment(item.date.current).format(dateSettings.sortBy.date)
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
