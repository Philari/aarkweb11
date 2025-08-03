import { User } from '../types/auth';

declare global {
  interface Window {
    google: any;
    gapi: any;
  }
}

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email';

class GoogleAuthService {
  private gapi: any = null;
  private tokenClient: any = null;
  private isInitialized = false;

  async initialize(): Promise<void> {
    if (this.isInitialized) return;
    
    if (!GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID === 'your-google-client-id') {
      throw new Error('Google Client ID not configured. Please set VITE_GOOGLE_CLIENT_ID in your .env file.');
    }

    return new Promise((resolve, reject) => {
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
  }

  private async initializeGapi(): Promise<void> {
    this.gapi = window.gapi;
    await new Promise<void>((resolve) => {
      this.gapi.load('client', resolve);
    });
    
    await this.gapi.client.init({
      discoveryDocs: [DISCOVERY_DOC],
    });
  }

  private initializeGsi(): void {
    this.tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_CLIENT_ID,
      scope: SCOPES,
      callback: '', // Will be set during sign-in
    });
  }

  async signIn(): Promise<User> {
    if (!this.isInitialized) {
      throw new Error('Google Auth service not initialized. Please wait for the app to load completely.');
    }

    return new Promise((resolve, reject) => {
      const callback = async (response: any) => {
        if (response.error) {
          reject(new Error(response.error));
          return;
        }

        try {
          // Set the access token
          this.gapi.client.setToken({ access_token: response.access_token });

          // Get user info
          const userInfoResponse = await fetch(
            `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${response.access_token}`
          );
          const userInfo = await userInfoResponse.json();

          const user: User = {
            id: userInfo.id,
            email: userInfo.email,
            name: userInfo.name,
            picture: userInfo.picture,
            accessToken: response.access_token,
            refreshToken: response.refresh_token,
          };

          resolve(user);
        } catch (error) {
          reject(error);
        }
      };

      this.tokenClient.callback = callback;
      this.tokenClient.requestAccessToken({ prompt: 'consent' });
    });
  }

  signOut(): void {
    if (this.gapi?.client?.getToken()) {
      window.google.accounts.oauth2.revoke(this.gapi.client.getToken().access_token);
      this.gapi.client.setToken('');
    }
  }

  isSignedIn(): boolean {
    return this.gapi?.client?.getToken() != null;
  }

  getAccessToken(): string | null {
    const token = this.gapi?.client?.getToken();
    return token?.access_token || null;
  }
}

export const googleAuthService = new GoogleAuthService();