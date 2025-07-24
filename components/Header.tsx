import React from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { 
  SunIcon, 
  MoonIcon, 
  LanguageIcon, 
  ArrowPathIcon 
} from '@heroicons/react/24/outline';

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onSync: () => void;
  lastSync: Date | null;
  isLoading: boolean;
}

const Header: React.FC<HeaderProps> = ({
  isDark,
  onToggleTheme,
  onSync,
  lastSync,
  isLoading
}) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { locale } = router;

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'ar' : 'en';
    router.push(router.pathname, router.asPath, { locale: newLocale });
  };

  const formatLastSync = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleTimeString(locale, { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="text-center flex-1">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t('title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {t('subtitle')}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Last Sync Info */}
            {lastSync && (
              <div className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
                <div>{t('lastSync')}</div>
                <div className="font-mono">{formatLastSync(lastSync)}</div>
              </div>
            )}
            
            {/* Sync Button */}
            <button
              onClick={onSync}
              disabled={isLoading}
              className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors disabled:opacity-50"
              title={t('sync')}
            >
              <ArrowPathIcon className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-lg bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
              title={t('language')}
            >
              <LanguageIcon className="h-5 w-5" />
            </button>
            
            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-800 transition-colors"
              title={isDark ? t('lightMode') : t('darkMode')}
            >
              {isDark ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;