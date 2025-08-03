import { CalendarEvent } from '../types/calendar';
import { GoogleCalendarEvent } from '../types/auth';
import { googleAuthService } from './googleAuth';

class GoogleCalendarService {
  private gapi: any = null;

  constructor() {
    this.gapi = window.gapi;
  }

  async syncEventsToGoogle(events: CalendarEvent[]): Promise<void> {
    if (!googleAuthService.isSignedIn()) {
      throw new Error('User not authenticated');
    }

    const calendar = this.gapi.client.calendar;
    
    for (const event of events) {
      try {
        const googleEvent = this.convertToGoogleEvent(event);
        
        // Check if event already exists (by checking for a custom property)
        const existingEvents = await calendar.events.list({
          calendarId: 'primary',
          privateExtendedProperty: `localId=${event.id}`,
        });

        if (existingEvents.result.items.length > 0) {
          // Update existing event
          await calendar.events.update({
            calendarId: 'primary',
            eventId: existingEvents.result.items[0].id,
            resource: googleEvent,
          });
        } else {
          // Create new event
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
      } catch (error) {
        console.error('Error syncing event to Google Calendar:', error);
      }
    }
  }

  async syncEventsFromGoogle(): Promise<CalendarEvent[]> {
    if (!googleAuthService.isSignedIn()) {
      throw new Error('User not authenticated');
    }

    try {
      const calendar = this.gapi.client.calendar;
      const response = await calendar.events.list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        maxResults: 250,
        singleEvents: true,
        orderBy: 'startTime',
      });

      const googleEvents: GoogleCalendarEvent[] = response.result.items || [];
      return googleEvents.map(this.convertFromGoogleEvent);
    } catch (error) {
      console.error('Error syncing events from Google Calendar:', error);
      return [];
    }
  }

  async deleteEventFromGoogle(eventId: string): Promise<void> {
    if (!googleAuthService.isSignedIn()) {
      throw new Error('User not authenticated');
    }

    try {
      const calendar = this.gapi.client.calendar;
      
      // Find the Google Calendar event by local ID
      const existingEvents = await calendar.events.list({
        calendarId: 'primary',
        privateExtendedProperty: `localId=${eventId}`,
      });

      if (existingEvents.result.items.length > 0) {
        await calendar.events.delete({
          calendarId: 'primary',
          eventId: existingEvents.result.items[0].id,
        });
      }
    } catch (error) {
      console.error('Error deleting event from Google Calendar:', error);
    }
  }

  private convertToGoogleEvent(event: CalendarEvent): any {
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
      colorId: event.category === 'work' ? '11' : '1', // Yellow for work, blue for personal
    };
  }

  private convertFromGoogleEvent(googleEvent: GoogleCalendarEvent): CalendarEvent {
    const startDate = googleEvent.start.dateTime 
      ? new Date(googleEvent.start.dateTime)
      : new Date(googleEvent.start.date + 'T00:00:00');
    
    const endDate = googleEvent.end.dateTime
      ? new Date(googleEvent.end.dateTime)
      : new Date(googleEvent.end.date + 'T23:59:59');

    return {
      id: googleEvent.id,
      title: googleEvent.summary || 'Untitled Event',
      description: googleEvent.description || '',
      startDate,
      endDate,
      category: 'personal', // Default to personal, could be enhanced with custom properties
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