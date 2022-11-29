import React from 'react';
import { WithTranslation } from 'react-i18next';
import Header from '../../../../components/Header/Header';

const EmptyFullTodo: React.FC<WithTranslation> = ({ t }) => {
  return (
    <>
      <Header />
      <h1>{t('Todo.emptyFullTodo')}</h1>
    </>
  );
};

export default EmptyFullTodo;
