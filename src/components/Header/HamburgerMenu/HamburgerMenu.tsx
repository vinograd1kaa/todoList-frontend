import React, { useState } from 'react';
import Hamburger from 'hamburger-react';
import { Link } from 'react-router-dom';
import {
  Container,
  Content,
  Item,
  ItemWrapper,
  Line,
  Button,
  UserInfoWrapper,
  UserInfo,
  LogoutBtn,
} from './styles';
import { Logo, RedCircle } from '../styles';

type HamburgerMenuParams = {
  links: string[];
  nameIsAuth: string;
};

const HamburgerMenu: React.FC<HamburgerMenuParams> = ({ nameIsAuth, links }) => {
  const [open, setOpen] = useState(false);

  const handleClickHamburger = () => {
    setOpen(!open);
  };

  return (
    <Container>
      <Button onClick={handleClickHamburger}>
        <Hamburger />
      </Button>
      <UserInfoWrapper>
        <UserInfo>{nameIsAuth}</UserInfo>
        {!nameIsAuth.includes('registered') && <LogoutBtn>Logout</LogoutBtn>}
      </UserInfoWrapper>
      <Content open={open}>
        <Logo center="true" />
        <Line />
        {links.map((item) => (
          <ItemWrapper key={item}>
            <RedCircle right />
            <Link to={`/${item}`}>
              <Item>{item}</Item>
            </Link>
            <Line />
          </ItemWrapper>
        ))}
      </Content>
    </Container>
  );
};

export default HamburgerMenu;
