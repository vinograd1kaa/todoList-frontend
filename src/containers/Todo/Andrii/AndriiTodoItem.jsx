import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TodoItem = ({ parentId, id, title, expanded, subTasks }) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newSubItemTitle, setNewSubItemTitle] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingSubItem, setIsAddingSubItem] = useState(false);
  const todoIdToMove = useSelector((state) => state.todo.itemToMove);

  const dispatch = useDispatch();

  const setTodoIdToMove = (itemId) => {
    dispatch({ type: 'SET_ITEM_TO_MOVE', payload: { id: itemId, parentId } });
  };

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

  const handleMoveIconClick = () => {
    if (!todoIdToMove) return setTodoIdToMove(id);

    if (todoIdToMove === id) return setTodoIdToMove(null);

    return dispatch({ type: 'MOVE_ITEM', payload: { id } });
  };

  const getMoveTodoIconType = () => {
    if (!todoIdToMove) return 'share';

    if (todoIdToMove === id) return 'times';

    return 'save';
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
          {Boolean(subTasks.length) && (
            <FontAwesomeIcon
              onClick={handleExpandCollapse}
              icon={expanded ? 'chevron-down' : 'chevron-right'}
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
          <FontAwesomeIcon
            onClick={handleMoveIconClick}
            icon={getMoveTodoIconType()}
            style={{
              marginLeft: '50px',
              position: 'absolute',
              right: '40px',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          />
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
        {expanded && subTasks.map((task) => <TodoItem {...task} key={task.id} parentId={id} />)}
      </ul>
    </div>
  );
};

export default TodoItem;

// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { useDispatch } from 'react-redux';
// import {
//   TaskItem,
//   TasksList,
//   TaskArrowIcon,
//   TaskTitle,
//   TaskPlusIcon,
//   TaskTitleEditingInput,
//   TaskInputAddSubTask,
//   TaskChangePosArrowIcon,
//   TaskToggleIcon,
//   TaskCheckedCircle,
//   TaskTrashIcon,
//   TodoCalendarIcon,
// } from './styles/Todo';
// import Calendar from '../../components/Calendar/index';

// const TodoItem = ({ items, parentId, isChecked, itemNotToMove, idToMove, date }) => {
//   console.log(items);
//   const dispatch = useDispatch();
//   const [subTaskAddingInputState, setSubTaskAddingInputState] = useState(false);
//   const [subTaskAddingInputValue, setSubTaskAddingInputValue] = useState('');
//   const [titleEditingState, setTitleEditingState] = useState(false);
//   const [titleInputValue, setTitleInputValue] = useState('');
//
//   const handleClickAddSubTaskInputBlur = (id) => {
//     dispatch({
//       type: 'TODO/ADD_SUB_TASK',
//       payload: { id, title: subTaskAddingInputValue },
//     });
//     setSubTaskAddingInputValue('');
//     setSubTaskAddingInputState(false);
//   };
//
//   const handleKeyDownAddSubTaskInput = (e, id) => {
//     if (e.keyCode === 13) {
//       dispatch({
//         type: 'TODO/ADD_SUB_TASK',
//         payload: {
//           id,
//           title: subTaskAddingInputValue,
//         },
//       });
//       setSubTaskAddingInputValue('');
//       setSubTaskAddingInputState(false);
//     }
//   };
//
//   const handleClickTitleEditingBlur = (id) => {
//     dispatch({ type: 'TODO/CHANGE_TASK_TITLE', payload: { id, title: titleInputValue } });
//     setTitleEditingState('');
//     setTitleEditingState(false);
//   };
//
//   const handleKeyDownTitleEditing = (e, id) => {
//     if (e.keyCode === 13) {
//       dispatch({ type: 'TODO/CHANGE_TASK_TITLE', payload: { id, title: titleInputValue } });
//       setTitleInputValue('');
//       setTitleEditingState(false);
//     }
//   };
//
//   const handleClickTitle = (title, id) => {
//     setTitleInputValue(title);
//     setTitleEditingState(id);
//   };
//
//   const handleClickArrowIcon = (id) => {
//     dispatch({ type: 'TODO/CHANGE_IS_EXPENDED', payload: { id } });
//   };
//
//   // eslint-disable-next-line no-shadow
//   const handleClickCircleIcon = (id) => {
//     dispatch({ type: 'TODO/CHANGE_IS_CHECKED', payload: { id } });
//   };
//
//   const handleClickChangePos = (id) => {
//     dispatch({ type: 'TODO/ITEM_ID_TO_MOVE', payload: { id } });
//   };
//
//   const handleClickConfirmChangePos = (id) => {
//     dispatch({
//       type: 'TODO/CONFIRM_CHANGE_POS',
//       payload: { id, changePosItemId: idToMove },
//     });
//   };
//
//   const handleClickPlusIcon = (id) => {
//     setSubTaskAddingInputState(id);
//   };
//
//   const handleClickTrashIcon = (id) => {
//     dispatch({
//       type: 'TODO/DELETE_TASK',
//       payload: { id },
//     });
//   };
//
//   const handleClickCalendar = (id) => {
//     dispatch({
//       type: 'TODO/CHANGE_IS_CALENDAR_OPEN',
//       payload: { id },
//     });
//   };
//
//   const handleClickCalendarDay = (value) => {
//     dispatch({
//       type: 'TODO/CHANGE_DATE',
//       payload: {
//         date: value,
//       },
//     });
//   };
//
//   const renderMoveIcon = (item) => {
//     switch (true) {
//       case idToMove === item.id:
//         return (
//           <TaskToggleIcon onClick={() => handleClickChangePos(item.id)}>
//             <FontAwesomeIcon icon="cross" />
//           </TaskToggleIcon>
//         );
//       case idToMove && idToMove !== item.id && !itemNotToMove:
//         return (
//           <TaskToggleIcon onClick={() => handleClickConfirmChangePos(item.id)}>
//             <FontAwesomeIcon icon="sticky-note" />
//           </TaskToggleIcon>
//         );
//       default:
//         return (
//           <TaskChangePosArrowIcon onClick={() => handleClickChangePos(item.id)}>
//             <FontAwesomeIcon icon="arrow-right" />
//           </TaskChangePosArrowIcon>
//         );
//     }
//   };
//
//   const renderItems = parentId
//     ? items.filter((obj) => obj.parentId === parentId)
//     : items.filter((item) => item.parentId === null);
//
//   return (
//     <TasksList>
//       {renderItems.map((item) => (
//         <TaskItem key={item.id}>
//           {items.find((obj) => obj.parentId === item.id) && (
//             <TaskArrowIcon
//               onClick={() => handleClickArrowIcon(item.id)}
//               isExpended={item.isExpended || idToMove}
//             />
//           )}
//
//           {titleEditingState !== item.id ? (
//             <TaskTitle onClick={() => handleClickTitle(item.title, item.id)}>
//               {item.title}
//             </TaskTitle>
//           ) : (
//             <TaskTitleEditingInput
//               type="text"
//               value={titleInputValue}
//               onBlur={() => handleClickTitleEditingBlur(item.id)}
//               onChange={(e) => setTitleInputValue(e.target.value)}
//               onKeyDown={(e) => handleKeyDownTitleEditing(e, item.id)}
//               autoFocus
//             />
//           )}
//
//           {subTaskAddingInputState === item.id && (
//             <TaskInputAddSubTask
//               type="text"
//               value={subTaskAddingInputValue}
//               onBlur={() => handleClickAddSubTaskInputBlur(item.id)}
//               onChange={(e) => setSubTaskAddingInputValue(e.target.value)}
//               onKeyDown={(e) => handleKeyDownAddSubTaskInput(e, item.id)}
//               autoFocus
//             />
//           )}
//
//           <TodoCalendarIcon
//             onClick={() => handleClickCalendar(item.id)}
//             state={item.isCalendarOpen}
//           >
//             <FontAwesomeIcon icon="calendar-alt" />
//           </TodoCalendarIcon>
//
//           <TaskCheckedCircle onClick={() => handleClickCircleIcon(item.id)}>
//             {(item.isChecked || isChecked) && <FontAwesomeIcon icon="check" />}
//           </TaskCheckedCircle>
//
//           {renderMoveIcon(item)}
//
//           <TaskPlusIcon onClick={() => handleClickPlusIcon(item.id)}>
//             <FontAwesomeIcon icon="plus" />
//           </TaskPlusIcon>
//
//           <TaskTrashIcon onClick={() => handleClickTrashIcon(item.id, renderItems)}>
//             <FontAwesomeIcon icon="trash" />
//           </TaskTrashIcon>
//
//           {item.isCalendarOpen && (
//             <Calendar handleClickCalendarDay={(value) => handleClickCalendarDay(value)} />
//           )}
//
//           {(item.isExpended || idToMove) && (
//             <TodoItem
//               key={item.id}
//               items={items}
//               isChecked={isChecked || item.isChecked}
//               parentId={item.id}
//               idToMove={idToMove}
//               itemNotToMove={itemNotToMove || item.id === idToMove}
//               date={date}
//             />
//           )}
//         </TaskItem>
//       ))}
//     </TasksList>
//   );
// };
//
// export default TodoItem;

// const renderItems =
//   items && parentId
//     ? items.filter((obj) => obj.parentId === parentId)
//     : items.filter((item) => item.parentId === null);
