import React, { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isBefore,
  isAfter,
  startOfWeek,
  addDays
} from "date-fns";
import { fr } from "date-fns/locale";

const Calendar = ({ onSelectRange, dayClassName, firstDayOfWeek = 1, locale = fr }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectingEndDate, setSelectingEndDate] = useState(false);

  // Generate days for the current month
  const startOfCurrentMonth = startOfMonth(currentMonth);
  const endOfCurrentMonth = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: startOfCurrentMonth, end: endOfCurrentMonth });

  // Format month
  const formattedMonth = format(currentMonth, "MMMM yyyy", { locale });
  const capitalizedMonth = formattedMonth.charAt(0).toUpperCase() + formattedMonth.slice(1);

  // Handle day selection
  const handleDayClick = (day) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(day);
      setEndDate(null);
      setSelectingEndDate(true);
    } else if (selectingEndDate) {
      if (day < startDate) {
        setEndDate(startDate);
        setStartDate(day);
      } else {
        setEndDate(day);
      }
      setSelectingEndDate(false);
    }
  };

  // Change month view
  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  // Helper to check if a day is within the selected range
  const isDayInRange = (day) => {
    return startDate && endDate && day >= startDate && day <= endDate;
  };

  // Handle buttons
  const handleCancel = () => {
    setStartDate(null);
    setEndDate(null);
    setSelectingEndDate(false);
  };

  const handleApply = () => {
    if (startDate && endDate && onSelectRange) {
      onSelectRange({ startDate, endDate });
    }
  };

  // Generate days of the week based on firstDayOfWeek
  const daysOfWeek = [];
  const startDay = startOfWeek(new Date(), { weekStartsOn: firstDayOfWeek, locale });
  for (let i = 0; i < 7; i++) {
    daysOfWeek.push(format(addDays(startDay, i), "ccc", { locale }));
  }

  return (
    <div className="relative bg-white border rounded-md shadow-lg p-4 w-80"> {/* Increased width */}
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="text-gray-600 text-xl">{'<'}</button>
        <span className="text-gray-800 text-xl font-semibold">{capitalizedMonth}</span>
        <button onClick={handleNextMonth} className="text-gray-600 text-xl">{'>'}</button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-0 text-center text-xs mb-4"> {/* Removed gap */}
        {daysOfWeek.map((day, index) => (
          <div key={index} className="font-medium py-2">{day.toUpperCase()}</div>
        ))}

        {daysInMonth.map((day, index) => {
          const isToday = isSameDay(day, new Date());
          const isPast = isBefore(day, new Date());
          const isFuture = isAfter(day, new Date());
          const className = dayClassName ? dayClassName(day) : "";
          return ( 
            <button
              key={index}
              onClick={() => handleDayClick(day)}
              className={`flex items-center justify-center py-3 px-3 rounded-md text-base font-medium ${
                (day.getTime() === startDate?.getTime() || day.getTime() === endDate?.getTime())
                  ? 'bg-blue-500 text-white'
                  : isDayInRange(day)
                  ? 'bg-blue-100 text-blue-500'
                  : 'bg-transparent hover:bg-blue-100'
              } ${className} ${
                isToday ? 'text-[#0c66e6]' : isPast ? 'text-[#818ea0]' : isFuture ? 'text-[#151515]' : ''
              }`}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>

      {/* Buttons */}
      <div className="flex justify-end">
        <button
          onClick={handleCancel}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
        >
          Annuler
        </button>
        <button
          onClick={handleApply}
          className="px-4 py-2 ml-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Appliquer
        </button>
      </div>
    </div>
  );
};

export default Calendar;
