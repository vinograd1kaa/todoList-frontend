import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DateButtonsContainer, DateButton } from './styles';
import {
  selectActiveDateButton,
  selectDateButtons,
} from '../../../../reducers/todoSettings/selectors';
import { Sort } from '../../../../reducers/todoSettings/types';

type SortDateType = {
  id: string;
  sortBy: Sort;
};

const DateSettingsButtons: React.FC = () => {
  const dispatch = useDispatch();

  const activeButton = useSelector(selectActiveDateButton);
  const items = useSelector(selectDateButtons);

  const handleClickSortedDate = ({ id, sortBy }: SortDateType) => {
    dispatch({ type: 'TODO_SETTINGS/ASYNC_SETTINGS_DATE', payload: { id, sortBy } });
  };

  return (
    <DateButtonsContainer>
      {Object.values(items).map((item) => (
        <DateButton
          bgColor={activeButton === item.id}
          onClick={() => handleClickSortedDate({ id: item.id, sortBy: item.sortBy })}
          type="submit"
          key={item.id}
        >
          {item.title}
        </DateButton>
      ))}
    </DateButtonsContainer>
  );
};

export default DateSettingsButtons;
