import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DateButtons from './DateButtons/DateButtons';
import { LinkButton } from './DateButtons/styles';
import Header from '../../components/Header';

const TodoSettings = () => {
  const sortButtons = useSelector((state) => state.todoSettings.sortButtons);

  return (
    <div>
      <Header />
      <DateButtons items={sortButtons} />
      <Link to="/todo">
        <LinkButton>Todo</LinkButton>
      </Link>
    </div>
  );
};

export default TodoSettings;
