import styled from 'styled-components';

export const DateButton = styled.button`
  padding: 6px;
  margin: 3px 4px 3px 0;
  background: #006edc;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  border-radius: 0;
  border: none;
  background: ${({ activeButton }) => (activeButton ? '#f44336' : '#006edc')};
`;

export const LinkButton = styled.button`
  padding: 6px;
  margin: 3px 4px 3px 0;
  background: grey;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  border-radius: 0;
  border: none;
`;
