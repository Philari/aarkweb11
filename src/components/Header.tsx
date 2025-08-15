import React, { useState } from 'react';
import { User, LogOut, Settings, Calendar } from 'lucide-react';
import { User as UserType } from '../types/auth';

interface UserProfileProps {
  user: UserType;
  onSignOut: () => void;
}

export const Header: React.FC<UserProfileProps> = ({
  user,
  onSignOut
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
      >
        <img
          src={user.picture}
          alt={user.name}
          className="h-8 w-8 rounded-full border-2 border-yellow-400"
        />
        <div className="hidden md:block text-left">
          <p className="text-sm font-medium text-gray-900">{user.name}</p>
          <p className="text-xs text-gray-600">{user.email}</p>
        </div>
      </button>

      {isDropdownOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsDropdownOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 z-20">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <img
                  src={user.picture}
                  alt={user.name}
                  className="h-12 w-12 rounded-full border-2 border-yellow-400"
                />
                <div>
                  <p className="font-semibold text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </div>
            </div>

            <div className="p-2">
              <button className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200">
                <User className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-700">Profile Settings</span>
              </button>
              
              <button className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200">
                <Calendar className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-700">Calendar Settings</span>
              </button>
              
              <button className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200">
                <Settings className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-700">Preferences</span>
              </button>
              
              <hr className="my-2" />
              
              <button
                onClick={onSignOut}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-red-50 rounded-lg transition-colors duration-200 text-red-600"
              >
                <LogOut className="h-4 w-4" />
                <span className="text-sm">Sign Out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};