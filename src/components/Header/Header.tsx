import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { Container, LogoContainer, Logo, UserInfo, UserName, LogoutBtn, RedCircle } from './styles';
import LinkButtons from './LinkButtons/LinkButtons';
import HamburgerMenu from './HamburgerMenu/HamburgerMenu';
import { clearPostsLogout } from '../../reducers/todo';
import { getNameIsAuth } from '../../reducers/auth/selectors';
import { clearDataLogout } from '../../reducers/auth';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const pages = ['projects', 'auth', 'register', 'todo', 'settings'];
  const nameIsAuth = useSelector(getNameIsAuth) || 'You are not registered';

  const handleLogout = () => {
    window.localStorage.removeItem('token');
    dispatch(clearDataLogout());
    dispatch(clearPostsLogout());
  };
  return (
    <>
      <Container>
        <UserInfo>
          <FontAwesomeIcon icon="user" />
          <UserName>{nameIsAuth}</UserName>
          {!nameIsAuth.includes('registered') && (
            <LogoutBtn onClick={handleLogout}>Logout</LogoutBtn>
          )}
        </UserInfo>
        <LogoContainer>
          <RedCircle />
          <Logo />
        </LogoContainer>
        <LinkButtons links={pages} />
      </Container>
      <HamburgerMenu nameIsAuth={nameIsAuth} links={pages} handleLogout={handleLogout} />
    </>
  );
};

export default Header;
