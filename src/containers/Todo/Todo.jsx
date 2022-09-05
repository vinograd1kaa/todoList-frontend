import React, { useState } from 'react';
import { Container, Header, Title, Form } from './styles';
import { AddTasksButton, AddTasksInput, TaskListItem } from './styles/Todo';
import TodoItem from './TodoItem';

const Todo = ({
  tasksList,
  addTask,
  changeSubTaskChecked,
  addSubTask,
  changeTaskTitle,
  changeIsExpended,
  t,
}) => {
  const [addTaskInputValue, setAddTaskInputValue] = useState('');

  const handleClickAddTaskBtn = () => {
    addTask(addTaskInputValue);
    setAddTaskInputValue('');
  };

  return (
    <Container>
      <Header>
        <Title>{t('Todo.pageTitle')}</Title>
        <Form>
          <AddTasksInput
            type="text"
            placeholder={t('Todo.addTasksPlaceholder')}
            value={addTaskInputValue}
            onChange={(e) => setAddTaskInputValue(e.target.value)}
          />
          <AddTasksButton disabled={addTaskInputValue === ''} onClick={handleClickAddTaskBtn}>
            {t('Todo.addTasksButton')}
          </AddTasksButton>
        </Form>
      </Header>
      <TaskListItem>
        <TodoItem
          items={tasksList}
          addSubTask={addSubTask}
          changeTaskTitle={changeTaskTitle}
          changeIsExpended={changeIsExpended}
          changeSubTaskChecked={changeSubTaskChecked}
        />
      </TaskListItem>
    </Container>
  );
};

export default Todo;
