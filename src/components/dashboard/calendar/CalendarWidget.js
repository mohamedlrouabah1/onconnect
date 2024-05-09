// CalendarWidget.js
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './CalendarWidget.css'; // This is your custom CSS file

const CalendarWidget = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (newDate) => {
    setDate(newDate);
  };

  const tileContent = ({ date, view }) => {
    // Custom render function to display percentage
    // You need a function here to determine the percentage and color based on the date
    if (view === 'month') {
      const percentageInfo = getPercentageInfo(date);
      return (
        <div className={`percentage-indicator ${percentageInfo.className}`}>
          {percentageInfo.percentage}%
        </div>
      );
    }
  };

  return (
    <div className="calendar-container">
      <Calendar
        onChange={onChange}
        value={date}
        tileContent={tileContent}
      />
    </div>
  );
};

// A mock function to get percentage data
function getPercentageInfo(date) {
  // Your logic here to return percentage and className based on the date
  // This is just a placeholder function for the example
  const percentage = Math.random() * 100;
  let className;
  if (percentage > 75) {
    className = 'high';
  } else if (percentage > 50) {
    className = 'medium';
  } else {
    className = 'low';
  }
  return { percentage: Math.round(percentage), className };
}

export default CalendarWidget;
