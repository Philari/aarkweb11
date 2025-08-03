import React from 'react';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { ViewMode } from '../../types/calendar';
import { formatDate } from '../../utils/dateUtils';

interface CalendarNavigationProps {
  selectedDate: Date;
  viewMode: ViewMode;
  onDateChange: (date: Date) => void;
}

export const CalendarNavigation: React.FC<CalendarNavigationProps> = ({
  selectedDate,
  viewMode,
  onDateChange
}) => {
  const goToPrevious = () => {
    const newDate = new Date(selectedDate);
    switch (viewMode) {
      case 'day':
        newDate.setDate(newDate.getDate() - 1);
        break;
      case 'week':
        newDate.setDate(newDate.getDate() - 7);
        break;
      case 'month':
        newDate.setMonth(newDate.getMonth() - 1);
        break;
    }
    onDateChange(newDate);
  };

  const goToNext = () => {
    const newDate = new Date(selectedDate);
    switch (viewMode) {
      case 'day':
        newDate.setDate(newDate.getDate() + 1);
        break;
      case 'week':
        newDate.setDate(newDate.getDate() + 7);
        break;
      case 'month':
        newDate.setMonth(newDate.getMonth() + 1);
        break;
    }
    onDateChange(newDate);
  };

  const goToToday = () => {
    onDateChange(new Date());
  };

  const getDateDisplayText = () => {
    switch (viewMode) {
      case 'day':
        return formatDate(selectedDate);
      case 'week':
        const startOfWeek = new Date(selectedDate);
        const day = startOfWeek.getDay();
        startOfWeek.setDate(startOfWeek.getDate() - day);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 6);
        return `${formatDate(startOfWeek)} - ${formatDate(endOfWeek)}`;
      case 'month':
        return selectedDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long'
        });
    }
  };

  return (
    <div className="flex items-center justify-between bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center space-x-4">
        <button
          onClick={goToToday}
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 flex items-center space-x-2"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Today</span>
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={goToPrevious}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        </button>

        <h2 className="text-lg font-semibold text-gray-900 min-w-0">
          {getDateDisplayText()}
        </h2>

        <button
          onClick={goToNext}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          <ChevronRight className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      <div className="w-20"></div> {/* Spacer for balance */}
    </div>
  );
};