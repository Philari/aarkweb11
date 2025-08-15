import React from 'react';
import { useState } from 'react';
import { CalendarEvent } from '../../types/calendar';
import { getWeekDays, isSameDay, formatDate } from '../../utils/dateUtils';
import { EventCard } from '../EventCard';
import { EventModal } from '../EventModal';

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
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const weekDays = getWeekDays(selectedDate);
  const weekDayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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

  return (
    <>
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
                    onClick={handleEventClick}
                    compact
                  />
                ))}
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