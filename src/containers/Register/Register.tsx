import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';
import { WithTranslation } from 'react-i18next';
import { Container, RegisterBlock, RegisterTitle } from './styles';
import Header from '../../components/Header/Header';
import { fetchRegister } from '../../reducers/auth';
import { UserType, RegisterValues } from '../../reducers/auth/types';

export const Register: React.FC<WithTranslation> = ({ t }) => {
  const [statusRegistration, setStatusRegistration] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterValues>({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<RegisterValues> = async (values: RegisterValues) => {
    // @ts-ignore
    const { payload }: UserType = await dispatch(fetchRegister(values));

    if (!payload) {
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
          <RegisterTitle>{t('Auth.Register.title')}</RegisterTitle>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              style={{ margin: 10 }}
              label="Full name"
              type="name"
              error={Boolean(errors.fullName?.message)}
              helperText={errors.fullName?.message}
              {...register('fullName', { required: t('Auth.Register.specify.name') })}
              fullWidth
            />
            <TextField
              style={{ margin: 10 }}
              label="E-Mail"
              type="email"
              error={Boolean(errors.email?.message)}
              helperText={errors.email?.message}
              {...register('email', { required: t('Auth.Register.specify.email') })}
              fullWidth
            />
            <TextField
              style={{ margin: 10 }}
              label="Password"
              type="password"
              error={Boolean(errors.password?.message)}
              helperText={errors.password?.message}
              {...register('password', { required: t('Auth.Register.specify.password') })}
              fullWidth
            />
            <Button
              style={{ border: '1px solid #337ab7', margin: 8 }}
              disabled={!isValid}
              type="submit"
            >
              {t('Auth.Register.button')}
            </Button>
          </form>
        </RegisterBlock>
      </Container>
    </>
  );
};
