import React from 'react';
import cl from './todo.module.css';

const Todo = (props) => {
  console.log(props.tasksList, props.numbers, props.strings, props.items);
  return (
    <div className={cl.container}>
      <div className={cl.header}>
        <h2>My To Do List</h2>
        <input type="text" placeholder="Title..." />
        <span className={cl.addBtn}>Add</span>
      </div>

      <ul>
        <li>Hit the gym</li>
        <li className={cl.checked}>Pay bills</li>
        <li>Meet George</li>
        <li>Buy eggs</li>
        <li>Read a book</li>
        <li>Organize office</li>
      </ul>
    </div>
  );
};

export default Todo;
