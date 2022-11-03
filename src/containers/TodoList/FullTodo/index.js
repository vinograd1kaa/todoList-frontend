import styled from 'styled-components';

export const Container = styled.div`
  font-family: Comic Sans MS, Comic Sans, cursive;
  width: 450px;
  margin: 0 auto;
  position: relative;
`;

export const FullTodoBlock = styled.div`
  background-color: burlywood;
  padding: 70px 40px;
  color: white;

  &:after {
    content: '';
    display: table;
    clear: both;
  }
`;

export const Line = styled.hr`
  hr {
    border: none;
    background-color: red;
    color: red;
    height: 2px;
  }
`;

export const FullTodoItemWrap = styled.div``;

export const FullTodoItem = styled.div`
  padding: 3px 0;
`;
