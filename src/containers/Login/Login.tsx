import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Button, TextField } from '@mui/material';
import { useParams } from 'react-router';
import { WithTranslation } from 'react-i18next';
import Header from '../../components/Header/Header';
import { Container, LoginTitle, RegisterBlock } from './styles';
import { fetchAuth } from '../../reducers/auth';
import { LoginValues, UserType } from '../../reducers/auth/types';

export const Login: React.FC<WithTranslation> = ({ t }) => {
  const { email } = useParams();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginValues>({
    defaultValues: {
      email,
      password: '123456',
    },
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<LoginValues> = async (values: LoginValues) => {
    // @ts-ignore
    const { payload }: UserType = await dispatch(fetchAuth(values));

    if (!payload) {
      return alert('Не удалось авторизоваться');
    }

    if ('token' in payload) {
      window.localStorage.setItem('token', payload.token);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <RegisterBlock>
          <LoginTitle>{t('Auth.Login.title')}</LoginTitle>
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
              {t('Auth.Login.button')}
            </Button>
          </form>
        </RegisterBlock>
      </Container>
    </>
  );
};
