import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Header, Title, Form, SubTaskIcon, CheckedTaskItem } from './styles';
import {
  AddSubTaskInput,
  AddTasksButton,
  TasksList,
  AddTasksInput,
  TaskListItem,
  ItemCheckedCircle,
  SubTasksList,
  AddSubTaskButton,
  AddSubTaskForm,
} from './styles/Todo';
import TodoItem from './TodoItem';

const Todo = ({ tasksList, addTask, changeTaskChecked, addSubTask, t }) => {
  const [addTaskInputValue, setAddTaskInputValue] = useState('');
  const [addSubTaskInputValue, setAddSubTaskInputValue] = useState('');
  const [subTaskOpenedState, setSubTaskOpenedState] = useState(false);

  const [selectedTask, setSelectedTask] = useState(false);

  const handleClickAddTaskBtn = () => {
    addTask(addTaskInputValue);
    setAddTaskInputValue('');
  };

  const handleClickAddSubTaskBtn = () => {
    if (addSubTaskInputValue === '') return;
    addSubTask(selectedTask.id, addSubTaskInputValue);
    setSelectedTask({
      ...selectedTask,
      subTasks: [...selectedTask.subTasks, { title: addSubTaskInputValue, subTasks: [] }],
    });
    setAddSubTaskInputValue('');
  };

  const handleClickCircleIcon = (id, checked) => {
    changeTaskChecked(id, checked);
  };

  const handleClickListIcon = (id, title, subTasks) => {
    setSelectedTask({ id, title, subTasks });
    setSubTaskOpenedState(!subTaskOpenedState);
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
      <TasksList>
        {tasksList.map((obj) => (
          <TaskListItem selectedTask={Boolean(selectedTask)}>
            {obj.title}
            <ItemCheckedCircle onClick={() => handleClickCircleIcon(obj.id, obj.checked)}>
              <CheckedTaskItem>{obj.checked && <FontAwesomeIcon icon="check" />}</CheckedTaskItem>
            </ItemCheckedCircle>
            <SubTaskIcon onClick={() => handleClickListIcon(obj.id, obj.title, obj.subTasks)}>
              <FontAwesomeIcon icon="list" />
            </SubTaskIcon>
            {subTaskOpenedState && (
              <SubTasksList>
                <TodoItem
                  title="RDDSD"
                  items={['Feature Release', 'Bug Fix', 'Other']}
                  levels={[1, 2]}
                />
                <TodoItem
                  title="News"
                  items={['Feature Release', 'Bug Fix', 'Other']}
                  levels={[1, 2]}
                />
              </SubTasksList>
            )}
          </TaskListItem>
        ))}
      </TasksList>
      {subTaskOpenedState && (
        <AddSubTaskForm>
          <AddSubTaskInput
            value={addSubTaskInputValue}
            onChange={(e) => setAddSubTaskInputValue(e.target.value)}
          />
          <AddSubTaskButton onClick={handleClickAddSubTaskBtn}>Add</AddSubTaskButton>
        </AddSubTaskForm>
      )}
    </Container>
  );
};

export default Todo;
