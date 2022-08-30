import styled from 'styled-components';
import { VideoIcon, ClockIcon } from './icons';

export const Container = styled.div`
  box-sizing: border-box;
  width: 32%;
  min-width: 340px;
  max-width: 600px;
  margin: 0 0 35px;
  padding: 17px;
  background: #363a42;
  border-top: 4px solid ${({ theme }) => theme.colors.grey180};
  border-radius: 6px;

  @media (max-width: ${({ theme }) => theme.screens.lg}) {
    width: 48%;
  }

  @media (max-width: ${({ theme }) => theme.screens.md}) {
    width: 100%;
    margin: 0 auto 20px;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
`;

export const HeaderMarkerIcon = styled.span`
  font-size: 12px;
  margin-right: 5px;
`;

export const HeaderImage = styled.img`
  width: 40px;
  height: 40px;
`;

export const HeaderInfo = styled.div`
  padding: 0 12px;
  text-align: left;
  color: ${({ theme }) => theme.colors.grey180};
`;
export const HeaderTitle = styled.div`
  font-size: 14px;
  line-height: 22px;
  font-weight: 600;
`;
export const HeaderLocation = styled.div`
  font-size: 12px;
  font-family: ${({ theme }) => theme.fonts.Roboto};
  font-weight: 400;
  line-height: 14px;
`;

export const Body = styled.div`
  padding: 15px 0;
  text-align: left;
  border-bottom: 1px solid #242629;
`;
export const BodyTitle = styled.div`
  padding: 0 0 20px;
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.white};
`;

export const BodyTags = styled.div`
  display: flex;
  font-weight: 600;
  font-family: ${({ theme }) => theme.fonts.Roboto};
`;
export const BodyTag = styled.div`
  background: #5078bf;
  border: 1px solid #eff3f5;
  border-radius: 3px;
  padding: 5px 7px;
  margin-right: 15px;
  text-align: center;
  font-size: 13px;
  line-height: 15px;
  color: ${({ theme }) => theme.colors.white};
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 0 10px;
  font-size: 13px;
  font-weight: 400;
  line-height: 15px;
  color: ${({ theme }) => theme.colors.grey180};
`;
export const FooterVideosCount = styled.div`
  height: 20px;
  vertical-align: middle;
`;
export const FooterDate = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  font-weight: 400;
  font-family: ${({ theme }) => theme.fonts.Roboto};
  color: ${({ theme }) => theme.colors.grey180};
`;

export const FooterVideoIcon = styled(VideoIcon)`
  position: relative;
  top: 2px;
  width: 20px;
  height: 18px;
  margin-right: 10px;
  fill: ${({ theme }) => theme.colors.grey180};
`;

export const FooterClockIcon = styled(ClockIcon)`
  position: relative;
  width: 22px;
  height: 22px;
  margin-right: 10px;
  fill: ${({ theme }) => theme.colors.grey180};
`;

export const FooterVideosText = styled.span`
  font-size: 13px;
  font-weight: 400;
  font-family: ${({ theme }) => theme.fonts.Roboto};
  color: ${({ theme }) => theme.colors.grey180};
`;
