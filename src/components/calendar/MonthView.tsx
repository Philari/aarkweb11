import React from 'react';
import { useState } from 'react';
import { CalendarEvent } from '../../types/calendar';
import { getDaysInMonth, isSameDay, isSameMonth, formatDate } from '../../utils/dateUtils';
import { EventCard } from '../EventCard';
import { EventModal } from '../EventModal';

interface MonthViewProps {
  selectedDate: Date;
  events: CalendarEvent[];
  onDateSelect: (date: Date) => void;
  onEventEdit: (event: CalendarEvent) => void;
  onEventDelete: (eventId: string) => void;
  onEventClick: (event: CalendarEvent) => void;
}

export const MonthView: React.FC<MonthViewProps> = ({
  selectedDate,
  events,
  onDateSelect,
  onEventEdit,
  onEventDelete,
  onEventClick
}) => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const monthDays = getDaysInMonth(selectedDate);
  const startDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
  const startDay = startDate.getDay();
  
  // Add empty cells for days before the first day of month
  const calendarDays = [
    ...Array(startDay).fill(null),
    ...monthDays
  ];

  // Add remaining days to complete the grid (6 weeks)
  while (calendarDays.length < 42) {
    const lastDay = monthDays[monthDays.length - 1];
    const nextDay = new Date(lastDay);
    nextDay.setDate(nextDay.getDate() + (calendarDays.length - monthDays.length - startDay + 1));
    calendarDays.push(nextDay);
  }

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventStart = new Date(event.startDate);
      const eventEnd = new Date(event.endDate);
      const currentDate = new Date(date);
      
      // Reset time to compare only dates
      eventStart.setHours(0, 0, 0, 0);
      eventEnd.setHours(0, 0, 0, 0);
      currentDate.setHours(0, 0, 0, 0);
      
      // Check if the current date falls within the event's date range
      return currentDate >= eventStart && currentDate <= eventEnd;
    });
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
    onEventClick(event);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Week day headers */}
      <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
        {weekDays.map(day => (
          <div key={day} className="p-2 md:p-4 text-center text-xs md:text-sm font-medium text-gray-700">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7">
        {calendarDays.map((day, index) => {
          if (!day) {
            return <div key={index} className="h-20 md:h-32 border-r border-b border-gray-100"></div>;
          }

          const dayEvents = getEventsForDate(day);
          const isCurrentMonth = isSameMonth(day, selectedDate);
          const isToday = isSameDay(day, new Date());
          const isSelected = isSameDay(day, selectedDate);

          return (
            <div
              key={day.toISOString()}
              onClick={() => onDateSelect(day)}
              className={`h-20 md:h-32 border-r border-b border-gray-100 p-1 md:p-2 cursor-pointer hover:bg-gray-50 transition-colors duration-200 ${
                !isCurrentMonth ? 'bg-gray-25 text-gray-400' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-1 md:mb-2">
                <span
                  className={`text-xs md:text-sm font-medium ${
                    isToday
                      ? 'bg-yellow-400 text-yellow-900 h-5 w-5 md:h-6 md:w-6 rounded-full flex items-center justify-center text-xs md:text-sm'
                      : isSelected
                      ? 'text-yellow-600'
                      : isCurrentMonth
                      ? 'text-gray-900'
                      : 'text-gray-400'
                  }`}
                >
                  {day.getDate()}
                </span>
              </div>

              <div className="space-y-1 overflow-hidden">
                {dayEvents.slice(0, window.innerWidth < 768 ? 1 : 2).map(event => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onEdit={onEventEdit}
                    onDelete={onEventDelete}
                    onClick={handleEventClick}
                    compact
                  />
                ))}
                {dayEvents.length > (window.innerWidth < 768 ? 1 : 2) && (
                  <div className="text-xs text-gray-500 px-1 md:px-2">
                    +{dayEvents.length - (window.innerWidth < 768 ? 1 : 2)} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      </div>

      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          isOpen={isModalOpen}
          onClose={closeModal}
          onEdit={onEventEdit}
          onDelete={onEventDelete}
        />
      )}
    </>
  );
};