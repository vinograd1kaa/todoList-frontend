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

export const TasksList = styled.h2`
  margin: 0;
  padding: 0;
`;
