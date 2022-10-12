import React, { useState } from 'react';
import { Calendar as ReactCalendar } from 'react-calendar';
import './Calendar.css';
import { useDispatch } from 'react-redux';
import { CalendarContainer } from '../styles';

const Calendar = ({ calendarDate }) => {
  const dispatch = useDispatch();
  const [value, onChange] = useState(calendarDate || new Date());

  const handleClickDay = () => {
    const dateLetters = value
      .toString()
      .split(' ')
      .map((el) => el);

    dispatch({
      type: 'TODO/CHANGE_DATE',
      payload: {
        date: { day: dateLetters[2], month: dateLetters[1], year: dateLetters[3] },
        calendarDate: value,
      },
    });
  };

  return (
    <CalendarContainer>
      <ReactCalendar onChange={onChange} onClickDay={handleClickDay} value={value} />
    </CalendarContainer>
  );
};

export default Calendar;
