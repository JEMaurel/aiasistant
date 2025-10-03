
import React, { useState } from 'react';
import { Appointment } from '../App';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';

interface CalendarProps {
  appointments: Appointment[];
  selectedDate: Date | null;
  onDateSelect: (date: Date | null) => void;
}

const Calendar: React.FC<CalendarProps> = ({ appointments, selectedDate, onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const isSameDay = (date1: Date, date2: Date) => {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  };
  
  const hasAppointmentOnDay = (day: Date) => {
    return appointments.some(app => isSameDay(new Date(app.dateTime), day));
  };

  const changeMonth = (amount: number) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setDate(1); // Avoid issues with different month lengths
      newDate.setMonth(newDate.getMonth() + amount);
      return newDate;
    });
  };

  const renderHeader = () => (
    <div className="flex justify-between items-center mb-4">
      <button 
        onClick={() => changeMonth(-1)} 
        className="p-2 rounded-full hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-sky-500"
        aria-label="Previous month"
      >
        <ChevronLeftIcon />
      </button>
      <h2 className="text-lg font-semibold text-sky-300 capitalize">
        {currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
      </h2>
      <button 
        onClick={() => changeMonth(1)} 
        className="p-2 rounded-full hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-sky-500"
        aria-label="Next month"
      >
        <ChevronRightIcon />
      </button>
    </div>
  );

  const renderDaysOfWeek = () => {
    const days = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];
    return (
      <div className="grid grid-cols-7 text-center text-xs text-slate-400 mb-2 font-medium">
        {days.map((day, i) => <div key={i}>{day}</div>)}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDate = new Date(monthStart);
    startDate.setDate(startDate.getDate() - monthStart.getDay());
    
    const cells = [];
    let day = startDate;
    let i = 0;
    
    while (i < 42) { // Render 6 weeks to keep layout consistent
      const cloneDay = new Date(day);
      const isCurrentMonth = cloneDay.getMonth() === currentDate.getMonth();
      const isToday = isSameDay(cloneDay, new Date());
      const isSelected = selectedDate ? isSameDay(cloneDay, selectedDate) : false;
      const hasAppointment = isCurrentMonth && hasAppointmentOnDay(cloneDay);

      cells.push(
        <div 
          key={cloneDay.toISOString()} 
          className={`h-10 flex items-center justify-center text-sm rounded-full relative transition-colors ${
            isCurrentMonth ? 'cursor-pointer' : ''
          } ${
            !isCurrentMonth ? 'text-slate-600' : 'text-slate-200'
          } ${
            isSelected ? 'bg-sky-500 text-white font-bold' : isToday ? 'bg-slate-700' : isCurrentMonth ? 'hover:bg-slate-600' : ''
          }`}
          onClick={() => isCurrentMonth && onDateSelect(cloneDay)}
        >
          <span>{cloneDay.getDate()}</span>
          {hasAppointment && <div className="absolute bottom-1.5 h-1.5 w-1.5 bg-teal-400 rounded-full"></div>}
        </div>
      );
      day.setDate(day.getDate() + 1);
      i++;
    }

    return (
      <div className="grid grid-cols-7 gap-1">
        {cells}
      </div>
    );
  };

  return (
    <div className="bg-slate-700/30 border border-slate-700 rounded-xl p-4 mb-8">
      {renderHeader()}
      {renderDaysOfWeek()}
      {renderCells()}
    </div>
  );
};

export default Calendar;
