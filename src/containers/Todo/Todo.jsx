import React, { useState } from 'react';
import cl from './todo.module.css';

const Todo = ({ tasksList, addTask, changeTaskChecked }) => {
  const [newTaskValue, setNewTaskValue] = useState('');

  const addTaskBtn = () => {
    addTask(newTaskValue);
    setNewTaskValue('');
  };

  const changeTaskCheckbox = (id) => {
    changeTaskChecked(id);
  };

  return (
    <div className={cl.container}>
      <div className={cl.header}>
        <h2>My To Do List</h2>
        <input
          type="text"
          placeholder="Title..."
          value={newTaskValue}
          onChange={(e) => setNewTaskValue(e.target.value)}
        />
        <span onClick={() => addTaskBtn()} className={cl.addBtn}>
          Add
        </span>
      </div>
      <ul>
        {tasksList.map((obj) => (
          <li onClickCapture={() => changeTaskCheckbox(obj.id)}>{obj.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
