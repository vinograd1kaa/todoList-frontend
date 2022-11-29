import styled from 'styled-components';
import LogoImage from './Logo';

export const Container = styled('div')`
  padding: 16px 35px;
  background: #26262e;
  text-align: left;
  margin: 0 auto;
  display: none;

  @media (max-width: ${({ theme }) => theme.screens.sm}) {
    padding: 23px 15px;
  }

  @media (min-width: 690px) {
    display: flex;
  } ;
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
