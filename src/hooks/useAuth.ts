import { useState, useEffect, useCallback } from 'react';
import { AuthState, User } from '../types/auth';
import { googleAuthService } from '../services/googleAuth';

const STORAGE_KEY = 'auth-user';

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  // Initialize Google Auth and load user from localStorage on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Initialize Google Auth service first
        await googleAuthService.initialize();
        console.log('Google Auth service initialized successfully');
      } catch (error) {
        console.error('Failed to initialize Google Auth:', error);
        setState(prev => ({ 
          ...prev, 
          isLoading: false, 
          error: 'Failed to initialize authentication. Please refresh the page.' 
        }));
        return;
      }

      // Then load saved user
      const savedUser = localStorage.getItem(STORAGE_KEY);
      if (savedUser) {
        try {
          const user = JSON.parse(savedUser);
          setState(prev => ({
            ...prev,
            user,
            isAuthenticated: true,
            isLoading: false,
          }));
          console.log('Loaded saved user:', user.email);
        } catch (error) {
          console.error('Error loading saved user:', error);
          localStorage.removeItem(STORAGE_KEY);
          setState(prev => ({ ...prev, isLoading: false }));
        }
      } else {
        setState(prev => ({ ...prev, isLoading: false }));
      }
    };

    initializeAuth();
  }, []);

  const signIn = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    console.log('Starting sign in process...');
    
    try {
      const user = await googleAuthService.signIn();
      console.log('Sign in successful:', user);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error('Sign in error:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Authentication temporarily unavailable. Please try again.',
      }));
    }
  }, []);

  const signOut = useCallback(() => {
    googleAuthService.signOut();
    localStorage.removeItem(STORAGE_KEY);
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    signIn,
    signOut,
  };
};