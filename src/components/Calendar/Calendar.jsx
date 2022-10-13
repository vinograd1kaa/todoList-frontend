import React, { useState } from 'react';
import { Calendar as ReactCalendar } from 'react-calendar';
import './styles/Calendar.css';
import { CalendarContainer } from './styles/index';

const Calendar = ({ calendarDate, handleClickCalendarDay }) => {
  const [value, onChange] = useState(calendarDate || new Date());

  return (
    <CalendarContainer>
      <ReactCalendar onChange={onChange} onClickDay={handleClickCalendarDay(value)} value={value} />
    </CalendarContainer>
  );
};

export default Calendar;
