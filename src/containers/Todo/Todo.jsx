import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Header, Title, Form } from './styles';
import { TodoAddTasksInput, TaskListItem, TodoAddTasksButton } from './styles/Todo';
import TodoItem from './TodoItem';

const Todo = ({ t }) => {
  const dispatch = useDispatch();
  const tasksList = useSelector((state) => state.todo.items);
  const itemIdToMove = useSelector((state) => state.todo.itemIdToMove);
  const [addTaskInputValue, setAddTaskInputValue] = useState('');

  const handleClickAddTaskBtn = () => {
    dispatch({ type: 'TODO/ADD_TASK', payload: { title: addTaskInputValue } });
    setAddTaskInputValue('');
  };

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
          <TodoAddTasksButton disabled={!addTaskInputValue} onClick={handleClickAddTaskBtn}>
            {t('Todo.addTasksButton')}
          </TodoAddTasksButton>
        </Form>
      </Header>
      <TaskListItem>
        <TodoItem items={tasksList} itemIdToMove={itemIdToMove} />
      </TaskListItem>
    </Container>
  );
};

export default Todo;
