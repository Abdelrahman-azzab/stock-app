# Deployment Guide

This guide covers two deployment options for your Stock Management System:

## Option 1: Deploy to Vercel (Recommended)

Vercel provides the best experience for Next.js applications with automatic deployments and excellent performance.

### Step 1: Prepare Your Repository

1. Push your code to GitHub, GitLab, or Bitbucket
2. Ensure your `.env.local` file is NOT committed (it's in `.gitignore`)

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "New Project"
3. Connect your Git repository
4. Select your stock management repository

### Step 3: Configure Environment Variables

In the Vercel dashboard, add these environment variables:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Step 4: Deploy

1. Click "Deploy" - Vercel will automatically build and deploy your app
2. Your app will be available at `https://your-project-name.vercel.app`

### Step 5: Set Up Automatic Deployments

- Every push to your main branch will automatically trigger a new deployment
- Pull requests will create preview deployments

---

## Option 2: Deploy to Firebase Hosting

### Step 1: Install Firebase CLI

```bash
npm install -g firebase-tools
```

### Step 2: Login to Firebase

```bash
firebase login
```

### Step 3: Initialize Firebase Hosting

```bash
firebase init hosting
```

Select:
- Use an existing project (your Firebase project)
- Public directory: `out`
- Configure as single-page app: Yes
- Set up automatic builds: No (for now)

### Step 4: Build for Static Export

Add this to your `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}
```

### Step 5: Build and Deploy

```bash
npm run build
firebase deploy
```

---

## Firebase Setup

Regardless of hosting choice, you need a Firebase project:

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name (e.g., "stock-management-app")
4. Disable Google Analytics (optional)
5. Click "Create project"

### 2. Enable Firestore

1. In your Firebase project, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location close to your users
5. Click "Done"

### 3. Get Configuration

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Web app" (</> icon)
4. Register your app with a name
5. Copy the config object values to your environment variables

### 4. Set Up Security Rules (Production)

For production, replace the default Firestore rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /inventory/stock {
      allow read, write: if true; // Adjust based on your auth requirements
    }
  }
}
```

---

## Domain Setup (Optional)

### For Vercel:
1. Go to your project settings in Vercel
2. Click "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

### For Firebase:
1. In Firebase Console, go to Hosting
2. Click "Add custom domain"
3. Follow the verification and DNS setup instructions

---

## Environment Variables Security

### Production Best Practices:

1. **Never commit `.env.local`** - it's in `.gitignore`
2. **Use platform environment variables** - set them in your hosting dashboard
3. **Restrict Firebase access** - configure proper Firestore security rules
4. **Monitor usage** - check Firebase usage in the console

### Required Environment Variables:

All environment variables starting with `NEXT_PUBLIC_` are exposed to the browser, which is necessary for Firebase client-side operations.

---

## Troubleshooting

### Build Errors:
- Check that all environment variables are set correctly
- Verify Firebase configuration is valid
- Ensure all dependencies are installed

### Firebase Connection Issues:
- Verify your Firebase project ID is correct
- Check that Firestore is enabled
- Ensure your API key has the necessary permissions

### Deployment Failures:
- Check build logs for specific error messages
- Verify all required files are committed to your repository
- Ensure your hosting platform has all environment variables set

---

## Success! 🎉

Your Stock Management System should now be live and accessible from anywhere. The Firebase integration will ensure your data persists across devices and sessions.

Access your app and start managing your Rozleaf inventory!