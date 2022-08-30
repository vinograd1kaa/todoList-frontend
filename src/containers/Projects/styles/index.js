import styled from 'styled-components';
import PeopleBg from '../../../images/people-bg.png';
import MobileBg from '../../../images/mobile-bg.png';

export const Container = styled.div`
  background: #26262e;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.SourceSansPro};
`;

export const BgImage = styled.div`
  position: relative;
  z-index: 2;
  box-sizing: border-box;
  min-height: 280px;
  padding: 100px 20px 100px;
  background-image: url(${PeopleBg});
  background-size: cover;
  background-repeat: no-repeat;

  @media (max-width: ${({ theme }) => theme.screens.sm}) {
    background-image: url(${MobileBg});
  }
`;

export const Title = styled.h1`
  font-size: 40px;
  line-height: 50px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
`;

export const SubTitle = styled.h2`
  font-size: 24px;
  font-weight: 400;
  line-height: 30px;
  color: ${({ theme }) => theme.colors.white};
`;

export const SearchContainer = styled.div`
  position: absolute;
  display: inline-block;
  left: 50%;
  bottom: -25px;
  height: 50px;
  width: 50%;
  min-width: 300px;
  max-width: 600px;
  transform: translateX(-50%);

  @media (max-width: ${({ theme }) => theme.screens.lg}) {
  }
`;
export const Search = styled.input`
  box-sizing: border-box;
  display: inline-block;
  width: 100%;
  height: 100%;
  padding: 0 12px 0 40px;
  background: #202123;
  border: 2px solid #363a42;
  font-family: ${({ theme }) => theme.fonts.Roboto};
  color: ${({ theme }) => theme.colors.white};

  &:focus {
    outline: 0;
  }

  &::placeholder {
    color: #e6e6e6;
  }
`;

export const SearchIcon = styled.span`
  position: absolute;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.white};
  top: 16px;
  left: 15px;
`;
