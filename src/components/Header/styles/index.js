import styled from 'styled-components';
import LogoImage from './Logo';

export const Container = styled.div`
  padding: 23px 35px;
  background: #26262e;
  text-align: left;

  @media (max-width: ${({ theme }) => theme.screens.sm}) {
    padding: 23px 15px;
  }
`;
export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const Logo = styled(LogoImage)`
  position: relative;
  width: 150px;
  height: 24px;
`;

export const RedCircle = styled.div`
  width: 18px;
  height: 18px;
  margin-right: 7px;
  background: #ed1637;
  border-radius: 50%;
`;
