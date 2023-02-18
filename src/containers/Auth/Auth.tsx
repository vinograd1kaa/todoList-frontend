import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { WithTranslation } from 'react-i18next';
import Header from '../../components/Header/Header';
import {
  Container,
  AuthBlock,
  AuthBlockTitle,
  AuthItem,
  AuthItemName,
  AuthItemImage,
} from './styles';
import { registeredUsers } from '../../reducers/auth/selectors';
import { fetchGetAll } from '../../reducers/auth';
import { UserType } from '../../reducers/auth/types';

export const Auth: React.FC<WithTranslation> = ({ t }) => {
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
          <AuthBlockTitle>{t('Auth.AuthTitle')}</AuthBlockTitle>
          {Boolean(users.length) &&
            users.map((user: UserType) => (
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
