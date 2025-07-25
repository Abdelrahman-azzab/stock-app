# Firebase Deployment Guide

## 🚀 Deploy Your Stock Management App to Firebase

This guide will help you deploy your stock management app to Firebase Hosting so you can access it from anywhere.

## Prerequisites

- Node.js installed on your computer
- A Google account for Firebase
- Your stock management app (already built!)

## Step 1: Install Firebase CLI

```bash
npm install -g firebase-tools
```

Or if you prefer to use the local version:
```bash
npm install
# Firebase tools is already included in devDependencies
```

## Step 2: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"**
3. Enter project name: `stock-management-app` (or your preferred name)
4. **Disable Google Analytics** (not needed for this project)
5. Click **"Create project"**
6. Wait for project creation to complete

## Step 3: Enable Firestore Database

1. In your Firebase project dashboard, click **"Firestore Database"**
2. Click **"Create database"**
3. Choose **"Start in test mode"** (for now - we'll secure it later)
4. Select a location closest to you
5. Click **"Done"**

## Step 4: Enable Firebase Hosting

1. In your Firebase project, go to **"Hosting"** in the left sidebar
2. Click **"Get started"**
3. Follow the setup wizard (we'll configure this properly in the next steps)

## Step 5: Get Your Firebase Configuration

1. Go to **Project Settings** (gear icon in Firebase Console)
2. Scroll down to **"Your apps"**
3. Click the **Web icon** (`</>`)
4. Register your app with name: `Stock Management App`
5. **Don't check** "Also set up Firebase Hosting" (we'll do this manually)
6. Copy the configuration values

## Step 6: Configure Environment Variables

Update your `.env.local` file with the real Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_actual_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_actual_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_actual_app_id
```

**Important**: Replace `your_project_id` and other placeholders with your actual Firebase values!

## Step 7: Login to Firebase CLI

```bash
firebase login
```

This will open your browser for Google authentication. Login with the same Google account you used for Firebase Console.

## Step 8: Initialize Firebase Hosting

```bash
firebase init hosting
```

When prompted, select:
- **"Use an existing project"**
- Choose your project from the list
- **Public directory**: `out` (important!)
- **Configure as single-page app**: `Yes`
- **Set up automatic builds and deploys with GitHub**: `No` (for now)
- **Overwrite index.html**: `No`

## Step 9: Build and Deploy

```bash
# Build the app for static export
npm run build

# Deploy to Firebase
firebase deploy
```

## Step 10: Access Your App

After successful deployment, Firebase will provide you with URLs like:
- **Hosting URL**: `https://your-project-id.web.app`
- **Custom Domain**: `https://your-project-id.firebaseapp.com`

🎉 **Your app is now live and accessible from anywhere!**

## Quick Deploy Script

For future updates, you can use our convenient script:

```bash
npm run deploy
```

This command will:
1. Build the app (`npm run export`)
2. Deploy to Firebase (`firebase deploy`)

## Setting Up Custom Domain (Optional)

1. In Firebase Console, go to **"Hosting"**
2. Click **"Add custom domain"**
3. Enter your domain name
4. Follow the DNS verification steps
5. Wait for SSL certificate provisioning (can take up to 24 hours)

## Security: Configure Firestore Rules

For production, update your Firestore security rules:

1. In Firebase Console, go to **"Firestore Database"**
2. Click **"Rules"** tab
3. Replace the rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /inventory/stock {
      allow read, write: if true; // Adjust based on your needs
    }
  }
}
```

4. Click **"Publish"**

## Monitoring and Analytics

### View Usage Stats
- Firebase Console → Hosting → Usage tab
- See page views, data transfer, and performance

### Monitor Database
- Firebase Console → Firestore Database
- View real-time data changes
- Monitor read/write operations

## Troubleshooting

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Try building again
npm run build
```

### Deployment Errors
```bash
# Check if you're logged in
firebase login --reauth

# Check your project
firebase projects:list

# Use specific project
firebase use your-project-id
```

### Firebase Configuration Issues
- Double-check all environment variables in `.env.local`
- Ensure Firestore is enabled
- Verify your Firebase project ID is correct

## Important Notes

1. **Environment Variables**: Make sure `.env.local` has your real Firebase config
2. **Build Process**: The app is exported as static files to the `out/` directory
3. **Automatic Updates**: Run `npm run deploy` whenever you make changes
4. **Data Persistence**: Your stock data is stored in Firestore and will persist
5. **Multi-Device Access**: Access your app from any device with the Firebase URL

## Project Structure After Deployment

```
your-project/
├── out/                    # Generated static files (deployed to Firebase)
├── .firebase/             # Firebase configuration cache
├── firebase.json          # Firebase hosting configuration
├── .env.local            # Your Firebase credentials (never commit this!)
└── [all your app files]
```

## Success! 🎉

Your stock management app is now:
- ✅ **Live on Firebase Hosting**
- ✅ **Accessible from anywhere with internet**
- ✅ **Using Firebase Firestore for data**
- ✅ **Automatically syncing across devices**
- ✅ **Supporting both English and Arabic**
- ✅ **With dark/light mode themes**

**Access your app at**: `https://your-project-id.web.app`

Start managing your Rozleaf inventory from anywhere! 📦