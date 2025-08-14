import React from 'react';
import { Calendar, Mail, FolderSync as Sync } from 'lucide-react';

interface LoginScreenProps {
  onSignIn: () => void;
  isLoading: boolean;
  error: string | null;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onSignIn,
  isLoading,
  error
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="bg-yellow-400 p-4 rounded-2xl inline-block mb-4 shadow-lg">
            <Calendar className="h-12 w-12 text-yellow-900" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Digital Calendar</h1>
          <p className="text-gray-600">Your premium calendar and diary application</p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <Sync className="h-6 w-6 text-yellow-600 mb-2" />
            <h3 className="font-semibold text-gray-900 text-sm">Google Sync</h3>
            <p className="text-xs text-gray-600">Sync with Google Calendar</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <Calendar className="h-6 w-6 text-blue-600 mb-2" />
            <h3 className="font-semibold text-gray-900 text-sm">Event Management</h3>
            <p className="text-xs text-gray-600">Organize your schedule</p>
          </div>
        </div>

        {/* Sign In Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600 text-sm">
              Sign in with your Google account to access your calendar and sync across all devices
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <button
            onClick={onSignIn}
            disabled={isLoading}
            className="w-full bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-700"></div>
            ) : (
              <>
                <Mail className="h-5 w-5" />
                <span>Continue with Google</span>
              </>
            )}
          </button>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              By signing in, you agree to sync your calendar data with Google Calendar.
              {error && (
                <span className="block mt-2 text-yellow-600">
                  Demo mode available - click "Continue with Google" to proceed.
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-500">
            Secure authentication powered by Google OAuth 2.0
          </p>
        </div>
      </div>
    </div>
  );
};