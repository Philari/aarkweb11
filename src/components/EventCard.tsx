import React from 'react';
import { useState } from 'react';
import { Clock, MapPin, Edit, Trash2, Flag } from 'lucide-react';
import { CalendarEvent } from '../types/calendar';
import { formatTime, formatDate } from '../utils/dateUtils';
import { EventTooltip } from './EventTooltip';

interface EventCardProps {
  event: CalendarEvent;
  onEdit: (event: CalendarEvent) => void;
  onDelete: (eventId: string) => void;
  onClick?: (event: CalendarEvent) => void;
  compact?: boolean;
  showTooltip?: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  onEdit,
  onDelete,
  onClick,
  compact = false,
  showTooltip = true
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const priorityColors = {
    low: 'bg-green-100 text-green-800 border-green-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    high: 'bg-red-100 text-red-800 border-red-200'
  };

  const categoryColors = {
    iec: 'bg-blue-100 text-blue-800',
    internal: 'bg-purple-100 text-purple-800'
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (showTooltip) {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (showTooltip && isHovered) {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.stopPropagation();
      onClick(event);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(event);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this event?')) {
      onDelete(event.id);
    }
  };

  if (compact) {
    return (
      <div
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        className="bg-yellow-50 border-l-2 sm:border-l-3 md:border-l-4 border-yellow-400 p-0.5 sm:p-1 md:p-2 rounded-r-lg cursor-pointer hover:bg-yellow-100 transition-colors duration-200 group touch-manipulation"
      >
        {isHovered && showTooltip && (
          <EventTooltip event={event} position={mousePosition} />
        )}
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-medium text-gray-900 truncate leading-tight">{event.description}</p>
            <p className="text-xs text-gray-600 hidden sm:block mt-0.5">
              {formatTime(event.startDate)} - {formatTime(event.endDate)}
            </p>
          </div>
          <div className="opacity-0 group-hover:opacity-100 sm:opacity-100 transition-opacity duration-200 flex space-x-0.5 sm:space-x-1 ml-1">
            <button
              onClick={handleEdit}
              className="p-1 sm:p-1.5 hover:bg-yellow-200 rounded transition-colors duration-200 touch-manipulation"
            >
              <Edit className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
            </button>
            <button
              onClick={handleDelete}
              className="p-1 sm:p-1.5 hover:bg-red-200 rounded transition-colors duration-200 touch-manipulation"
            >
              <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 md:p-6 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group touch-manipulation"
      style={{ borderLeftColor: event.color, borderLeftWidth: '4px' }}
    >
      {isHovered && showTooltip && (
        <EventTooltip event={event} position={mousePosition} />
      )}
      <div className="flex items-start justify-between mb-2 sm:mb-3 md:mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-sm sm:text-base md:text-lg mb-1 sm:mb-2">{event.title}</h3>
          <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed">{event.description}</p>
        </div>
        <div className="opacity-0 group-hover:opacity-100 sm:opacity-100 transition-opacity duration-200 flex space-x-1 sm:space-x-2 ml-2">
          <button
            onClick={handleEdit}
            className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 touch-manipulation"
          >
            <Edit className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
          </button>
          <button
            onClick={handleDelete}
            className="p-1.5 sm:p-2 hover:bg-red-100 rounded-lg transition-colors duration-200 touch-manipulation"
          >
            <Trash2 className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 md:gap-3 text-xs sm:text-sm">
        <div className="flex items-center text-gray-600">
          <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
          <span>
            {formatDate(event.startDate)} {formatTime(event.startDate)}
            {event.startDate.getTime() !== event.endDate.getTime() && (
              <> - {formatTime(event.endDate)}</>
            )}
          </span>
        </div>

        <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium ${categoryColors[event.category]}`}>
          {event.category === 'iec' ? 'IEC' : 'INT'}
        </span>

        <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium border ${priorityColors[event.priority]}`}>
          <Flag className="inline h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
          {event.priority}
        </span>
      </div>

      {event.reminders.length > 0 && (
        <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-100">
          <div className="flex items-center text-xs text-gray-500">
            <span className="bg-gray-100 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
              {event.reminders.length} reminder{event.reminders.length > 1 ? 's' : ''} set
            </span>
          </div>
        </div>
      )}
    </div>
  );
};