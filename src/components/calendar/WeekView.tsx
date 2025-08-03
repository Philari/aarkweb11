import React from 'react';
import { CalendarEvent } from '../../types/calendar';
import { getWeekDays, isSameDay, formatDate } from '../../utils/dateUtils';
import { EventCard } from '../EventCard';

interface WeekViewProps {
  selectedDate: Date;
  events: CalendarEvent[];
  onDateSelect: (date: Date) => void;
  onEventEdit: (event: CalendarEvent) => void;
  onEventDelete: (eventId: string) => void;
  onEventClick: (event: CalendarEvent) => void;
}

export const WeekView: React.FC<WeekViewProps> = ({
  selectedDate,
  events,
  onDateSelect,
  onEventEdit,
  onEventDelete,
  onEventClick
}) => {
  const weekDays = getWeekDays(selectedDate);
  const weekDayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      isSameDay(event.startDate, date) || 
      (date >= event.startDate && date <= event.endDate)
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-7 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
        {weekDays.map((day, index) => {
          const dayEvents = getEventsForDate(day);
          const isToday = isSameDay(day, new Date());
          const isSelected = isSameDay(day, selectedDate);

          return (
            <div
              key={day.toISOString()}
              onClick={() => onDateSelect(day)}
              className="min-h-96 p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="text-center mb-4">
                <div className="text-sm font-medium text-gray-500 mb-1">
                  {weekDayNames[index]}
                </div>
                <div
                  className={`text-lg font-semibold ${
                    isToday
                      ? 'bg-yellow-400 text-yellow-900 h-8 w-8 rounded-full flex items-center justify-center mx-auto'
                      : isSelected
                      ? 'text-yellow-600'
                      : 'text-gray-900'
                  }`}
                >
                  {day.getDate()}
                </div>
              </div>

              <div className="space-y-2">
                {dayEvents.map(event => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onEdit={onEventEdit}
                    onDelete={onEventDelete}
                    onClick={onEventClick}
                    compact
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};