# 🚀 Deployment Guide - Digital Calendar

Complete guide for deploying your Digital Calendar application to various hosting platforms.

## 📋 Pre-Deployment Checklist

- [ ] Google OAuth Client ID configured
- [ ] `.env` file created with your credentials
- [ ] Dependencies installed (`npm install`)
- [ ] Application tested locally (`npm run dev`)
- [ ] Production build tested (`npm run build && npm run preview`)

## 🌐 Deployment Options

### 1. Netlify (Recommended) ⭐

**Why Netlify?**
- ✅ Already configured with `netlify.toml`
- ✅ Automatic deployments
- ✅ Free SSL certificates
- ✅ Global CDN
- ✅ Form handling
- ✅ Serverless functions support

**Steps:**
1. Push your code to GitHub/GitLab
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Connect your repository
5. Build settings are auto-detected from `netlify.toml`
6. Add environment variables in Netlify dashboard:
   - `VITE_GOOGLE_CLIENT_ID` = your Google Client ID
7. Deploy!

**Custom Domain:**
- Go to Domain settings in Netlify
- Add your custom domain
- Update Google OAuth authorized origins

### 2. Vercel 🔺

**Steps:**
```bash
npm install -g vercel
vercel login
vercel
```

**Environment Variables:**
```bash
vercel env add VITE_GOOGLE_CLIENT_ID
```

### 3. Firebase Hosting 🔥

**Setup:**
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
```

**Configuration:**
- Public directory: `dist`
- Single-page app: `Yes`
- Automatic builds: `No`

**Deploy:**
```bash
npm run firebase:deploy
```

### 4. GitHub Pages 📄

**Using GitHub Actions:**
1. Push code to GitHub
2. Enable GitHub Pages in repository settings
3. Select "GitHub Actions" as source
4. The included `.github/workflows/deploy.yml` will handle deployment

**Manual Setup:**
```bash
npm install -g gh-pages
npm run build
npx gh-pages -d dist
```

### 5. Railway 🚂

1. Go to [railway.app](https://railway.app)
2. Connect GitHub repository
3. Add environment variables
4. Deploy automatically

### 6. Surge.sh ⚡

```bash
npm install -g surge
npm run build
cd dist
surge
```

## 🔐 Environment Variables Setup

For all platforms, you need to set:

```env
VITE_GOOGLE_CLIENT_ID=your-google-client-id-here
```

### Getting Google Client ID:

1. Go to [Google Cloud Console](https://console.developers.google.com/)
2. Create/select project
3. Enable APIs:
   - Google Calendar API
   - Google+ API (for user info)
4. Create OAuth 2.0 Client ID
5. Add authorized origins:
   - `http://localhost:5173` (development)
   - `https://your-domain.com` (production)

## 🌍 Domain Configuration

After deployment, update Google OAuth settings:

1. Go to Google Cloud Console
2. Navigate to Credentials
3. Edit your OAuth 2.0 Client ID
4. Add your new domain to "Authorized JavaScript origins":
   - `https://your-app.netlify.app`
   - `https://your-custom-domain.com`

## 📊 Performance Optimization

### Build Optimization
```bash
# Analyze bundle size
npm run build -- --analyze

# Preview production build
npm run preview
```

### Lighthouse Scores Target:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 90+

## 🔍 Troubleshooting

### Common Issues:

**Build Fails:**
- Check all imports are correct
- Ensure all dependencies are installed
- Verify TypeScript types

**OAuth Errors:**
- Verify Client ID is correct
- Check authorized origins include your domain
- Ensure APIs are enabled in Google Cloud

**Blank Page:**
- Check browser console for errors
- Verify environment variables are set
- Test with demo mode (invalid Client ID)

**Sync Issues:**
- Check network connectivity
- Verify Google Calendar API is enabled
- Check user permissions

## 📱 PWA Configuration

To make your app installable:

1. Add `manifest.json`:
```json
{
  "name": "Digital Calendar",
  "short_name": "Calendar",
  "description": "Electoral Activities Calendar",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#FCD34D",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

2. Add service worker for offline functionality

## 🚀 Production Checklist

Before going live:

- [ ] Test on multiple devices
- [ ] Verify Google OAuth works
- [ ] Test calendar sync functionality
- [ ] Check responsive design
- [ ] Verify all links work
- [ ] Test offline functionality
- [ ] Check loading performance
- [ ] Verify SSL certificate
- [ ] Test cross-browser compatibility
- [ ] Set up monitoring/analytics

## 📈 Monitoring

Recommended tools:
- **Google Analytics** for usage tracking
- **Sentry** for error monitoring
- **Lighthouse CI** for performance monitoring
- **Uptime Robot** for availability monitoring

## 🔄 Continuous Deployment

Set up automatic deployments:

1. **Netlify**: Automatic on git push
2. **Vercel**: Automatic on git push
3. **GitHub Actions**: On push to main branch
4. **Firebase**: Manual or CI/CD pipeline

Your Digital Calendar is now ready for production! 🎉

## 📞 Support

If you encounter issues:
1. Check the browser console for errors
2. Verify environment variables
3. Test Google OAuth setup
4. Check network connectivity
5. Review deployment logs

Happy deploying! 🚀