import React, { useState } from 'react';
import Hamburger from 'hamburger-react';
import { Link } from 'react-router-dom';
import { Container, Content, Item, ItemWrapper, Line, Button } from './styles';
import { Logo, RedCircle } from '../styles';

const HamburgerMenu: React.FC = () => {
  const links = ['projects', 'todo', 'settings'];
  const [open, setOpen] = useState(false);

  const handleClickHamburger = () => {
    setOpen(!open);
  };

  return (
    <Container>
      <Button onClick={handleClickHamburger}>
        <Hamburger />
      </Button>
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
