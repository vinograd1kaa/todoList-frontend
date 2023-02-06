import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router';
import Header from '../../components/Header/Header';
import { Container, LoginTitle, RegisterBlock } from './styles';
import { fetchAuth, selectIsAuth } from '../../reducers/auth';

export const Login = () => {
  const { email } = useParams();
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email,
      password: '123456',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));

    if (!data.payload) {
      return alert('Не удалось авторизоваться');
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  // if (isAuth) {
  //   return <Navigate to="/todo" />;
  // }

  return (
    <>
      <Header />
      <Container>
        <RegisterBlock>
          <LoginTitle>Login</LoginTitle>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              style={{ margin: 10 }}
              label="E-Mail"
              type="email"
              error={Boolean(errors.email?.message)}
              helperText={errors.email?.message}
              {...register('email', { required: 'Укажите почту' })}
              fullWidth
            />
            <TextField
              style={{ margin: 10 }}
              label="Пароль"
              type="password"
              error={Boolean(errors.password?.message)}
              helperText={errors.password?.message}
              {...register('password', { required: 'Укажите пароль' })}
              fullWidth
            />
            <Button
              style={{ border: '1px solid #337ab7', margin: 8 }}
              disabled={!isValid}
              type="submit"
            >
              Sign in
            </Button>
          </form>
        </RegisterBlock>
      </Container>
    </>
  );
};
