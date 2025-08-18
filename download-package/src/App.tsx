import React from 'react';
import { useEffect } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { Header } from './components/Header';
import { CalendarView } from './components/calendar/CalendarView';
import { EventsSidebar } from './components/EventsSidebar';
import { EventForm } from './components/EventForm';
import { useCalendar } from './hooks/useCalendar';
import { useAuth } from './hooks/useAuth';

function App() {
  const { user, isAuthenticated, isLoading, signIn, signOut } = useAuth();
  
  console.log('App render - isLoading:', isLoading, 'isAuthenticated:', isAuthenticated, 'user:', user?.email);
  
  const {
    events,
    selectedDate,
    viewMode,
    searchQuery,
    filterCategory,
    isEventFormOpen,
    editingEvent,
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
    syncWithGoogle,
    autoSyncOnSignIn
  } = useCalendar();

  // Auto-sync when user signs in
  useEffect(() => {
    if (isAuthenticated && user) {
      console.log('User authenticated, triggering auto-sync...');
      autoSyncOnSignIn();
    }
  }, [isAuthenticated, user, autoSyncOnSignIn]);

  const handleSignIn = async () => {
    try {
      await signIn();
      console.log('Sign in completed, auto-sync will be triggered by useEffect');
    } catch (error) {
      console.error('Sign in failed:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginScreen onSignIn={handleSignIn} isLoading={isLoading} error={null} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header
        viewMode={viewMode}
        setViewMode={setViewMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        onAddEvent={() => openEventForm()}
        user={user}
        onSignOut={signOut}
        onSync={syncWithGoogle}
        lastSyncTime={lastSyncTime}
      />

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col">
          <CalendarView
            viewMode={viewMode}
            selectedDate={selectedDate}
            events={events}
            onDateSelect={setSelectedDate}
            onEventEdit={openEventForm}
            onEventDelete={deleteEvent}
            onEventClick={selectEvent}
          />
        </div>

        <div className="hidden xl:block">
          <EventsSidebar
            events={events}
            searchQuery={searchQuery}
            filterCategory={filterCategory}
            onEventEdit={openEventForm}
            onEventDelete={deleteEvent}
            onEventClick={selectEvent}
          />
        </div>
      </div>

      <EventForm
        isOpen={isEventFormOpen}
        onClose={closeEventForm}
        onSave={addEvent}
        onUpdate={updateEvent}
        editingEvent={editingEvent}
        selectedDate={selectedDate}
      />
    </div>
  );
}

export default App;