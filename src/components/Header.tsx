import React from 'react';
import { Calendar, Search, Plus, Filter } from 'lucide-react';
import { ViewMode } from '../types/calendar';
import { UserProfile } from './UserProfile';
import { SyncStatus } from './SyncStatus';
import { User } from '../types/auth';

interface HeaderProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterCategory: 'all' | 'personal' | 'work';
  setFilterCategory: (category: 'all' | 'personal' | 'work') => void;
  onAddEvent: () => void;
  user?: User;
  onSignOut?: () => void;
  onSync?: () => Promise<void>;
  lastSyncTime?: Date;
}

export const Header: React.FC<HeaderProps> = ({
  viewMode,
  setViewMode,
  searchQuery,
  setSearchQuery,
  filterCategory,
  setFilterCategory,
  onAddEvent,
  user,
  onSignOut,
  onSync,
  lastSyncTime
}) => {
  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="bg-yellow-400 p-2 rounded-lg">
              <Calendar className="h-6 w-6 text-yellow-900" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Digital Calendar</h1>
          </div>

          {/* View Mode Toggles */}
          <div className="hidden md:flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
            {(['day', 'week', 'month'] as ViewMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  viewMode === mode
                    ? 'bg-yellow-400 text-yellow-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            {user && onSync && (
              <SyncStatus onSync={onSync} lastSyncTime={lastSyncTime} />
            )}
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 w-64"
              />
            </div>

            <div className="relative">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value as 'all' | 'personal' | 'work')}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
              >
                <option value="all">All Categories</option>
                <option value="personal">Personal</option>
                <option value="work">Work</option>
              </select>
              <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            <button
              onClick={onAddEvent}
              className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 shadow-sm hover:shadow-md"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Event</span>
            </button>
            
            {user && onSignOut && (
              <UserProfile user={user} onSignOut={onSignOut} />
            )}
          </div>
        </div>

        {/* Mobile View Mode Toggles */}
        <div className="md:hidden pb-4">
          <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
            {(['day', 'week', 'month'] as ViewMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`flex-1 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  viewMode === mode
                    ? 'bg-yellow-400 text-yellow-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};