# Stock Management System

A modern, responsive stock management application built with Next.js, Firebase, and Tailwind CSS. Features bilingual support (English/Arabic), dark/light mode, and real-time data synchronization.

## ✨ Features

- **Real-time Stock Management**: Add, subtract, and edit stock quantities
- **Firebase Integration**: Data persistence and synchronization across devices
- **Bilingual Support**: English and Arabic languages with RTL support
- **Dark/Light Mode**: Theme switching with system preference detection
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Modern UI**: Clean, professional interface with smooth animations
- **Low Stock Alerts**: Visual indicators for items running low
- **Offline Support**: Graceful handling of network issues

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Heroicons
- **Database**: Firebase Firestore
- **Internationalization**: next-i18next
- **Deployment**: Vercel

## 📋 Initial Stock Data

The system comes pre-configured with the following Rozleaf items:

| Item        | Initial Quantity |
|-------------|------------------|
| Rozleaf 125 | 144             |
| Rozleaf 175 | 120             |
| Rozleaf 250 | 48              |
| Rozleaf 350 | 40              |
| Rozleaf 450 | 32              |

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase account

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd stock-management-app
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database
3. Get your Firebase configuration from Project Settings
4. Copy `.env.example` to `.env.local`
5. Replace the placeholder values with your Firebase config:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🌐 Deployment

### Deploy to Vercel

1. Push your code to GitHub/GitLab/Bitbucket
2. Connect your repository to [Vercel](https://vercel.com)
3. Add your Firebase environment variables in Vercel's dashboard:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add all `NEXT_PUBLIC_FIREBASE_*` variables

### Alternative: Vercel CLI

```bash
npm install -g vercel
vercel
```

Follow the prompts and add your environment variables when requested.

## 📱 Usage

### Basic Operations

1. **View Stock**: See all items with current quantities and last update times
2. **Subtract Stock**: Click the minus (-) button to reduce quantities
3. **Add Stock**: Click the plus (+) button to increase quantities  
4. **Edit Stock**: Click the edit button to set exact quantities
5. **Sync Data**: Click the sync button to refresh from Firebase
6. **Switch Themes**: Toggle between light and dark modes
7. **Change Language**: Switch between English and Arabic

### Features

- **Color-coded Quantities**: 
  - Red: Out of stock (0)
  - Orange: Very low (1-19)
  - Yellow: Low (20-49)
  - Green: Good stock (50+)

- **Statistics Cards**: View total items, low stock count, and product count
- **Real-time Updates**: All changes sync immediately to Firebase
- **Responsive Design**: Works on all screen sizes

## 🔧 Configuration

### Customizing Stock Items

Edit `lib/stockService.ts` to modify the initial stock items:

```typescript
export const STOCK_ITEMS: Omit<StockItem, 'lastUpdated'>[] = [
  { id: 'your-item-1', name: 'Your Item 1', quantity: 100 },
  { id: 'your-item-2', name: 'Your Item 2', quantity: 50 },
  // Add more items...
];
```

### Customizing Low Stock Threshold

Modify the threshold in `hooks/useStock.ts`:

```typescript
const getLowStockCount = useCallback(() => {
  return stockItems.filter(item => item.quantity < 50).length; // Change 50 to your threshold
}, [stockItems]);
```

## 🔒 Security

- Environment variables are used for Firebase configuration
- Client-side Firebase rules should be configured for production
- All user inputs are validated and sanitized

## 🌍 Internationalization

The app supports English and Arabic with:
- RTL layout for Arabic
- Proper font selection (Inter for English, Noto Sans Arabic for Arabic)
- Complete translation of all UI elements
- Locale-aware date/time formatting

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:

1. Check the Firebase console for any errors
2. Verify your environment variables are correct
3. Ensure your Firebase project has Firestore enabled
4. Check the browser console for any JavaScript errors

For additional help, please open an issue in the repository.

---

**Happy Stock Managing! 📦**