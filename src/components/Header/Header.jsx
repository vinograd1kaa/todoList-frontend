import React from 'react';

import { Container, LogoContainer, Logo, RedCircle } from './styles';

function Header() {
  return (
    <Container>
      <LogoContainer>
        <RedCircle />
        <Logo />
      </LogoContainer>
    </Container>
  );
}

export default Header;
