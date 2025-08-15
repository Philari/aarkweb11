import { CalendarEvent } from '../types/calendar';
import { GoogleCalendarEvent } from '../types/auth';
import { googleAuthService } from './googleAuth';

class GoogleCalendarService {
  private gapi: any = null;
  private isInitialized = false;

  constructor() {
    // Initialize gapi when it becomes available
    this.initializeWhenReady();
  }

  private async initializeWhenReady() {
    // Wait for gapi to be available
    const checkGapi = () => {
      if (window.gapi && window.gapi.client) {
        this.gapi = window.gapi;
        this.isInitialized = true;
        console.log('Google Calendar service initialized');
      } else {
        setTimeout(checkGapi, 100);
      }
    };
    checkGapi();
  }

  async syncEventsToGoogle(events: CalendarEvent[]): Promise<void> {
    console.log('Starting sync to Google Calendar...');
    
    if (!googleAuthService.isSignedIn()) {
      console.error('User not authenticated for Google Calendar sync');
      throw new Error('User not authenticated');
    }

    if (!this.isInitialized || !this.gapi) {
      console.error('Google Calendar API not initialized');
      throw new Error('Google Calendar API not initialized');
    }

    // Ensure we have the calendar API loaded
    try {
      if (!this.gapi.client.calendar) {
        console.log('Loading Google Calendar API...');
        await this.gapi.client.load('calendar', 'v3');
      }
    } catch (error) {
      console.error('Failed to load Google Calendar API:', error);
      throw new Error('Failed to load Google Calendar API');
    }

    const calendar = this.gapi.client.calendar;
    let syncedCount = 0;
    let errorCount = 0;
    
    for (const event of events) {
      try {
        const googleEvent = this.convertToGoogleEvent(event);
        
        console.log(`Syncing event: ${event.title}`);
        
        // Check if event already exists
        let existingEvents;
        try {
          existingEvents = await calendar.events.list({
            calendarId: 'primary',
            privateExtendedProperty: `localId=${event.id}`,
          });
        } catch (error) {
          console.warn('Could not check for existing events, creating new:', error);
          existingEvents = { result: { items: [] } };
        }

        if (existingEvents.result.items.length > 0) {
          // Update existing event
          console.log(`Updating existing event: ${event.title}`);
          await calendar.events.update({
            calendarId: 'primary',
            eventId: existingEvents.result.items[0].id,
            resource: googleEvent,
          });
        } else {
          // Create new event
          console.log(`Creating new event: ${event.title}`);
          await calendar.events.insert({
            calendarId: 'primary',
            resource: {
              ...googleEvent,
              extendedProperties: {
                private: {
                  localId: event.id,
                },
              },
            },
          });
        }
        syncedCount++;
      } catch (error) {
        console.error(`Error syncing event "${event.title}" to Google Calendar:`, error);
        errorCount++;
      }
    }
    
    console.log(`Sync to Google Calendar completed. Synced: ${syncedCount}, Errors: ${errorCount}`);
  }

  async syncEventsFromGoogle(): Promise<CalendarEvent[]> {
    console.log('Starting sync from Google Calendar...');
    
    if (!googleAuthService.isSignedIn()) {
      console.error('User not authenticated for Google Calendar sync');
      throw new Error('User not authenticated');
    }

    if (!this.isInitialized || !this.gapi) {
      console.error('Google Calendar API not initialized');
      throw new Error('Google Calendar API not initialized');
    }

    try {
      // Ensure we have the calendar API loaded
      if (!this.gapi.client.calendar) {
        console.log('Loading Google Calendar API...');
        await this.gapi.client.load('calendar', 'v3');
      }
      
      const calendar = this.gapi.client.calendar;
      console.log('Fetching events from Google Calendar...');
      
      const response = await calendar.events.list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        maxResults: 250,
        singleEvents: true,
        orderBy: 'startTime',
      });

      const googleEvents: GoogleCalendarEvent[] = response.result.items || [];
      console.log(`Fetched ${googleEvents.length} events from Google Calendar`);
      
      const convertedEvents = googleEvents.map(this.convertFromGoogleEvent);
      console.log(`Converted ${convertedEvents.length} events from Google Calendar`);
      
      return convertedEvents;
    } catch (error) {
      console.error('Error syncing events from Google Calendar:', error);
      throw error;
    }
  }

  async deleteEventFromGoogle(eventId: string): Promise<void> {
    console.log(`Deleting event from Google Calendar: ${eventId}`);
    
    if (!googleAuthService.isSignedIn()) {
      throw new Error('User not authenticated');
    }

    if (!this.isInitialized || !this.gapi) {
      throw new Error('Google Calendar API not initialized');
    }

    try {
      // Ensure we have the calendar API loaded
      if (!this.gapi.client.calendar) {
        await this.gapi.client.load('calendar', 'v3');
      }
      
      const calendar = this.gapi.client.calendar;
      
      // Find the Google Calendar event by local ID
      const existingEvents = await calendar.events.list({
        calendarId: 'primary',
        privateExtendedProperty: `localId=${eventId}`,
      });

      if (existingEvents.result.items.length > 0) {
        console.log(`Found and deleting Google Calendar event: ${existingEvents.result.items[0].summary}`);
        await calendar.events.delete({
          calendarId: 'primary',
          eventId: existingEvents.result.items[0].id,
        });
        console.log('Event deleted successfully from Google Calendar');
      } else {
        console.log('Event not found in Google Calendar');
      }
    } catch (error) {
      console.error('Error deleting event from Google Calendar:', error);
      throw error;
    }
  }

  private convertToGoogleEvent(event: CalendarEvent): any {
    console.log(`Converting local event to Google format: ${event.title}`);
    return {
      summary: event.title,
      description: event.description,
      start: {
        dateTime: event.startDate.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: event.endDate.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      reminders: {
        useDefault: false,
        overrides: event.reminders.map(reminder => ({
          method: 'popup',
          minutes: reminder.minutesBefore,
        })),
      },
      colorId: event.category === 'internal' ? '11' : '1', // Yellow for internal, blue for IEC
    };
  }

  private convertFromGoogleEvent(googleEvent: GoogleCalendarEvent): CalendarEvent {
    console.log(`Converting Google event to local format: ${googleEvent.summary}`);
    
    const startDate = googleEvent.start.dateTime 
      ? new Date(googleEvent.start.dateTime)
      : new Date(googleEvent.start.date + 'T00:00:00');
    
    const endDate = googleEvent.end.dateTime
      ? new Date(googleEvent.end.dateTime)
      : new Date(googleEvent.end.date + 'T23:59:59');

    return {
      id: googleEvent.id,
      title: 'Electoral Activity',
      description: googleEvent.description || '',
      startDate,
      endDate,
      category: 'iec' as const, // Default to IEC, could be enhanced with custom properties
      priority: 'medium',
      color: '#FCD34D',
      reminders: [
        {
          id: crypto.randomUUID(),
          type: '1day',
          minutesBefore: 1440,
          enabled: true,
        },
      ],
      createdAt: new Date(googleEvent.created),
      updatedAt: new Date(googleEvent.updated),
    };
  }
}

export const googleCalendarService = new GoogleCalendarService();