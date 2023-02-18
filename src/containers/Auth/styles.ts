import styled from 'styled-components';

export const Container = styled('div')`
  font-family: Comic Sans MS, Comic Sans, cursive;
  width: 400px;
  margin: 0 auto;
  position: relative;
`;

export const AuthBlock = styled('div')`
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

export const AuthBlockTitle = styled('h1')`
  font-size: 26px;
  color: #006edc;
  margin: 0 auto;
  padding-bottom: 30px;
`;

export const AuthItem = styled('div')`
  display: flex;
  align-items: center;
  width: 310px;
  background: #c5c3c3;
  padding: 4px;
  margin-bottom: 20px;
  cursor: pointer;

  border: 3px solid #fff;
  border-left: 4px solid #fff;
  border-right: 4px solid #fff;
`;

export const AuthItemName = styled('h3')`
  margin-left: 22px;
`;

export const AuthItemImage = styled('div')`
  padding: 11px;
  font-size: 26px;
  background: aqua;
  border-radius: 50%;
`;
