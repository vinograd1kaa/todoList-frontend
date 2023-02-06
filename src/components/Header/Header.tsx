import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { Container, LogoContainer, Logo, UserInfo, UserName, LogoutBtn, RedCircle } from './styles';
import LinkButtons from './LinkButtons/LinkButtons';
import HamburgerMenu from './HamburgerMenu/HamburgerMenu';
// eslint-disable-next-line import/named
import { getNameIsAuth } from '../../reducers/auth';

const Header: React.FC = () => {
  const pages = ['projects', 'auth', 'register', 'todo', 'settings'];
  const nameIsAuth = useSelector(getNameIsAuth) || 'You are not registered';

  return (
    <>
      <Container>
        <UserInfo>
          <FontAwesomeIcon icon="user" />
          <UserName>{nameIsAuth}</UserName>
          {!nameIsAuth.includes('registered') && <LogoutBtn>Logout</LogoutBtn>}
        </UserInfo>
        <LogoContainer>
          <RedCircle />
          <Logo />
        </LogoContainer>
        <LinkButtons links={pages} />
      </Container>
      <HamburgerMenu nameIsAuth={nameIsAuth} links={pages} />
    </>
  );
};

export default Header;
