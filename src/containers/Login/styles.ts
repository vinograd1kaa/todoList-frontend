import styled from 'styled-components';

export const Container = styled('div')`
  font-family: Comic Sans MS, Comic Sans, cursive;
  width: 400px;
  margin: 0 auto;
  position: relative;
`;

export const RegisterBlock = styled('div')`
  display: flex;
  flex-wrap: wrap;
  padding: 70px 40px;
  color: white;
  background-color: #d4d8db;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2), 0 16px 20px rgba(0, 0, 0, 0.2);

  &:after {
    content: '';
    display: table;
    clear: both;
  }
`;

export const LoginTitle = styled('h1')`
  margin: 0 auto;
  padding-bottom: 16px;
  font-size: 30px;
`;
