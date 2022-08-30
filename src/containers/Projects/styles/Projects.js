import styled from 'styled-components';
import LoaderComp from './Loader';

export const ProjectsContainer = styled.div`
  position: relative;
  min-height: 350px;
  padding: 30px 40px 0;
  margin-bottom: -30px;

  @media (max-width: ${({ theme }) => theme.screens.sm}) {
    padding: 30px 15px 40px;
  }
`;

export const ProjectsHeader = styled.div`
  padding: 18px 0;
  border-bottom: 3px solid #666;
`;

export const ProjectsList = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: ${({ spaceAround }) => (spaceAround ? 'space-around' : 'space-between')};
  padding: 35px 0 0;

  @media (max-width: ${({ theme }) => theme.screens.lg}) {
    justify-content: space-between;
  }
`;

export const ProjectsCount = styled.div`
  text-align: left;
  font-size: 12px;
  font-weight: 700;
  font-family: ${({ theme }) => theme.fonts.Roboto};
  color: ${({ theme }) => theme.colors.grey180};
`;

export const LoaderWrapper = styled.div`
  position: absolute;
  top: 30px;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  background: rgba(202, 202, 202, 0.6);
`;

export const Loader = styled(LoaderComp)`
  width: 300px;
  height: 300px;
  font-size: 50px;
  pointer-events: none;
  margin: auto;
  transform: rotate(0deg) translateX(-100%);

  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    animation: App-logo-spin infinite 5s linear;
  }
`;
