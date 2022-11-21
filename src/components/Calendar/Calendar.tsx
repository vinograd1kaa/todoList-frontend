import React, { useState } from 'react';
import { Calendar as ReactCalendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { CalendarContainer } from './styles';
import '../../globalStyles/react-calendar.css';

type CalendarProps = {
  // handleBlurClick: (e: any) => void;
  handleClickCalendarDay: (time: number) => void;
  rootEl: any;
  // taskDate: any;
};

const Calendar: React.FC<CalendarProps> = ({
  handleClickCalendarDay,
  // handleBlurClick,
  rootEl,
  // taskDate,
}) => {
  const [value, onChange] = useState<any>(new Date());

  return (
    // <CalendarContainer ref={rootEl} onClick={(e) => handleBlurClick(e)}>
    <CalendarContainer ref={rootEl}>
      <ReactCalendar
        onChange={onChange}
        className="my-calendar"
        onClickDay={() => handleClickCalendarDay(value.getTime())}
        value={value}
      />
    </CalendarContainer>
  );
};

export default Calendar;
