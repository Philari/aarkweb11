import { useState, useEffect, useCallback } from 'react';
import { CalendarEvent, CalendarState, ViewMode } from '../types/calendar';
import { generateElectoralEvents } from '../utils/electoralData';
import { googleCalendarService } from '../services/googleCalendar';
import { googleAuthService } from '../services/googleAuth';

const STORAGE_KEY = 'calendar-events';
const SYNC_KEY = 'last-sync-time';

export const useCalendar = () => {
  const [state, setState] = useState<CalendarState>({
    events: [],
    selectedDate: new Date(),
    viewMode: 'month',
    selectedEvent: null,
    searchQuery: '',
    filterCategory: 'all',
    isEventFormOpen: false,
    editingEvent: null
  });
  
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);

  // Load events from localStorage on mount
  useEffect(() => {
    const savedEvents = localStorage.getItem(STORAGE_KEY);
    if (savedEvents) {
      const events = JSON.parse(savedEvents).map((event: any) => ({
        ...event,
        startDate: new Date(event.startDate),
        endDate: new Date(event.endDate),
        createdAt: new Date(event.createdAt),
        updatedAt: new Date(event.updatedAt)
      }));
      setState(prev => ({ ...prev, events }));
    } else {
      // Initialize with electoral data if no saved events
      const electoralEvents = generateElectoralEvents();
      setState(prev => ({ ...prev, events: electoralEvents }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(electoralEvents));
    }
    
    // Load last sync time
    const savedSyncTime = localStorage.getItem(SYNC_KEY);
    if (savedSyncTime) {
      setLastSyncTime(new Date(savedSyncTime));
    }
  }, []);

  // Save events to localStorage whenever events change
  const saveEvents = useCallback((events: CalendarEvent[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }, []);

  const updateState = useCallback((updates: Partial<CalendarState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const addEvent = useCallback((event: Omit<CalendarEvent, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newEvent: CalendarEvent = {
      ...event,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setState(prev => {
      const updatedEvents = [...prev.events, newEvent];
      saveEvents(updatedEvents);
      return { ...prev, events: updatedEvents, isEventFormOpen: false };
    });
  }, [saveEvents]);

  const updateEvent = useCallback((eventId: string, updates: Partial<CalendarEvent>) => {
    setState(prev => {
      const updatedEvents = prev.events.map(event => 
        event.id === eventId 
          ? { ...event, ...updates, updatedAt: new Date() }
          : event
      );
      saveEvents(updatedEvents);
      return { 
        ...prev, 
        events: updatedEvents, 
        isEventFormOpen: false,
        editingEvent: null
      };
    });
  }, [saveEvents]);

  const deleteEvent = useCallback((eventId: string) => {
    setState(prev => {
      const updatedEvents = prev.events.filter(event => event.id !== eventId);
      saveEvents(updatedEvents);
      return { ...prev, events: updatedEvents, selectedEvent: null };
    });
  }, [saveEvents]);

  const setViewMode = useCallback((viewMode: ViewMode) => {
    updateState({ viewMode });
  }, [updateState]);

  const setSelectedDate = useCallback((date: Date) => {
    updateState({ selectedDate: date });
  }, [updateState]);

  const setSearchQuery = useCallback((query: string) => {
    updateState({ searchQuery: query });
  }, [updateState]);

  const setFilterCategory = useCallback((category: 'all' | 'personal' | 'work') => {
    updateState({ filterCategory: category });
  }, [updateState]);

  const openEventForm = useCallback((event?: CalendarEvent) => {
    updateState({ 
      isEventFormOpen: true, 
      editingEvent: event || null 
    });
  }, [updateState]);

  const closeEventForm = useCallback(() => {
    updateState({ 
      isEventFormOpen: false, 
      editingEvent: null 
    });
  }, [updateState]);

  const selectEvent = useCallback((event: CalendarEvent | null) => {
    updateState({ selectedEvent: event });
  }, [updateState]);

  const syncWithGoogle = useCallback(async () => {
    if (!googleAuthService.isSignedIn()) {
      throw new Error('User not authenticated');
    }

    try {
      // Sync local events to Google Calendar
      await googleCalendarService.syncEventsToGoogle(state.events);
      
      // Sync Google Calendar events to local
      const googleEvents = await googleCalendarService.syncEventsFromGoogle();
      
      // Merge events (prioritize local events for conflicts)
      const mergedEvents = [...state.events];
      googleEvents.forEach(googleEvent => {
        const existingEvent = mergedEvents.find(e => e.id === googleEvent.id);
        if (!existingEvent) {
          mergedEvents.push(googleEvent);
        }
      });
      
      setState(prev => ({ ...prev, events: mergedEvents }));
      saveEvents(mergedEvents);
      
      const syncTime = new Date();
      setLastSyncTime(syncTime);
      localStorage.setItem(SYNC_KEY, syncTime.toISOString());
    } catch (error) {
      console.error('Sync failed:', error);
      throw error;
    }
  }, [state.events, saveEvents]);
  return {
    ...state,
    lastSyncTime,
    addEvent,
    updateEvent,
    deleteEvent,
    setViewMode,
    setSelectedDate,
    setSearchQuery,
    setFilterCategory,
    openEventForm,
    closeEventForm,
    selectEvent,
    syncWithGoogle
  };
};