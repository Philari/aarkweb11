# Digital Calendar - Electoral Activities Web App

A premium digital calendar application for managing electoral activities with Google Calendar integration.

## 🚀 Features

- **Google Calendar Sync**: Bi-directional sync with Google Calendar
- **Electoral Timeline**: Pre-loaded with Uganda 2025-2026 electoral activities
- **Cross-Device Access**: Sign in from any device with the same Google account
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Real-time Sync**: Automatic syncing when signing in
- **Event Management**: Create, edit, and delete events with reminders
- **Multiple Views**: Month, Week, and Day calendar views
- **Search & Filter**: Find events quickly with search and category filters

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Authentication**: Google OAuth 2.0
- **Calendar API**: Google Calendar API
- **Hosting**: Netlify (configured)

## 📦 Installation

1. **Clone or extract** this package to your local machine
2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Google OAuth** (see Google OAuth Setup section below)

4. **Start development server**:
   ```bash
   npm run dev
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```

## 🔐 Google OAuth Setup

1. Go to [Google Cloud Console](https://console.developers.google.com/)
2. Create a new project or select existing one
3. Enable **Google Calendar API** and **Google+ API**
4. Create **OAuth 2.0 Client ID** credentials
5. Add authorized origins:
   - For local development: `http://localhost:5173`
   - For production: `https://your-domain.com`
6. Copy the Client ID
7. Create `.env` file in root directory:
   ```
   VITE_GOOGLE_CLIENT_ID=your-google-client-id-here
   ```

## 🚀 Deployment Options

### Netlify (Recommended)
- Already configured with `netlify.toml`
- Simply connect your GitHub repo to Netlify
- Automatic deployments on push

### Vercel
```bash
npm install -g vercel
vercel
```

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

### GitHub Pages
- Use the included `.github/workflows/deploy.yml`
- Enable GitHub Pages in repository settings

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── calendar/        # Calendar-specific components
│   ├── EventCard.tsx    # Event display component
│   ├── EventForm.tsx    # Event creation/editing form
│   ├── EventModal.tsx   # Event details modal
│   ├── Header.tsx       # Main header with navigation
│   ├── LoginScreen.tsx  # Authentication screen
│   └── ...
├── hooks/               # Custom React hooks
│   ├── useAuth.ts       # Authentication logic
│   └── useCalendar.ts   # Calendar state management
├── services/            # External service integrations
│   ├── googleAuth.ts    # Google OAuth service
│   └── googleCalendar.ts # Google Calendar API
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
└── App.tsx             # Main application component
```

## 🎯 Key Features Explained

### Electoral Activities
- Pre-loaded with 33 electoral activities for Uganda 2025-2026
- Covers field demarcation, nominations, campaigns, and polling
- Categorized as IEC (Independent Electoral Commission) or Internal events

### Google Calendar Integration
- **Auto-sync on sign-in**: Events sync automatically when user logs in
- **Bi-directional sync**: Changes sync both ways between app and Google Calendar
- **Cross-device access**: Same events on all devices with same Google account

### Responsive Design
- **Mobile-first approach** with touch-friendly interactions
- **Tablet optimization** with appropriate layouts
- **Desktop experience** with full feature set
- **Progressive Web App** capabilities

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run serve` - Serve built files

## 🌐 Environment Variables

Create a `.env` file with:

```env
# Google OAuth Configuration
VITE_GOOGLE_CLIENT_ID=your-google-client-id-here
```

## 📱 PWA Features

- **Responsive design** for all screen sizes
- **Touch-optimized** interactions
- **Fast loading** with Vite optimization
- **Offline-ready** architecture

## 🔒 Security Features

- **Google OAuth 2.0** secure authentication
- **Token-based** API access
- **Local storage** for user preferences
- **HTTPS-only** in production

## 🎨 Customization

### Colors
- Primary: Yellow (#FCD34D)
- Secondary: Blue, Purple for categories
- Priority colors: Green (low), Yellow (medium), Red (high)

### Fonts
- System fonts for optimal performance
- Responsive typography scaling

## 📞 Support

For issues or questions:
1. Check the console for error messages
2. Verify Google OAuth setup
3. Ensure all dependencies are installed
4. Check network connectivity for Google Calendar sync

## 📄 License

This project is provided as-is for educational and personal use.

## 🎉 Deployment Ready

This package is ready for deployment to:
- ✅ Netlify (configured)
- ✅ Vercel
- ✅ Firebase Hosting
- ✅ GitHub Pages
- ✅ Any static hosting service

Your Digital Calendar app is production-ready! 🚀