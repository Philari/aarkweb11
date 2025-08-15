import React from 'react';
import { useState } from 'react';
import { CalendarEvent } from '../../types/calendar';
import { isSameDay, formatDate } from '../../utils/dateUtils';
import { EventCard } from '../EventCard';
import { EventModal } from '../EventModal';

interface DayViewProps {
  selectedDate: Date;
  events: CalendarEvent[];
  onEventEdit: (event: CalendarEvent) => void;
  onEventDelete: (eventId: string) => void;
  onEventClick: (event: CalendarEvent) => void;
}

export const DayView: React.FC<DayViewProps> = ({
  selectedDate,
  events,
  onEventEdit,
  onEventDelete,
  onEventClick
}) => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dayEvents = events.filter(event => 
    {
      const eventStart = new Date(event.startDate);
      const eventEnd = new Date(event.endDate);
      const currentDate = new Date(selectedDate);
      
      // Reset time to compare only dates
      eventStart.setHours(0, 0, 0, 0);
      eventEnd.setHours(0, 0, 0, 0);
      currentDate.setHours(0, 0, 0, 0);
      
      // Check if the current date falls within the event's date range
      return currentDate >= eventStart && currentDate <= eventEnd;
    }
  );

  const isToday = isSameDay(selectedDate, new Date());
  const dayName = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });

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
      <div className="bg-gray-50 border-b border-gray-200 p-3 sm:p-4 md:p-6">
        <div className="text-center">
          <div className="text-xs sm:text-sm font-medium text-gray-500 mb-1">{dayName}</div>
          <div
            className={`text-xl sm:text-2xl md:text-3xl font-bold ${
              isToday ? 'text-yellow-600' : 'text-gray-900'
            }`}
          >
            {selectedDate.getDate()}
          </div>
          <div className="text-xs sm:text-sm text-gray-600 mt-1">
            {formatDate(selectedDate)}
          </div>
        </div>
      </div>

      <div className="p-3 sm:p-4 md:p-6">
        {dayEvents.length === 0 ? (
          <div className="text-center py-6 sm:py-8 md:py-12">
            <div className="text-gray-400 text-sm sm:text-base md:text-lg mb-2">No events scheduled</div>
            <div className="text-gray-500 text-xs sm:text-sm md:text-base">
              Click "Add Event" to create your first event for this day
            </div>
          </div>
        ) : (
          <div className="space-y-2 sm:space-y-3 md:space-y-4">
            <div className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-2 sm:mb-3 md:mb-4">
              {dayEvents.length} event{dayEvents.length > 1 ? 's' : ''} scheduled
            </div>
            {dayEvents.map(event => (
              <EventCard
                key={event.id}
                event={event}
                onEdit={onEventEdit}
                onDelete={onEventDelete}
                onClick={handleEventClick}
              />
            ))}
          </div>
        )}
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