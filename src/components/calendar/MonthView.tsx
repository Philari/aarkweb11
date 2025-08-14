import React from 'react';
import { CalendarEvent } from '../../types/calendar';
import { getDaysInMonth, isSameDay, isSameMonth, formatDate } from '../../utils/dateUtils';
import { EventCard } from '../EventCard';

interface MonthViewProps {
  selectedDate: Date;
  events: CalendarEvent[];
  onDateSelect: (date: Date) => void;
  onEventEdit: (event: CalendarEvent) => void;
  onEventDelete: (eventId: string) => void;
  onEventClick: (event: CalendarEvent) => void;
}

interface MultiDayEvent extends CalendarEvent {
  startCol: number;
  endCol: number;
  week: number;
}
export const MonthView: React.FC<MonthViewProps> = ({
  selectedDate,
  events,
  onDateSelect,
  onEventEdit,
  onEventDelete,
  onEventClick
}) => {
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

  const getSingleDayEventsForDate = (date: Date) => {
    return events.filter(event => 
      isSameDay(event.startDate, date) && isSameDay(event.startDate, event.endDate)
    );
  };

  const getMultiDayEvents = (): MultiDayEvent[] => {
    const multiDayEvents: MultiDayEvent[] = [];
    
    events.forEach(event => {
      if (!isSameDay(event.startDate, event.endDate)) {
        // Find which week(s) this event spans
        const eventStart = new Date(Math.max(event.startDate.getTime(), startDate.getTime()));
        const eventEnd = new Date(Math.min(event.endDate.getTime(), new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getTime()));
        
        let currentDate = new Date(eventStart);
        let currentWeek = Math.floor((calendarDays.findIndex(day => day && isSameDay(day, currentDate)) || 0) / 7);
        
        while (currentDate <= eventEnd) {
          const weekStart = new Date(currentDate);
          const weekEnd = new Date(currentDate);
          weekEnd.setDate(weekEnd.getDate() + (6 - currentDate.getDay()));
          
          const segmentStart = new Date(Math.max(currentDate.getTime(), eventStart.getTime()));
          const segmentEnd = new Date(Math.min(weekEnd.getTime(), eventEnd.getTime()));
          
          const startCol = segmentStart.getDay();
          const endCol = segmentEnd.getDay();
          
          multiDayEvents.push({
            ...event,
            startCol,
            endCol,
            week: currentWeek
          });
          
          currentDate = new Date(weekEnd);
          currentDate.setDate(currentDate.getDate() + 1);
          currentWeek++;
        }
      }
    });
    
    return multiDayEvents;
  };

  const multiDayEvents = getMultiDayEvents();
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Week day headers */}
      <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
        {weekDays.map(day => (
          <div key={day} className="p-4 text-center text-sm font-medium text-gray-700">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="relative">
        {/* Multi-day event bands */}
        {Array.from({ length: 6 }).map((_, weekIndex) => (
          <div key={weekIndex} className="relative h-32">
            {multiDayEvents
              .filter(event => event.week === weekIndex)
              .map((event, eventIndex) => (
                <div
                  key={`${event.id}-${weekIndex}`}
                  className="absolute top-8 h-6 rounded-md flex items-center px-2 text-xs font-medium text-white cursor-pointer hover:opacity-80 transition-opacity z-10"
                  style={{
                    backgroundColor: event.color,
                    left: `${(event.startCol / 7) * 100}%`,
                    width: `${((event.endCol - event.startCol + 1) / 7) * 100}%`,
                    top: `${32 + eventIndex * 24}px`
                  }}
                  onClick={() => onEventClick(event)}
                  title={event.title}
                >
                  <span className="truncate">{event.title}</span>
                </div>
              ))}
          </div>
        ))}
        
        {/* Calendar days grid */}
        <div className="grid grid-cols-7">
        {calendarDays.map((day, index) => {
          if (!day) {
            return <div key={index} className="h-32 border-r border-b border-gray-100"></div>;
          }

          const dayEvents = getSingleDayEventsForDate(day);
          const isCurrentMonth = isSameMonth(day, selectedDate);
          const isToday = isSameDay(day, new Date());
          const isSelected = isSameDay(day, selectedDate);

          return (
            <div
              key={day.toISOString()}
              onClick={() => onDateSelect(day)}
              className={`h-32 border-r border-b border-gray-100 p-2 cursor-pointer hover:bg-gray-50 transition-colors duration-200 ${
                !isCurrentMonth ? 'bg-gray-25 text-gray-400' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-sm font-medium ${
                    isToday
                      ? 'bg-yellow-400 text-yellow-900 h-6 w-6 rounded-full flex items-center justify-center'
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

              <div className="space-y-1 overflow-hidden mt-8">
                {dayEvents.slice(0, 1).map(event => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onEdit={onEventEdit}
                    onDelete={onEventDelete}
                    onClick={onEventClick}
                    compact
                  />
                ))}
                {dayEvents.length > 1 && (
                  <div className="text-xs text-gray-500 px-2">
                    +{dayEvents.length - 1} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
};