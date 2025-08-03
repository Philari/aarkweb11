export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  category: 'personal' | 'work';
  priority: 'low' | 'medium' | 'high';
  color: string;
  reminders: Reminder[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Reminder {
  id: string;
  type: '1day' | '1hour' | 'custom';
  minutesBefore: number;
  enabled: boolean;
}

export type ViewMode = 'day' | 'week' | 'month';

export interface CalendarState {
  events: CalendarEvent[];
  selectedDate: Date;
  viewMode: ViewMode;
  selectedEvent: CalendarEvent | null;
  searchQuery: string;
  filterCategory: 'all' | 'personal' | 'work';
  isEventFormOpen: boolean;
  editingEvent: CalendarEvent | null;
}