import React, { useState } from 'react';
import Head from 'next/head';
import { useTranslation } from '../lib/i18n';
import { useTheme } from '../hooks/useTheme';
import { useStock } from '../hooks/useStock';
import Header from '../components/Header';
import StatsCards from '../components/StatsCards';
import StockTable from '../components/StockTable';

export default function Home() {
  const { t } = useTranslation();
  const { isDark, toggleTheme } = useTheme();
  const {
    stockItems,
    loading,
    lastSync,
    subtractFromItem,
    addToItem,
    updateItem,
    refreshStock,
    getLowStockCount,
    getTotalItems
  } = useStock();

  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);



  // Show notifications
  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSubtract = async (itemId: string, amount: number) => {
    const success = await subtractFromItem(itemId, amount);
    if (success) {
      showNotification('success', t('stockUpdated'));
    } else {
      showNotification('error', t('errorUpdating'));
    }
    return success;
  };

  const handleAdd = async (itemId: string, amount: number) => {
    const success = await addToItem(itemId, amount);
    if (success) {
      showNotification('success', t('stockUpdated'));
    } else {
      showNotification('error', t('errorUpdating'));
    }
    return success;
  };

  const handleEdit = async (itemId: string, quantity: number) => {
    const success = await updateItem(itemId, quantity);
    if (success) {
      showNotification('success', t('stockUpdated'));
    } else {
      showNotification('error', t('errorUpdating'));
    }
    return success;
  };

  const handleSync = async () => {
    try {
      await refreshStock();
      showNotification('success', t('syncCompleted'));
    } catch (error) {
      showNotification('error', t('errorSyncing'));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading stock data...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content={t('subtitle')} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Header
          isDark={isDark}
          onToggleTheme={toggleTheme}
          onSync={handleSync}
          lastSync={lastSync}
          isLoading={loading}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <StatsCards
            totalItems={getTotalItems()}
            lowStockCount={getLowStockCount()}
            totalProducts={stockItems.length}
          />

          <StockTable
            stockItems={stockItems}
            onSubtract={handleSubtract}
            onAdd={handleAdd}
            onEdit={handleEdit}
          />
        </main>

        {/* Notification Toast */}
        {notification && (
          <div className="fixed bottom-4 right-4 z-50">
            <div
              className={`px-6 py-3 rounded-lg shadow-lg ${
                notification.type === 'success'
                  ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-700'
                  : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-700'
              }`}
            >
              <p className="text-sm font-medium">{notification.message}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

