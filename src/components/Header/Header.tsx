import React from 'react';
import { Container, LogoContainer, Logo, RedCircle } from './styles';
import LinkButtons from './LinkButtons/LinkButtons';

function Header() {
  return (
    <Container>
      <LogoContainer>
        <RedCircle />
        <Logo />
      </LogoContainer>
      <LinkButtons />
    </Container>
  );
}

export default Header;
