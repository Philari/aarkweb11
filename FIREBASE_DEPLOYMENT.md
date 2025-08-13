# Firebase Hosting Deployment Guide

## 🔥 Deploy Your Digital Calendar to Firebase

Your application is now configured for Firebase Hosting! Follow these steps to deploy:

### **Prerequisites**
1. **Node.js** installed on your computer
2. **Firebase CLI** installed globally
3. **Google account** for Firebase Console

---

## **Step 1: Install Firebase CLI**

```bash
npm install -g firebase-tools
```

## **Step 2: Login to Firebase**

```bash
firebase login
```
- This will open your browser to sign in with Google
- Use the same Google account you want to use for hosting

## **Step 3: Create Firebase Project**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"**
3. Enter project name: `digital-calendar-app` (or your preferred name)
4. Enable Google Analytics (optional)
5. Click **"Create project"**

## **Step 4: Initialize Firebase in Your Project**

```bash
firebase init hosting
```

**Configuration Options:**
- **Select project**: Choose the project you just created
- **Public directory**: `dist` (already configured)
- **Single-page app**: `Yes`
- **Automatic builds**: `No` (we'll build manually)
- **Overwrite files**: `No` (keep existing configuration)

## **Step 5: Build and Deploy**

```bash
# Build the application
npm run build

# Deploy to Firebase
firebase deploy
```

**Or use the combined command:**
```bash
npm run firebase:deploy
```

---

## **🚀 Your App is Live!**

After deployment, Firebase will provide:
- **Hosting URL**: `https://your-project-id.web.app`
- **Custom domain**: `https://your-project-id.firebaseapp.com`

---

## **⚙️ Configuration Files Created**

- **`firebase.json`**: Firebase hosting configuration
- **`.firebaserc`**: Project settings
- **`FIREBASE_DEPLOYMENT.md`**: This deployment guide

---

## **🔧 Additional Commands**

```bash
# Serve locally (preview)
firebase serve

# View deployment history
firebase hosting:sites:list

# Set custom domain
firebase hosting:sites:create your-custom-domain.com
```

---

## **🔐 Google OAuth Setup**

After deployment, update your Google OAuth settings:

1. Go to [Google Cloud Console](https://console.developers.google.com/)
2. Select your project
3. Go to **Credentials** > **OAuth 2.0 Client IDs**
4. Add your Firebase URLs to **Authorized JavaScript origins**:
   - `https://your-project-id.web.app`
   - `https://your-project-id.firebaseapp.com`

---

## **✅ Features Ready for Firebase**

- ✅ **Single Page Application** routing
- ✅ **Static asset caching** (1 year)
- ✅ **HTTPS** by default
- ✅ **Global CDN** for fast loading
- ✅ **Google Calendar sync** integration
- ✅ **Responsive design** for all devices

---

## **🎯 Next Steps**

1. **Deploy** using the commands above
2. **Update Google OAuth** with your new Firebase URLs
3. **Test Google Calendar sync** on the live site
4. **Share your electoral calendar** with users!

Your Digital Calendar application is now ready for Firebase Hosting! 🎉