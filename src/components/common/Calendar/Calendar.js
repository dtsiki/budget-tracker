import PropTypes from 'prop-types';
import React from 'react';
import DayPicker from 'react-day-picker';

import './style.scss';
import 'react-day-picker/lib/style.css';

const Calendar = ({ selectedDate, setSelectedDate }) => {
  const dayOfWeekArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

  const handleDayClick = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="calendar">
      <DayPicker
        onDayClick={handleDayClick}
        weekdaysLong={dayOfWeekArray}
        weekdaysShort={dayOfWeekArray}
        firstDayOfWeek={1}
        selectedDays={selectedDate}
      />
    </div>
  );
};

Calendar.propTypes = {
  selectedDate: PropTypes.object,
  setSelectedDate: PropTypes.func,
};

export default Calendar;
