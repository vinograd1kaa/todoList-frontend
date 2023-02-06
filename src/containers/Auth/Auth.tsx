import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header/Header';
import {
  Container,
  AuthBlock,
  AuthBlockTitle,
  AuthItem,
  AuthItemName,
  AuthItemImage,
} from './styles';
// eslint-disable-next-line import/named
import { fetchGetAll, registeredUsers } from '../../reducers/auth';

export const Auth = () => {
  const dispatch = useDispatch();
  const users = useSelector(registeredUsers);

  useEffect(() => {
    dispatch(fetchGetAll());
  }, []);

  return (
    <>
      <Header />
      <Container>
        <AuthBlock>
          <AuthBlockTitle>Registered Accounts</AuthBlockTitle>
          {Boolean(users.length) &&
            users.map((user: any) => (
              <Link key={user._id} to={`/login/${user.email}`}>
                <AuthItem>
                  <AuthItemImage>
                    <FontAwesomeIcon icon="user" />
                  </AuthItemImage>
                  <AuthItemName>{user.fullName}</AuthItemName>
                </AuthItem>
              </Link>
            ))}
        </AuthBlock>
      </Container>
    </>
  );
};

export default Auth;
