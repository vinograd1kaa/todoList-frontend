import styled from 'styled-components';

export const Container = styled('div')`
  font-family: Comic Sans MS, Comic Sans, cursive;
  width: 680px;
  margin: 0 auto;
  position: relative;
`;

export const TodoBlock = styled('div')`
  background-color: #f44336;
  padding: 30px 40px;
  color: white;

  &:after {
    content: '';
    display: table;
    clear: both;
  }
`;

export const Form = styled('div')`
  display: flex;
`;

export const Title = styled('h2')`
  font-size: 20px;
  text-align: center;
  line-height: 50px;
`;
