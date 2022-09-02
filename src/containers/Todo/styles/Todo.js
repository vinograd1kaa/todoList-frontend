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
  cursor: pointer;
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

export const ItemCheckedCircle = styled.div`
  position: absolute;
  font-size: 20px;
  background: #fff;
  height: 23px;
  width: 23px;
  border: none;
  right: 60px;
  border-radius: 50%;
  top: ${({ todoItem }) => (todoItem ? '2px' : '8px')};
`;

export const TasksList = styled.h2`
  margin: 0;
  padding: 0;
`;

export const SubTasksList = styled.ul`
  width: 93%;
  margin-top: 10px;
`;

export const SubTaskItem = styled.li`
  border: 1px solid black;
  border-left: none;
  border-right: none;
  border-bottom: none;
  color: ${({ level }) => (level === 1 ? '#5a97c3' : 'black')};
  padding: ${({ level }) => (level === 1 ? '2px 0 2px 0' : '4px 0 4px 0')};
  margin: 5px 0;
  font-size: ${({ level }) => `${22 - level * 2}px`};
  margin-left: ${({ level }) => `${level * 10}px`};
  position: relative;
`;

export const SwitchStateSubTaskItem = styled.span`
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 14px solid black;
  position: absolute;
  left: -20px;
  top: 7px;
}`;

export const AddSubTaskInput = styled.input`
  margin: 0;
  border: 1px solid #818080;
  border-radius: 0;
  padding: 10px;
  float: left;

  &:focus {
    outline: 0;
  }
}`;

export const AddSubTaskButton = styled.button`
  padding: 9.8px;
  width: 25%;
  background: #d9d9d9;
  color: #555;
  float: left;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
  border-radius: 0;
  border: none;

  &:active {
    background: #32784e;;
  }
}`;

export const AddSubTaskForm = styled.div`
  margin: 0 auto;
  text-align: center;
  padding-top: 10px;
}`;
