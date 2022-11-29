import React from 'react';
import DateButtons from './DateButtons/DateButtons';
import Header from '../../../components/Header';

const TodoSettings: React.FC = () => {
  return (
    <div>
      <Header />
      <DateButtons />
    </div>
  );
};

export default TodoSettings;
