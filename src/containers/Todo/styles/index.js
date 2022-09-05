import styled from 'styled-components';

export const Container = styled.div`
  font-family: Comic Sans MS, Comic Sans, cursive;
  width: 600px;
  margin: 0 auto;
  position: relative;
`;

export const Header = styled.div`
  background-color: #f44336;
  padding: 30px 40px;
  color: white;

  &:after {
    content: '';
    display: table;
    clear: both;
  }
`;

export const Form = styled.div`
  display: flex;
`;

export const Title = styled.h2`
  font-size: 20px;
  text-align: center;
  line-height: 50px;
`;

export const ItemListIcon = styled.span`
  position: absolute;
  font-size: 20px;
  color: #fff;
  top: 11px;
  right: 20px;
  cursor: pointer;
`;

export const CheckedTaskItem = styled.span`
  position: absolute;
  font-size: 18px;
  color: #39cd39;
  top: 3px;
  right: 3px;
`;
