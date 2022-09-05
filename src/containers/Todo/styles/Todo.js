import styled from 'styled-components';

export const AddTasksInput = styled.input`
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

export const AddTasksButton = styled.button`
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

export const TaskListItem = styled.div`
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

export const ItemCircleIcon = styled.div`
  position: absolute;
  font-size: 20px;
  background: #fff;
  height: 22px;
  width: 22px;
  border: none;
  right: 60px;
  border-radius: 50%;
  cursor: pointer;
  top: ${({ todoItem }) => (todoItem ? '0' : '10px')};
  width: ${({ todoItem }) => (todoItem ? '22px' : '23px')};
  height: ${({ todoItem }) => (todoItem ? '22px' : '23px')};
`;

export const TasksList = styled.h2`
  margin: 0;
  padding: 0;
`;

export const SubTasksList = styled.ul`
  background: burlywood;
`;

export const SubTaskItem = styled.li`
  border: 1px solid black;
  border-left: none;
  border-right: none;
  border-bottom: none;
  padding: 5px 0 0 25px;
  position: relative;
`;

export const SubTaskArrowIcon = styled.span`
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-top: 12px solid black;
  position: absolute;
  left: 4px;
  top: 4px;
  cursor: pointer;
  transform: ${({ subTaskState }) => (subTaskState.opened ? 'rotate(0)' : 'rotate(-90deg)')};
}`;

export const SubTaskTitle = styled.h4`
  width: 30%;
  cursor: pointer;
}`;

export const TaskListTitle = styled.h4`
  margin-bottom: 3px;
}`;

export const TaskLIstInput = styled.input``;

export const AddSubTaskInput = styled.input`
  margin: 0;
  border-radius: 0;
}`;
