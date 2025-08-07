export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  category: 'iec' | 'internal';
  priority: 'low' | 'medium' | 'high';
  color: string;
  reminders: Reminder[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Reminder {
  id: string;
  type: '1month' | '3weeks' | '2weeks' | '1week' | '3days' | '2days' | '1day' | 'custom';
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
  filterCategory: 'all' | 'iec' | 'internal';
  isEventFormOpen: boolean;
  editingEvent: CalendarEvent | null;
}