import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TodoItem = ({ id, title, expanded, subTasks }) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newSubItemTitle, setNewSubItemTitle] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingSubItem, setIsAddingSubItem] = useState(false);
  const dispatch = useDispatch();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleAdd = () => {
    setIsAddingSubItem(true);
  };

  const handleExpandCollapse = () => {
    dispatch({ type: 'TOGGLE_ITEM', payload: { id } });
  };

  const handleEditInputBlur = () => {
    setIsEditing(false);
    dispatch({ type: 'EDIT_TODO_TITLE', payload: { id, title: newTitle } });
  };

  const handleAddInputBlur = () => {
    setIsAddingSubItem(false);
    setNewSubItemTitle('');
    dispatch({ type: 'ADD_TODO', payload: { parentId: id, title: newSubItemTitle } });
  };

  const handleAddInputKeyDown = (event) => {
    if (event.keyCode === 13) {
      setIsAddingSubItem(false);
      setNewSubItemTitle('');
      dispatch({ type: 'ADD_TODO', payload: { parentId: id, title: newSubItemTitle } });
    }
  };

  const handleEditInputKeyDown = (event) => {
    if (event.keyCode === 13) {
      setIsEditing(false);
      dispatch({ type: 'EDIT_TODO_TITLE', payload: { id, title: newTitle } });
    }
  };

  return (
    <div key={id} style={{ paddingLeft: `${title ? '25px' : '0'}` }}>
      {isEditing ? (
        <input
          value={newTitle}
          onKeyDown={handleEditInputKeyDown}
          onChange={({ target }) => setNewTitle(target.value)}
          onBlur={handleEditInputBlur}
          autoFocus
        />
      ) : (
        <h4
          style={{ position: 'relative', display: `${title ? 'block' : 'none'}`, padding: '5px 0' }}
        >
          <FontAwesomeIcon
            onClick={handleExpandCollapse}
            icon={expanded ? 'chevron-down' : 'chevron-right'}
            style={{ marginRight: '5px' }}
          />
          <span onClick={handleEdit}>{title}</span>
          <span
            style={{
              marginLeft: '50px',
              position: 'absolute',
              top: '-5px',
              right: '20px',
              fontSize: '30px',
            }}
            onClick={handleAdd}
          >
            +
          </span>
        </h4>
      )}
      <ul>
        {isAddingSubItem && (
          <input
            style={{ marginLeft: '25px' }}
            autoFocus
            value={newSubItemTitle}
            onKeyDown={handleAddInputKeyDown}
            onBlur={handleAddInputBlur}
            onChange={({ target }) => setNewSubItemTitle(target.value)}
          />
        )}
        {expanded && subTasks.map((task) => <TodoItem {...task} key={task.id} />)}
      </ul>
    </div>
  );
};

export default TodoItem;
