import React from 'react';
import { useSelector } from 'react-redux';
import DateButtons from './DateButtons/DateButtons';
import Header from '../../components/Header';

const TodoSettings = () => {
  const sortButtons = useSelector((state) => state.todoSettings.sortButtons);

  return (
    <div>
      <Header />
      <DateButtons items={sortButtons} />
    </div>
  );
};

export default TodoSettings;
