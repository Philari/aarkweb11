import React from 'react';
import { CalendarEvent, ViewMode } from '../../types/calendar';
import { MonthView } from './MonthView';
import { WeekView } from './WeekView';
import { DayView } from './DayView';
import { CalendarNavigation } from './CalendarNavigation';

interface CalendarViewProps {
  viewMode: ViewMode;
  selectedDate: Date;
  events: CalendarEvent[];
  onDateSelect: (date: Date) => void;
  onEventEdit: (event: CalendarEvent) => void;
  onEventDelete: (eventId: string) => void;
  onEventClick: (event: CalendarEvent) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  viewMode,
  selectedDate,
  events,
  onDateSelect,
  onEventEdit,
  onEventDelete,
  onEventClick
}) => {
  const renderCalendarContent = () => {
    switch (viewMode) {
      case 'month':
        return (
          <MonthView
            selectedDate={selectedDate}
            events={events}
            onDateSelect={onDateSelect}
            onEventEdit={onEventEdit}
            onEventDelete={onEventDelete}
            onEventClick={onEventClick}
          />
        );
      case 'week':
        return (
          <WeekView
            selectedDate={selectedDate}
            events={events}
            onDateSelect={onDateSelect}
            onEventEdit={onEventEdit}
            onEventDelete={onEventDelete}
            onEventClick={onEventClick}
          />
        );
      case 'day':
        return (
          <DayView
            selectedDate={selectedDate}
            events={events}
            onEventEdit={onEventEdit}
            onEventDelete={onEventDelete}
            onEventClick={onEventClick}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <CalendarNavigation
        selectedDate={selectedDate}
        viewMode={viewMode}
        onDateChange={onDateSelect}
      />
      <div className="flex-1 p-6">
        {renderCalendarContent()}
      </div>
    </div>
  );
};