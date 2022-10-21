import React, { useState } from 'react';
import { Calendar as ReactCalendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { CalendarContainer } from './styles/index';
import '../../globalStyles/react-calendar.css';

const Calendar = ({ handleClickCalendarDay }) => {
  const [value, onChange] = useState(new Date());

  return (
    <CalendarContainer>
      <ReactCalendar
        onChange={onChange}
        className="my-calendar"
        onClickDay={handleClickCalendarDay(value.getTime())}
        value={value}
      />
    </CalendarContainer>
  );
};

export default Calendar;
