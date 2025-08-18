import React, { useState } from 'react';
import { 
  Calendar, 
  Plus, 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  CalendarDays,
  User, 
  LogOut, 
  Settings,
  Share2,
  Copy,
  Check
} from 'lucide-react';
import { User as UserType } from '../types/auth';
import { ViewMode } from '../types/calendar';
import { SyncStatus } from './SyncStatus';
import { UserProfile } from './UserProfile';

interface HeaderProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterCategory: 'all' | 'iec' | 'internal';
  setFilterCategory: (category: 'all' | 'iec' | 'internal') => void;
  onAddEvent: () => void;
  user: UserType;
  onSignOut: () => void;
  onSync: () => Promise<void>;
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
  const [showShareModal, setShowShareModal] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const currentUrl = window.location.origin;

  const handleShareLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = currentUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    }
  };

  const viewModeIcons = {
    month: Grid3X3,
    week: List,
    day: CalendarDays
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="bg-yellow-400 p-1.5 sm:p-2 rounded-lg">
              <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-900" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">Digital Calendar</h1>
              <p className="text-xs text-gray-600">Electoral Activities</p>
            </div>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-4 lg:mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* View Mode Toggle */}
            <div className="hidden sm:flex bg-gray-100 rounded-lg p-1">
              {(['month', 'week', 'day'] as ViewMode[]).map((mode) => {
                const Icon = viewModeIcons[mode];
                return (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`p-1.5 sm:p-2 rounded-md transition-all duration-200 ${
                      viewMode === mode
                        ? 'bg-white shadow-sm text-yellow-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    title={`${mode.charAt(0).toUpperCase() + mode.slice(1)} view`}
                  >
                    <Icon className="h-4 w-4" />
                  </button>
                );
              })}
            </div>

            {/* Filter */}
            <div className="hidden lg:block">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value as 'all' | 'iec' | 'internal')}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm"
              >
                <option value="all">All Events</option>
                <option value="iec">IEC Events</option>
                <option value="internal">Internal Events</option>
              </select>
            </div>

            {/* Add Event Button */}
            <button
              onClick={onAddEvent}
              className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md flex items-center space-x-1 sm:space-x-2 text-sm touch-manipulation"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Event</span>
            </button>

            {/* Share Button */}
            <button
              onClick={() => setShowShareModal(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 text-gray-600 hover:text-gray-900 touch-manipulation"
              title="Share calendar link"
            >
              <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            {/* Sync Status */}
            <SyncStatus onSync={onSync} lastSyncTime={lastSyncTime} />

            {/* User Profile */}
            <UserProfile user={user} onSignOut={onSignOut} />
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden mt-3 pt-3 border-t border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm"
            />
          </div>

          {/* Mobile View Mode and Filter */}
          <div className="flex items-center justify-between mt-3 space-x-3">
            <div className="flex bg-gray-100 rounded-lg p-1 flex-1">
              {(['month', 'week', 'day'] as ViewMode[]).map((mode) => {
                const Icon = viewModeIcons[mode];
                return (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`flex-1 p-2 rounded-md transition-all duration-200 flex items-center justify-center ${
                      viewMode === mode
                        ? 'bg-white shadow-sm text-yellow-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </button>
                );
              })}
            </div>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value as 'all' | 'iec' | 'internal')}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm min-w-0 flex-shrink-0"
            >
              <option value="all">All</option>
              <option value="iec">IEC</option>
              <option value="internal">Internal</option>
            </select>
          </div>
        </div>
      </header>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Share Calendar</h3>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <span className="sr-only">Close</span>
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-3">
                    Share this link to access your calendar from any device:
                  </p>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={currentUrl}
                      readOnly
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
                    />
                    <button
                      onClick={handleShareLink}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                        linkCopied
                          ? 'bg-green-100 text-green-800 border border-green-200'
                          : 'bg-yellow-400 hover:bg-yellow-500 text-yellow-900'
                      }`}
                    >
                      {linkCopied ? (
                        <>
                          <Check className="h-4 w-4" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Cross-Device Access</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Sign in with the same Google account on any device</li>
                    <li>• Your events will automatically sync across all devices</li>
                    <li>• Access from phone, tablet, or computer</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowShareModal(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};