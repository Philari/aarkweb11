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
    category: 'iec' as 'iec' | 'internal',
    priority: 'medium' as 'low' | 'medium' | 'high',
    color: '#FCD34D',
    reminders: {
      oneMonthBefore: false,
      threeWeeksBefore: false,
      twoWeeksBefore: false,
      oneWeekBefore: false,
      threeDaysBefore: false,
      twoDaysBefore: false,
      oneDayBefore: true,
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
          oneMonthBefore: editingEvent.reminders.some(r => r.type === '1month' && r.enabled),
          threeWeeksBefore: editingEvent.reminders.some(r => r.type === '3weeks' && r.enabled),
          twoWeeksBefore: editingEvent.reminders.some(r => r.type === '2weeks' && r.enabled),
          oneWeekBefore: editingEvent.reminders.some(r => r.type === '1week' && r.enabled),
          threeDaysBefore: editingEvent.reminders.some(r => r.type === '3days' && r.enabled),
          twoDaysBefore: editingEvent.reminders.some(r => r.type === '2days' && r.enabled),
          oneDayBefore: editingEvent.reminders.some(r => r.type === '1day' && r.enabled),
        }
      });
    } else {
      const defaultStartDate = new Date(selectedDate);
      defaultStartDate.setHours(9, 0, 0, 0);
      const defaultEndDate = new Date(selectedDate);
      defaultEndDate.setHours(10, 0, 0, 0);

      setFormData({
        title: 'Electoral Activity',
        description: '',
        startDate: formatDateTime(defaultStartDate),
        endDate: formatDateTime(defaultEndDate),
        category: 'iec',
        priority: 'medium',
        color: '#FCD34D',
        reminders: {
          oneMonthBefore: false,
          threeWeeksBefore: false,
          twoWeeksBefore: false,
          oneWeekBefore: false,
          threeDaysBefore: false,
          twoDaysBefore: false,
          oneDayBefore: true,
        }
      });
    }
  }, [editingEvent, selectedDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const reminders = [];
    if (formData.reminders.oneMonthBefore) {
      reminders.push({
        id: crypto.randomUUID(),
        type: '1month' as const,
        minutesBefore: 43200, // 30 days * 24 hours * 60 minutes
        enabled: true
      });
    }
    if (formData.reminders.threeWeeksBefore) {
      reminders.push({
        id: crypto.randomUUID(),
        type: '3weeks' as const,
        minutesBefore: 30240, // 21 days * 24 hours * 60 minutes
        enabled: true
      });
    }
    if (formData.reminders.twoWeeksBefore) {
      reminders.push({
        id: crypto.randomUUID(),
        type: '2weeks' as const,
        minutesBefore: 20160, // 14 days * 24 hours * 60 minutes
        enabled: true
      });
    }
    if (formData.reminders.oneWeekBefore) {
      reminders.push({
        id: crypto.randomUUID(),
        type: '1week' as const,
        minutesBefore: 10080, // 7 days * 24 hours * 60 minutes
        enabled: true
      });
    }
    if (formData.reminders.threeDaysBefore) {
      reminders.push({
        id: crypto.randomUUID(),
        type: '3days' as const,
        minutesBefore: 4320, // 3 days * 24 hours * 60 minutes
        enabled: true
      });
    }
    if (formData.reminders.twoDaysBefore) {
      reminders.push({
        id: crypto.randomUUID(),
        type: '2days' as const,
        minutesBefore: 2880, // 2 days * 24 hours * 60 minutes
        enabled: true
      });
    }
    if (formData.reminders.oneDayBefore) {
      reminders.push({
        id: crypto.randomUUID(),
        type: '1day' as const,
        minutesBefore: 1440,
        enabled: true
      });
    }

    const eventData = {
      title: formData.description || 'Electoral Activity',
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-3 sm:px-4 md:px-6 py-3 sm:py-4 rounded-t-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
              {editingEvent ? 'Edit Event' : 'Create Event'}
            </h2>
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 touch-manipulation"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6">
          <div>
            <label className="block text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-2">
              Activity Description
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={2}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 resize-none text-xs sm:text-sm md:text-base"
              placeholder="Enter activity description..."
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-2">
                <Calendar className="inline h-4 w-4 mr-1" />
                Start Date & Time
              </label>
              <input
                type="datetime-local"
                required
                value={formData.startDate}
                onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 text-xs sm:text-sm md:text-base"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-2">
                <Clock className="inline h-4 w-4 mr-1" />
                End Date & Time
              </label>
              <input
                type="datetime-local"
                required
                value={formData.endDate}
                onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 text-xs sm:text-sm md:text-base"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-2">
                <Tag className="inline h-4 w-4 mr-1" />
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as 'iec' | 'internal' }))}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 text-xs sm:text-sm md:text-base"
              >
                <option value="iec">Independent Electoral Commission</option>
                <option value="internal">Internal Party Activity</option>
              </select>
            </div>

            <div>
              <label className="block text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-2">
                <Flag className="inline h-4 w-4 mr-1" />
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as 'low' | 'medium' | 'high' }))}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 text-xs sm:text-sm md:text-base"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-2 sm:mb-3">
              Reminders
            </label>
            <div className="space-y-1.5 sm:space-y-2 max-h-24 sm:max-h-32 md:max-h-none overflow-y-auto">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.reminders.oneMonthBefore}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    reminders: { ...prev.reminders, oneMonthBefore: e.target.checked }
                  }))}
                  className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-xs sm:text-sm md:text-base text-gray-700">1 month before</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.reminders.threeWeeksBefore}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    reminders: { ...prev.reminders, threeWeeksBefore: e.target.checked }
                  }))}
                  className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-xs sm:text-sm md:text-base text-gray-700">3 weeks before</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.reminders.twoWeeksBefore}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    reminders: { ...prev.reminders, twoWeeksBefore: e.target.checked }
                  }))}
                  className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-xs sm:text-sm md:text-base text-gray-700">2 weeks before</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.reminders.oneWeekBefore}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    reminders: { ...prev.reminders, oneWeekBefore: e.target.checked }
                  }))}
                  className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-xs sm:text-sm md:text-base text-gray-700">1 week before</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.reminders.threeDaysBefore}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    reminders: { ...prev.reminders, threeDaysBefore: e.target.checked }
                  }))}
                  className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-xs sm:text-sm md:text-base text-gray-700">3 days before</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.reminders.twoDaysBefore}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    reminders: { ...prev.reminders, twoDaysBefore: e.target.checked }
                  }))}
                  className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-xs sm:text-sm md:text-base text-gray-700">2 days before</span>
              </label>
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
                <span className="ml-2 text-xs sm:text-sm md:text-base text-gray-700">1 day before</span>
              </label>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-3 sm:pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-all duration-200 text-sm touch-manipulation"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md text-sm touch-manipulation"
            >
              {editingEvent ? 'Update Event' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};