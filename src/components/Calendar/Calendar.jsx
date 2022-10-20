import React, { useState } from 'react';
import { Calendar as ReactCalendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './styles/Calendar.css';
import { CalendarContainer } from './styles/index';

const Calendar = ({ handleClickCalendarDay }) => {
  const [value, onChange] = useState(new Date());

  return (
    <CalendarContainer>
      <ReactCalendar
        onChange={onChange}
        onClickDay={handleClickCalendarDay(value.getTime())}
        value={value}
      />
    </CalendarContainer>
  );
};

export default Calendar;
