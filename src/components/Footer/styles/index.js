import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  box-sizing: border-box;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 68px;
  width: 100%;
  padding: 23px 27px;
  background: #26262e;
  text-align: left;
  color: ${({ theme }) => theme.colors.grey180};
  font-family: ${({ theme }) => theme.fonts.Roboto};
  white-space: nowrap;

  @media (max-width: ${({ theme }) => theme.screens.sm}) {
    padding: 23px 17px;
  }
`;

export const Links = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 17px;
  line-height: 20px;
  font-weight: 500;
  color: #8d8d8e;
`;
export const Link = styled.div`
  margin-right: 25px;
  cursor: pointer;
  font-weight: 600;

  @media (max-width: ${({ theme }) => theme.screens.sm}) {
    font-size: 12px;
    display: ${({ hiddenSm }) => (hiddenSm ? 'none' : 'block')};
  }
`;
export const Copyright = styled.div`
  margin-right: 25px;
  color: #4a4a4a;

  @media (max-width: ${({ theme }) => theme.screens.sm}) {
    margin-right: 0;
  }
`;

export const IconWrapper = styled.span`
  margin-right: 20px;
  font-size: 20px;
  color: #8d8d8e;
  cursor: pointer;

  &:last-child {
    margin-right: 0;
  }

  @media (max-width: ${({ theme }) => theme.screens.sm}) {
    display: none;
  }
`;

export const CopyrightContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #4a4a4a;
  font-size: 12px;
  font-weight: 400;
`;
