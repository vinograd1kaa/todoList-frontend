import styled from 'styled-components';
import LogoImage from './Logo';

export const Container = styled('div')`
  display: none;
  position: relative;
  text-align: left;
  margin: 0 auto;
  padding: 16px 35px;
  background: #26262e;
  font-family: Comic Sans MS, Comic Sans, cursive;

  @media (max-width: ${({ theme }) => theme.screens.sm}) {
    padding: 23px 15px;
  }

  @media (min-width: 900px) {
    display: flex;
  } ;
`;

export const UserInfo = styled('div')`
  display: flex;
  width: 225px;
  padding: 10px;
  position: absolute;
  bottom: -60px;
  left: 0;
  border: 3px solid #26262e;
  background: aqua;
`;

export const UserName = styled('h3')`
  margin-left: 8px;
`;

export const LogoutBtn = styled('button')`
  margin-left: 8px;
  background: #ed1637;
  cursor: pointer;
`;

export const LogoContainer = styled('div')`
  display: flex;
`;

export const Logo = styled(LogoImage)<{ center: boolean }>`
  position: relative;
  width: 150px;
  height: 24px;

  margin-left: ${({ center }) => (center ? '100px' : '')};
  padding-bottom: ${({ center }) => (center ? '20px' : '')};
`;

export const RedCircle = styled('div')<{ right?: boolean }>`
  width: 18px;
  height: 18px;
  margin-right: 7px;
  background: #ed1637;
  border-radius: 50%;

  margin-top: ${({ right }) => (right ? '21px' : '')};
  position: ${({ right }) => (right ? 'absolute' : 'none')};
  right: ${({ right }) => (right ? '20px' : '')};
`;
