import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Container, RegisterBlock, RegisterTitle } from './styles';
import Header from '../../components/Header/Header';
import { fetchRegister } from '../../reducers/auth';

export const Register = () => {
  const [statusRegistration, setStatusRegistration] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    if (!data.payload) {
      return alert('Не удалось зарегестрироваться');
    }

    setStatusRegistration(true);
  };

  if (statusRegistration) {
    return <Navigate to="/auth" />;
  }

  return (
    <>
      <Header />
      <Container>
        <RegisterBlock>
          <RegisterTitle>Registration</RegisterTitle>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              style={{ margin: 10 }}
              label="Full name"
              type="name"
              error={Boolean(errors.fullName?.message)}
              helperText={errors.fullName?.message}
              {...register('fullName', { required: 'Укажите полное имя' })}
              fullWidth
            />
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
              Register
            </Button>
          </form>
        </RegisterBlock>
      </Container>
    </>
  );
};
