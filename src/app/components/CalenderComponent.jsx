'use client';

import { useState } from 'react';
import { DateRange } from 'react-date-range';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';


const CalenderComponent = ({onDateSelect,closeCalendar,}) => {
  const [date, setDate] = useState([{startDate: new Date(), endDate: new Date(), key: 'selection',},]);

  const confirmDates = () => {
    const selectedDates = {checkIn: date[0].startDate, checkOut: date[0].endDate,};

    console.log("Selected Dates:", selectedDates);

    onDateSelect(selectedDates);

    closeCalendar();
  };

  return (
    <div>
      <DateRange
        editableDateInputs
        onChange={(item) =>
          setDate([item.selection])
        }
        moveRangeOnFirstSelection={false}
        ranges={date}
        minDate={new Date()}
      />

      <button
        onClick={confirmDates}
        style={{
          width: '100%',
          padding: '14px',
          marginTop: '15px',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
          fontWeight: '600',
        }}
      >
        Confirm Dates
      </button>
    </div>
  );
};

export default CalenderComponent;