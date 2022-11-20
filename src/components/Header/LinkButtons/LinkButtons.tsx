import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonsContainer, ButtonWrap, LinkButton } from './index';

const LinkButtons = () => {
  const links = ['projects', 'todo', 'settings'];
  return (
    <ButtonsContainer>
      {links.map((item) => (
        <ButtonWrap key={item}>
          <a href={`/${item}`}>
            <LinkButton type="submit">{item}</LinkButton>
          </a>
        </ButtonWrap>
      ))}
    </ButtonsContainer>
  );
};

export default LinkButtons;
// <Link to={{ pathname: `/${item}` }}>
