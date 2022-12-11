import React, { RefObject, useState } from 'react';
import { Calendar as ReactCalendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { CalendarContainer } from './styles';
import '../../globalStyles/react-calendar.css';
import { TodoDate } from '../../reducers/todo/types';

type CalendarProps = {
  handleClickCalendarDay: (time: number) => void;
  rootEl: any;
  taskDate: TodoDate;
};

const Calendar: React.FC<CalendarProps> = ({ handleClickCalendarDay, rootEl, taskDate }) => {
  const [value, onChange] = useState<Date>(new Date(taskDate.current) || new Date());

  return (
    <CalendarContainer ref={rootEl}>
      <ReactCalendar
        className="my-calendar"
        onChange={onChange}
        value={value}
        onClickDay={(time) => handleClickCalendarDay(time.getTime())}
      />
    </CalendarContainer>
  );
};

export default Calendar;
