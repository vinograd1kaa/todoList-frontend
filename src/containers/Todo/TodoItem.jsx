import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TodoItem = ({ id, title, expanded, subTasks }) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newSubItemTitle, setNewSubItemTitle] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingSubItem, setIsAddingSubItem] = useState(false);
  const inputRef = useRef(null);
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

  useEffect(() => {
    function handleClickOutside(event) {
      if (isEditing && inputRef.current && !inputRef.current.contains(event.target)) {
        setIsEditing(false);
        dispatch({ type: 'EDIT_TODO_TITLE', payload: { id, title: newTitle } });
      }

      if (isAddingSubItem && inputRef.current && !inputRef.current.contains(event.target)) {
        setIsAddingSubItem(false);
        setNewSubItemTitle('');
        dispatch({ type: 'ADD_TODO', payload: { parentId: id, title: newSubItemTitle } });
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <div key={id} style={{ paddingLeft: `${title ? '25px' : '0'}` }}>
      {isEditing ? (
        <input
          ref={inputRef}
          value={newTitle}
          onChange={({ target }) => setNewTitle(target.value)}
          autoFocus
        />
      ) : (
        <h4
          style={{ position: 'relative', display: `${title ? 'block' : 'none'}`, padding: '5px 0' }}
        >
          {expanded ? (
            <FontAwesomeIcon
              onClick={handleExpandCollapse}
              icon="chevron-down"
              style={{ marginRight: '5px' }}
            />
          ) : (
            <FontAwesomeIcon
              onClick={handleExpandCollapse}
              icon="chevron-right"
              style={{ marginRight: '5px' }}
            />
          )}
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
            ref={inputRef}
            style={{ marginLeft: '25px' }}
            autoFocus
            value={newSubItemTitle}
            onChange={({ target }) => setNewSubItemTitle(target.value)}
          />
        )}
        {expanded && subTasks.map((task) => <TodoItem {...task} key={task.id} />)}
      </ul>
    </div>
  );
};

export default TodoItem;
