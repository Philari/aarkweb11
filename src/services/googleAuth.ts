import { User } from '../types/auth';

declare global {
  interface Window {
    google: any;
    gapi: any;
  }
}

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/gmail.readonly';

// Current redirect URIs that need to be configured in Google Cloud Console:
// For local development: http://localhost:5173
// For production: https://aarkweb.netlify.app

class GoogleAuthService {
  private gapi: any = null;
  private tokenClient: any = null;
  private isInitialized = false;
  private initPromise: Promise<void> | null = null;
  private signInPromise: { resolve: (user: User) => void; reject: (error: Error) => void } | null = null;

  async initialize(): Promise<void> {
    if (this.isInitialized) return Promise.resolve();
    if (this.initPromise) return this.initPromise;
    
    if (!GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID === 'your-google-client-id-here') {
      console.warn('Google Client ID not configured. Using demo mode.');
      // For demo purposes, we'll simulate authentication
      this.isInitialized = true;
      return Promise.resolve();
    }

    this.initPromise = new Promise((resolve, reject) => {
      const script1 = document.createElement('script');
      script1.src = 'https://apis.google.com/js/api.js';
      script1.onload = () => {
        const script2 = document.createElement('script');
        script2.src = 'https://accounts.google.com/gsi/client';
        script2.onload = async () => {
          try {
            await this.initializeGapi();
            this.initializeGsi();
            this.isInitialized = true;
            resolve();
          } catch (error) {
            reject(error);
          }
        };
        script2.onerror = reject;
        document.head.appendChild(script2);
      };
      script1.onerror = reject;
      document.head.appendChild(script1);
    });
    return this.initPromise;
  }

  private async initializeGapi(): Promise<void> {
    this.gapi = window.gapi;
    await new Promise<void>((resolve) => {
      this.gapi.load('client', resolve);
    });
    
    await this.gapi.client.init({
      apiKey: '', // We don't need an API key for OAuth flow
      discoveryDocs: [DISCOVERY_DOC],
    });
    
    // Load the calendar API
    try {
      await this.gapi.client.load('calendar', 'v3');
      console.log('Google Calendar API loaded successfully');
    } catch (error) {
      console.warn('Could not pre-load Calendar API, will load on demand:', error);
    }
  }

  private initializeGsi(): void {
    const callback = async (response: any) => {
      console.log('GSI callback received:', response);
      
      if (!this.signInPromise) return;
        console.warn('No sign in promise found, ignoring callback');
      
      if (response.error) {
        console.error('GSI callback error:', response.error);
        this.signInPromise.reject(new Error(response.error));
        this.signInPromise = null;
        return;
      }

      try {
        console.log('Setting access token...');
        // Set the access token
        this.gapi.client.setToken({ access_token: response.access_token });

        console.log('Fetching user info...');
        // Get user info
        const userInfoResponse = await fetch(
          `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${response.access_token}`
        );
        
        if (!userInfoResponse.ok) {
          throw new Error(`Failed to fetch user info: ${userInfoResponse.status}`);
        }
        
        const userInfo = await userInfoResponse.json();
        console.log('User info received:', userInfo);

        const user: User = {
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.name,
          picture: userInfo.picture,
          accessToken: response.access_token,
          refreshToken: response.refresh_token,
        };

        console.log('Resolving sign in promise with user:', user);
        this.signInPromise.resolve(user);
        this.signInPromise = null;
      } catch (error) {
        console.error('Error in GSI callback:', error);
        this.signInPromise.reject(error as Error);
        this.signInPromise = null;
      }
    };

    this.tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_CLIENT_ID,
      scope: SCOPES,
      callback: callback,
    });
  }

  async signIn(): Promise<User> {
    if (!this.isInitialized) {
      console.log('Google Auth service not initialized, initializing now...');
      try {
        await this.initialize();
      } catch (error) {
        console.error('Failed to initialize Google Auth service:', error);
        throw new Error('Google Auth service not initialized. Please wait for the app to load completely.');
      }
    }

    // Demo mode - simulate successful login
    if (!GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID === 'your-google-client-id-here') {
      console.log('Demo mode: Simulating successful login');
      return {
        id: 'demo-user-123',
        email: 'demo@example.com',
        name: 'Demo User',
        picture: 'https://via.placeholder.com/150/4F46E5/FFFFFF?text=DU',
        accessToken: 'demo-access-token',
      };
    }

    console.log('Creating sign in promise...');
    return new Promise((resolve, reject) => {
      this.signInPromise = { resolve, reject };
      
      // Add timeout to prevent hanging
      setTimeout(() => {
        if (this.signInPromise) {
          this.signInPromise.reject(new Error('Sign in timeout'));
          this.signInPromise = null;
        }
      }, 30000); // 30 second timeout
      
      console.log('Requesting access token...');
      try {
        this.tokenClient.requestAccessToken({ prompt: 'consent' });
      } catch (error) {
        console.error('Error requesting access token:', error);
        this.signInPromise.reject(error as Error);
        this.signInPromise = null;
      }
    });
  }

  signOut(): void {
    try {
      if (this.gapi?.client?.getToken()) {
        const token = this.gapi.client.getToken();
        if (token?.access_token && window.google?.accounts?.oauth2) {
          window.google.accounts.oauth2.revoke(token.access_token);
        }
        this.gapi.client.setToken('');
      }
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  }

  isSignedIn(): boolean {
    try {
      return this.gapi?.client?.getToken() != null;
    } catch (error) {
      console.error('Error checking sign in status:', error);
      return false;
    }
  }

  getAccessToken(): string | null {
    try {
      const token = this.gapi?.client?.getToken();
      return token?.access_token || null;
    } catch (error) {
      console.error('Error getting access token:', error);
      return null;
    }
  }
}

export const googleAuthService = new GoogleAuthService();