# Deployment Instructions

## Digital Calendar/Diary Application

This application is ready for deployment to various hosting platforms.

### Build Commands
```bash
npm install
npm run build
```

### Output Directory
- **Build folder**: `dist/`
- **Entry point**: `dist/index.html`

## Deployment Options

### 1. Vercel Deployment
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Vercel will auto-detect React/Vite settings
5. Deploy automatically

### 2. GitHub Pages
1. Push code to GitHub repository
2. Go to repository Settings > Pages
3. Select "GitHub Actions" as source
4. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### 3. Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
# Select dist as public directory
# Configure as single-page app: Yes
# Set up automatic builds: No
npm run build
firebase deploy
```

### 4. Surge.sh
```bash
npm install -g surge
npm run build
cd dist
surge
# Follow prompts to set domain
```

### 5. Railway
1. Go to [railway.app](https://railway.app)
2. Connect GitHub repository
3. Railway auto-detects Node.js
4. Set build command: `npm run build`
5. Set start command: `npx serve dist -s`

## Environment Variables

For Google Calendar integration, set:
```
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

## Domain Configuration

Update Google OAuth settings with your new domain:
1. Go to [Google Cloud Console](https://console.developers.google.com/)
2. Select your project
3. Go to Credentials > OAuth 2.0 Client IDs
4. Add your new domain to "Authorized JavaScript origins"

## Features Included
- ✅ Google Calendar Sync
- ✅ Gmail Integration
- ✅ Electoral Activities Calendar
- ✅ Event Management
- ✅ Responsive Design
- ✅ PWA Ready