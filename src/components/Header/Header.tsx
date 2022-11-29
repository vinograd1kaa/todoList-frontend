import React from 'react';
import { Container, LogoContainer, Logo, RedCircle } from './styles';
import LinkButtons from './LinkButtons/LinkButtons';
import HamburgerMenu from './HamburgerMenu/HamburgerMenu';

const Header: React.FC = () => {
  return (
    <>
      <Container>
        <LogoContainer>
          <RedCircle />
          <Logo />
        </LogoContainer>
        <LinkButtons />
      </Container>
      <HamburgerMenu />
    </>
  );
};

export default Header;
