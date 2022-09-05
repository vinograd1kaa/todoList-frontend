import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Header, Title, Form, CheckedTaskItem, ItemListIcon } from './styles';
import {
  AddTasksButton,
  TasksList,
  AddTasksInput,
  TaskListItem,
  ItemCircleIcon,
  TaskListTitle,
  TaskLIstInput,
} from './styles/Todo';
import TodoItem from './TodoItem';

const Todo = ({ tasksList, addTask, changeTaskChecked, changeSubTaskChecked, addSubTask, t }) => {
  const [addTaskInputValue, setAddTaskInputValue] = useState('');
  const [openedTask, setOpenedTask] = useState({ opened: false, id: false });
  const [taskEditingState, setTaskEditingState] = useState(false);
  const [taskEditingInputValue, setTaskEditingInputValue] = useState('');

  const handleClickAddTaskBtn = () => {
    addTask(addTaskInputValue);
    setAddTaskInputValue('');
  };

  const handleClickTaskBlur = (id, item) => {
    if (taskEditingInputValue === '') {
      setTaskEditingState(false);
      return;
    }
    addSubTask(id, taskEditingInputValue, item);
    setTaskEditingState(false);
    setTaskEditingInputValue('');
  };

  const handleClickTaskTitle = (id) => setTaskEditingState(id);
  const handleClickCircleIcon = (id, checked, item) => changeTaskChecked(id, checked, item);
  const handleClickListIcon = (id) => setOpenedTask({ opened: !openedTask.opened, id });

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
      <TasksList>
        {tasksList.map((obj) => (
          <TaskListItem>
            <TaskListTitle onClickCapture={() => handleClickTaskTitle(obj.id)}>
              {obj.title}
            </TaskListTitle>
            {taskEditingState === obj.id && (
              <TaskLIstInput
                type="text"
                value={taskEditingInputValue}
                onChange={(e) => setTaskEditingInputValue(e.target.value)}
                onBlur={() => handleClickTaskBlur(obj.id, { ...obj })}
                /* eslint-disable-next-line jsx-a11y/no-autofocus */
                autoFocus
              />
            )}

            <ItemCircleIcon onClick={() => handleClickCircleIcon(obj.id, obj.checked, { ...obj })}>
              <CheckedTaskItem>{obj.checked && <FontAwesomeIcon icon="check" />}</CheckedTaskItem>
            </ItemCircleIcon>

            <ItemListIcon onClick={() => handleClickListIcon(obj.id)}>
              <FontAwesomeIcon icon="list" />
            </ItemListIcon>

            {openedTask.opened && openedTask.id === obj.id && (
              <TodoItem
                key={obj.id}
                items={obj.subTasks}
                addSubTask={addSubTask}
                changeSubTaskChecked={changeSubTaskChecked}
              />
            )}
          </TaskListItem>
        ))}
      </TasksList>
    </Container>
  );
};

export default Todo;
