import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { StockItem } from '../lib/stockService';

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (amount: number) => Promise<boolean>;
  item: StockItem | null;
  type: 'subtract' | 'add' | 'edit' | null;
}

const ActionModal: React.FC<ActionModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  item,
  type
}) => {
  const { t } = useTranslation('common');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setAmount(type === 'edit' ? item?.quantity.toString() || '' : '');
      setError('');
    }
  }, [isOpen, type, item]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const numAmount = parseInt(amount);
    if (isNaN(numAmount) || numAmount < 0) {
      setError('Please enter a valid positive number');
      return;
    }

    if (type === 'subtract' && item && numAmount > item.quantity) {
      setError('Cannot subtract more than current quantity');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const success = await onConfirm(numAmount);
      if (!success) {
        setError('Failed to update stock');
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getModalTitle = () => {
    switch (type) {
      case 'subtract':
        return t('subtractAmount');
      case 'add':
        return t('addAmount');
      case 'edit':
        return t('editQuantity');
      default:
        return '';
    }
  };

  const getPlaceholder = () => {
    switch (type) {
      case 'subtract':
      case 'add':
        return t('enterAmount');
      case 'edit':
        return t('enterQuantity');
      default:
        return '';
    }
  };

  const getConfirmText = () => {
    if (!item) return '';
    const numAmount = parseInt(amount) || 0;
    
    switch (type) {
      case 'subtract':
        return t('confirmSubtract', { amount: numAmount, item: item.name });
      case 'add':
        return t('confirmAdd', { amount: numAmount, item: item.name });
      case 'edit':
        return t('confirmEdit', { quantity: numAmount, item: item.name });
      default:
        return '';
    }
  };

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {getModalTitle()}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <XMarkIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {item.name}
            </label>
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              Current quantity: {item.quantity.toLocaleString()}
            </div>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={getPlaceholder()}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}
          
          {amount && !error && (
            <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {getConfirmText()}
              </p>
              {type === 'subtract' && (
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                  New quantity: {Math.max(0, item.quantity - parseInt(amount))}
                </p>
              )}
              {type === 'add' && (
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                  New quantity: {item.quantity + parseInt(amount)}
                </p>
              )}
            </div>
          )}
          
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              disabled={loading || !amount || !!error}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Loading...' : t('save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActionModal;