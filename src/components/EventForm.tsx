import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Tag, Flag } from 'lucide-react';
import { CalendarEvent } from '../types/calendar';
import { formatDateTime } from '../utils/dateUtils';

interface EventFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Omit<CalendarEvent, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onUpdate: (eventId: string, updates: Partial<CalendarEvent>) => void;
  editingEvent: CalendarEvent | null;
  selectedDate: Date;
}

export const EventForm: React.FC<EventFormProps> = ({
  isOpen,
  onClose,
  onSave,
  onUpdate,
  editingEvent,
  selectedDate
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    category: 'personal' as 'personal' | 'work',
    priority: 'medium' as 'low' | 'medium' | 'high',
    color: '#FCD34D',
    reminders: {
      oneDayBefore: true,
      oneHourBefore: false
    }
  });

  useEffect(() => {
    if (editingEvent) {
      setFormData({
        title: editingEvent.title,
        description: editingEvent.description,
        startDate: formatDateTime(editingEvent.startDate),
        endDate: formatDateTime(editingEvent.endDate),
        category: editingEvent.category,
        priority: editingEvent.priority,
        color: editingEvent.color,
        reminders: {
          oneDayBefore: editingEvent.reminders.some(r => r.type === '1day' && r.enabled),
          oneHourBefore: editingEvent.reminders.some(r => r.type === '1hour' && r.enabled)
        }
      });
    } else {
      const defaultStartDate = new Date(selectedDate);
      defaultStartDate.setHours(9, 0, 0, 0);
      const defaultEndDate = new Date(selectedDate);
      defaultEndDate.setHours(10, 0, 0, 0);

      setFormData({
        title: '',
        description: '',
        startDate: formatDateTime(defaultStartDate),
        endDate: formatDateTime(defaultEndDate),
        category: 'personal',
        priority: 'medium',
        color: '#FCD34D',
        reminders: {
          oneDayBefore: true,
          oneHourBefore: false
        }
      });
    }
  }, [editingEvent, selectedDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const reminders = [];
    if (formData.reminders.oneDayBefore) {
      reminders.push({
        id: crypto.randomUUID(),
        type: '1day' as const,
        minutesBefore: 1440,
        enabled: true
      });
    }
    if (formData.reminders.oneHourBefore) {
      reminders.push({
        id: crypto.randomUUID(),
        type: '1hour' as const,
        minutesBefore: 60,
        enabled: true
      });
    }

    const eventData = {
      title: formData.title,
      description: formData.description,
      startDate: new Date(formData.startDate),
      endDate: new Date(formData.endDate),
      category: formData.category,
      priority: formData.priority,
      color: formData.color,
      reminders
    };

    if (editingEvent) {
      onUpdate(editingEvent.id, eventData);
    } else {
      onSave(eventData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              {editingEvent ? 'Edit Event' : 'Create Event'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter event title..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 resize-none"
              placeholder="Enter event description..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="inline h-4 w-4 mr-1" />
                Start Date & Time
              </label>
              <input
                type="datetime-local"
                required
                value={formData.startDate}
                onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="inline h-4 w-4 mr-1" />
                End Date & Time
              </label>
              <input
                type="datetime-local"
                required
                value={formData.endDate}
                onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Tag className="inline h-4 w-4 mr-1" />
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as 'personal' | 'work' }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
              >
                <option value="personal">Personal</option>
                <option value="work">Work</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Flag className="inline h-4 w-4 mr-1" />
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as 'low' | 'medium' | 'high' }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Reminders
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.reminders.oneDayBefore}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    reminders: { ...prev.reminders, oneDayBefore: e.target.checked }
                  }))}
                  className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">1 day before</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.reminders.oneHourBefore}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    reminders: { ...prev.reminders, oneHourBefore: e.target.checked }
                  }))}
                  className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">1 hour before</span>
              </label>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md"
            >
              {editingEvent ? 'Update Event' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};