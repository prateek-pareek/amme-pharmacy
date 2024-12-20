import React, { useState } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { fr } from "date-fns/locale";

const Calendar = ({ selected, onSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Generate days for the current month
  const startOfCurrentMonth = startOfMonth(currentMonth);
  const endOfCurrentMonth = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: startOfCurrentMonth, end: endOfCurrentMonth });

  // Format month
  const formattedMonth = format(currentMonth, "MMMM yyyy", { locale: fr });
  const capitalizedMonth = formattedMonth.charAt(0).toUpperCase() + formattedMonth.slice(1);

  // Handle day selection
  const handleDayClick = (day) => {
    if (onSelect) onSelect(day);
  };

  // Change month view
  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  return (
    <div className="relative bg-white border rounded-md shadow-lg p-4 w-60">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="text-gray-600 text-xl">{'<'}</button>
        <span className="text-gray-800 text-xl font-semibold">{capitalizedMonth}</span>
        <button onClick={handleNextMonth} className="text-gray-600 text-xl">{'>'}</button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 text-center text-xs text-[#787676]">
        {["DIM", "LUN", "MAR", "MER", "JEU", "VEN", "SAM"].map((day, index) => (
          <div key={index} className="font-medium">{day}</div>
        ))}

        {daysInMonth.map((day, index) => (
          <button
            key={index}
            onClick={() => handleDayClick(day)}
            className={`py-2 px-3 rounded-md ${day.getDate() === selected.getDate() && day.getMonth() === selected.getMonth() ? 'bg-blue-500 text-white' : 'bg-transparent hover:bg-blue-100'}`}
          >
            {format(day, "d")}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
