import React from 'react';
import DateButtons from './DateButtons/DateButtons';
import Header from '../../../components/Header';

export const TodoSettings: React.FC = () => {
  return (
    <div>
      <Header />
      <DateButtons />
    </div>
  );
};
