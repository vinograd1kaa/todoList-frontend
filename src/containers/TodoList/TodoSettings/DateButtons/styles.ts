import styled from 'styled-components';

export const DateButtonsContainer = styled('div')`
  margin-top: 76px;
`;

export const DateButton = styled('button')<{ bgColor: boolean }>`
  padding: 6px;
  margin: 3px 4px 3px 0;
  background: #006edc;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  border-radius: 0;
  border: none;
  background: ${({ bgColor }) => (bgColor ? '#f44336' : '#006edc')};
`;
