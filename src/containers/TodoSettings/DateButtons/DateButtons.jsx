import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DateButton } from './styles/index';

const DateSettingsButtons = ({ items }) => {
  const dispatch = useDispatch();
  const activeButton = useSelector((state) => state.todoSettings.dateSettings.activeButton);

  const handleClickSortedDate = ({ id, sortBy }) => {
    dispatch({ type: 'TODO_SETTINGS/SETTINGS_DATE', payload: { id, sortBy } });
  };

  return (
    <>
      {Object.values(items).map((item) => (
        <DateButton
          activeButton={activeButton === item.id}
          onClick={() => handleClickSortedDate({ id: item.id, sortBy: item.sortBy })}
          type="submit"
        >
          {item.title}
        </DateButton>
      ))}
    </>
  );
};

export default DateSettingsButtons;
