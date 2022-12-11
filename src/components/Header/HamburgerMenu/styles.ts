import styled from 'styled-components';

export const Container = styled('div')`
  display: none;
  padding: 16px 35px;
  background: #26262e;
  @media (max-width: 690px) {
    display: block;
  } ;
`;

export const Content = styled('ul')<{ open: boolean }>`
  width: 400px;
  position: absolute;
  top: 80px;
  padding: 25px 0 45px 0;
  z-index: 999;
  background: #45485b;
  left: 0;
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 0.3s ease-in-out;
`;

export const Item = styled('li')`
  padding: 20px 0 20px 45px;
  color: white;
  font-weight: 300;
  font-size: 18px;
  font-family: Comic Sans MS, Comic Sans, cursive;
  text-transform: capitalize;

  :hover {
    background: #62667e;
  }
`;

export const ItemWrapper = styled('span')``;

export const Line = styled('div')`
  width: 100%;
  height: 1px;
  background: #fff;
`;

export const Button = styled('span')`
  color: white;
  display: block;
  width: 50px;
`;
