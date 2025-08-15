import React from 'react';
import { X, Calendar, Clock, Tag, Flag, Bell } from 'lucide-react';
import { CalendarEvent } from '../types/calendar';
import { formatDate, formatTime } from '../utils/dateUtils';

interface EventModalProps {
  event: CalendarEvent;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (event: CalendarEvent) => void;
  onDelete: (eventId: string) => void;
}

export const EventModal: React.FC<EventModalProps> = ({
  event,
  isOpen,
  onClose,
  onEdit,
  onDelete
}) => {
  if (!isOpen) return null;

  const categoryColors = {
    iec: 'bg-blue-100 text-blue-800 border-blue-200',
    internal: 'bg-purple-100 text-purple-800 border-purple-200'
  };

  const priorityColors = {
    low: 'bg-green-100 text-green-800 border-green-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    high: 'bg-red-100 text-red-800 border-red-200'
  };

  const handleEdit = () => {
    onEdit(event);
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      onDelete(event.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Activity Details</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Activity Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-relaxed">
              {event.description}
            </h3>
          </div>

          {/* Date and Time */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex items-center text-gray-700">
              <Calendar className="h-5 w-5 mr-3 text-gray-500" />
              <div>
                <div className="font-medium">Date</div>
                <div className="text-sm">
                  {formatDate(event.startDate)}
                  {event.startDate.toDateString() !== event.endDate.toDateString() && (
                    <> - {formatDate(event.endDate)}</>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center text-gray-700">
              <Clock className="h-5 w-5 mr-3 text-gray-500" />
              <div>
                <div className="font-medium">Time</div>
                <div className="text-sm">
                  {formatTime(event.startDate)} - {formatTime(event.endDate)}
                </div>
              </div>
            </div>
          </div>

          {/* Category and Priority */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center">
              <Tag className="h-4 w-4 mr-2 text-gray-500" />
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${categoryColors[event.category]}`}>
                {event.category === 'iec' ? 'Independent Electoral Commission' : 'Internal Party Activity'}
              </span>
            </div>

            <div className="flex items-center">
              <Flag className="h-4 w-4 mr-2 text-gray-500" />
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${priorityColors[event.priority]}`}>
                {event.priority.charAt(0).toUpperCase() + event.priority.slice(1)} Priority
              </span>
            </div>
          </div>

          {/* Reminders */}
          {event.reminders.length > 0 && (
            <div>
              <div className="flex items-center mb-3">
                <Bell className="h-4 w-4 mr-2 text-gray-500" />
                <span className="font-medium text-gray-700">Reminders</span>
              </div>
              <div className="space-y-2">
                {event.reminders.filter(r => r.enabled).map(reminder => (
                  <div key={reminder.id} className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <div className="text-sm text-yellow-800">
                      {reminder.type === '1month' && '1 month before'}
                      {reminder.type === '3weeks' && '3 weeks before'}
                      {reminder.type === '2weeks' && '2 weeks before'}
                      {reminder.type === '1week' && '1 week before'}
                      {reminder.type === '3days' && '3 days before'}
                      {reminder.type === '2days' && '2 days before'}
                      {reminder.type === '1day' && '1 day before'}
                      {reminder.type === 'custom' && `${reminder.minutesBefore} minutes before`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Created/Updated Info */}
          <div className="text-xs text-gray-500 pt-4 border-t border-gray-100">
            <div>Created: {event.createdAt.toLocaleString()}</div>
            <div>Updated: {event.updatedAt.toLocaleString()}</div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              onClick={handleEdit}
              className="flex-1 px-4 py-3 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Edit Activity
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 px-4 py-3 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 font-medium transition-all duration-200"
            >
              Delete Activity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};