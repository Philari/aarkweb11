import React from 'react';
import { CalendarEvent } from '../types/calendar';
import { EventCard } from './EventCard';
import { EventModal } from './EventModal';
import { Calendar, Filter } from 'lucide-react';

interface EventsSidebarProps {
  events: CalendarEvent[];
  searchQuery: string;
  filterCategory: 'all' | 'iec' | 'internal';
  onEventEdit: (event: CalendarEvent) => void;
  onEventDelete: (eventId: string) => void;
  onEventClick: (event: CalendarEvent) => void;
}

export const EventsSidebar: React.FC<EventsSidebarProps> = ({
  events,
  searchQuery,
  filterCategory,
  onEventEdit,
  onEventDelete,
  onEventClick
}) => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredEvents = events.filter(event => {
    const matchesSearch = searchQuery === '' || 
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || event.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  const upcomingEvents = filteredEvents
    .filter(event => event.startDate >= new Date())
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
    .slice(0, 10);

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
    onEventClick(event);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <>
      <div className="w-80 bg-gray-50 border-l border-gray-200 h-full overflow-y-auto">
      <div className="p-6 border-b border-gray-200 bg-white">
        <div className="flex items-center space-x-2 mb-4">
          <Calendar className="h-5 w-5 text-yellow-600" />
          <h2 className="font-semibold text-gray-900">Upcoming Events</h2>
        </div>
        
        {searchQuery && (
          <div className="text-sm text-gray-600 mb-2">
            Search: "{searchQuery}"
          </div>
        )}
        
        {filterCategory !== 'all' && (
          <div className="text-sm text-gray-600 mb-2">
            Filter: {filterCategory}
          </div>
        )}
        
        <div className="text-sm text-gray-500">
          {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} found
        </div>
      </div>

      <div className="p-6">
        {upcomingEvents.length === 0 ? (
          <div className="text-center py-8">
            <Filter className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-sm">
              {searchQuery || filterCategory !== 'all'
                ? 'No events match your search criteria'
                : 'No upcoming events'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingEvents.map(event => (
              <EventCard
                key={event.id}
                event={event}
                onEdit={onEventEdit}
                onDelete={onEventDelete}
                onClick={handleEventClick}
              />
            ))}
          </div>
        )}
      </div>
      </div>

      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          isOpen={isModalOpen}
          onClose={closeModal}
          onEdit={onEventEdit}
          onDelete={onEventDelete}
        />
      )}
    </>
  );
};