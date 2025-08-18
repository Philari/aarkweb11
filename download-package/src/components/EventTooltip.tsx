import React from 'react';
import { CalendarEvent } from '../types/calendar';
import { formatDate, formatTime } from '../utils/dateUtils';
import { Clock, Calendar, Tag, Flag } from 'lucide-react';

interface EventTooltipProps {
  event: CalendarEvent;
  position: { x: number; y: number };
}

export const EventTooltip: React.FC<EventTooltipProps> = ({ event, position }) => {
  const categoryColors = {
    iec: 'bg-blue-100 text-blue-800',
    internal: 'bg-purple-100 text-purple-800'
  };

  const priorityColors = {
    low: 'text-green-600',
    medium: 'text-yellow-600',
    high: 'text-red-600'
  };

  return (
    <div
      className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm pointer-events-none"
      style={{
        left: position.x + 10,
        top: position.y - 10,
        transform: position.x > window.innerWidth / 2 ? 'translateX(-100%)' : 'none'
      }}
    >
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900 text-sm leading-tight">
          {event.description}
        </h3>
        
        <div className="space-y-2 text-xs">
          <div className="flex items-center text-gray-600">
            <Calendar className="h-3 w-3 mr-2" />
            <span>{formatDate(event.startDate)}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Clock className="h-3 w-3 mr-2" />
            <span>
              {formatTime(event.startDate)} - {formatTime(event.endDate)}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[event.category]}`}>
              {event.category === 'iec' ? 'IEC' : 'Internal'}
            </span>
            
            <div className="flex items-center">
              <Flag className={`h-3 w-3 mr-1 ${priorityColors[event.priority]}`} />
              <span className={`text-xs font-medium ${priorityColors[event.priority]}`}>
                {event.priority}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};