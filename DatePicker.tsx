import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays, isAfter, isBefore, isToday } from 'date-fns';

interface DatePickerProps {
  selectedDate: Date | null;
  onChange: (date: Date) => void;
  onClose: () => void;
  minDate?: Date;
  maxDate?: Date;
}

const DatePicker: React.FC<DatePickerProps> = ({ 
  selectedDate, 
  onChange, 
  onClose,
  minDate = new Date(),
  maxDate,
}) => {
  const [currentMonth, setCurrentMonth] = useState(selectedDate || new Date());

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between p-2 border-b">
        <button
          type="button"
          onClick={prevMonth}
          className="p-1 rounded-full hover:bg-gray-200 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <h3 className="text-center font-medium text-gray-700">
          {format(currentMonth, 'MMMM yyyy')}
        </h3>
        <button
          type="button"
          onClick={nextMonth}
          className="p-1 rounded-full hover:bg-gray-200 transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    
    return (
      <div className="grid grid-cols-7 gap-1 py-2">
        {days.map((day) => (
          <div
            key={day}
            className="text-center text-xs text-gray-600 font-medium"
          >
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;
        const isCurrentMonth = isSameMonth(day, monthStart);
        const isDisabled = (minDate && isBefore(day, minDate)) || (maxDate && isAfter(day, maxDate));
        
        days.push(
          <button
            type="button"
            key={day.toString()}
            onClick={() => !isDisabled && onChange(cloneDay)}
            disabled={isDisabled}
            className={`
              h-8 w-8 mx-auto rounded-full flex items-center justify-center text-sm
              ${isCurrentMonth ? 'text-gray-700' : 'text-gray-400'}
              ${isSelected ? 'bg-sky-500 text-white hover:bg-sky-600' : ''}
              ${isToday(day) && !isSelected ? 'bg-sky-100 text-sky-700' : ''}
              ${!isDisabled && !isSelected ? 'hover:bg-gray-200' : ''}
              ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            {format(day, 'd')}
          </button>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day.toString()} className="grid grid-cols-7 gap-1 py-1">
          {days}
        </div>
      );
      days = [];
    }
    
    return <div className="p-2">{rows}</div>;
  };

  return (
    <div className="bg-white border rounded-lg shadow-lg w-64">
      <div className="flex items-center justify-between p-2 border-b">
        <h3 className="text-md font-medium text-gray-700">Select Date</h3>
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-200 transition-colors"
        >
          <X size={18} />
        </button>
      </div>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default DatePicker;