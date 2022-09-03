import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Container, Header, Title, Form } from './styles';
import { AddTasksButton, TasksList, AddTasksInput } from './styles/Todo';
import TodoItem from './TodoItem';

const Todo = ({ tasksList, t }) => {
  const [todoText, setTodoText] = useState('');
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch({ type: 'ADD_TODO', payload: { title: todoText } });
    setTodoText('');
  };

  return (
    <Container>
      <Header>
        <Title>{t('Todo.pageTitle')}</Title>
        <Form>
          <AddTasksInput
            type="text"
            placeholder={t('Todo.addTasksPlaceholder')}
            value={todoText}
            onChange={({ target }) => setTodoText(target.value)}
          />
          <AddTasksButton onClick={handleAdd} disabled={!todoText}>
            {t('Todo.addTasksButton')}
          </AddTasksButton>
        </Form>
      </Header>
      <TasksList>
        <TodoItem title="" id="1" subTasks={tasksList} expanded />
      </TasksList>
    </Container>
  );
};

export default Todo;
