import styled from 'styled-components';

export const TodoAddTasksInput = styled('input')`
  margin: 0;
  border: none;
  border-radius: 0;
  width: 75%;
  padding: 10px;
  float: left;
  font-size: 16px;

  &:focus {
    outline: 0;
  }
`;

export const TodoButton = styled('button')`
  padding: 11.3px;
  width: 25%;
  background: #d9d9d9;
  color: #555;
  float: left;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
  border-radius: 0;
  border: none;

  &:hover {
    background-color: #bbb;
  }

  &:active {
    background: #32784e;
  }
`;

export const TaskListItem = styled('ul')`
  position: relative;
  padding: 12px 8px 12px 48px;
  font-size: 18px;
  transition: 0.2s;
  color: #32784e;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background: #c5c3c3;
`;

export const TaskItem = styled('div')`
  background: burlywood;
  border: 1px solid black;
  border-left: none;
  border-right: none;
  border-bottom: none;
  padding: 5px 0 0 25px;
  position: relative;
`;

export const TaskArrowIcon = styled('span')<{ isOpened: boolean }>`
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-top: 12px solid black;
  position: absolute;
  left: 4px;
  top: 4px;
  cursor: pointer;
  transform: ${({ isOpened }) => (isOpened ? 'rotate(0)' : 'rotate(-90deg)')};
}`;

export const TaskChangePosArrowIcon = styled('span')`
  position: absolute;
  right: 100px;
  top: 3px;
  cursor: pointer;
}`;

export const TaskToggleIcon = styled('span')`
  position: absolute;
  right: 100px;
  top: 3px;
  cursor: pointer;
}`;

export const TaskTitle = styled('h4')`
  cursor: pointer;
  width: 50%;
}`;

export const TaskPlusIcon = styled('span')`
  position: absolute;
  right: 74px;
  top: 3px;
  cursor: pointer;
}`;

export const TaskTrashIcon = styled('span')`
  position: absolute;
  right: 4px;
  top: 5px;
  cursor: pointer;
  font-size: 16px;
  color: #a33939;
}`;

export const TaskTitleEditingInput = styled('input')`
  margin: 0;
  border-radius: 0;
}`;

export const TaskInputAddSubTask = styled('input')`
  margin: 0;
  border-radius: 0;
}`;

export const TaskCheckedCircle = styled('div')`
  position: absolute;
  font-size: 20px;
  background: #fff;
  height: 19px;
  width: 20px;
  border: none;
  right: 47px;
  border-radius: 50%;
  top: 2px;
`;

export const TodoCalendarIcon = styled('span')<{ isOpened: boolean }>`
  font-size: 18px;
  cursor: pointer;
  position: absolute;
  right: 25px;
  top: 2px;
  color: ${({ isOpened }) => (isOpened ? '#006edc' : '#fff')};
`;

export const TaskInfoCircle = styled('span')`
  font-size: 18px;
  cursor: pointer;
  position: absolute;
  right: 135px;
  top: 2px;
  color: grey;
`;

export const TodoItemDate = styled('p')`
  color: #006edc;
`;
