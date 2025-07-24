import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { 
  MinusIcon, 
  PlusIcon, 
  PencilIcon 
} from '@heroicons/react/24/outline';
import { StockItem } from '../lib/stockService';
import ActionModal from './ActionModal';

interface StockTableProps {
  stockItems: StockItem[];
  onSubtract: (itemId: string, amount: number) => Promise<boolean>;
  onAdd: (itemId: string, amount: number) => Promise<boolean>;
  onEdit: (itemId: string, quantity: number) => Promise<boolean>;
}

type ModalType = 'subtract' | 'add' | 'edit' | null;

const StockTable: React.FC<StockTableProps> = ({
  stockItems,
  onSubtract,
  onAdd,
  onEdit
}) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { locale } = router;
  
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedItem, setSelectedItem] = useState<StockItem | null>(null);

  const openModal = (type: ModalType, item: StockItem) => {
    setModalType(type);
    setSelectedItem(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalType(null);
    setSelectedItem(null);
  };

  const handleAction = async (amount: number) => {
    if (!selectedItem) return false;
    
    let success = false;
    switch (modalType) {
      case 'subtract':
        success = await onSubtract(selectedItem.id, amount);
        break;
      case 'add':
        success = await onAdd(selectedItem.id, amount);
        break;
      case 'edit':
        success = await onEdit(selectedItem.id, amount);
        break;
    }
    
    if (success) {
      closeModal();
    }
    return success;
  };

  const getQuantityColor = (quantity: number) => {
    if (quantity === 0) return 'text-red-600 dark:text-red-400';
    if (quantity < 20) return 'text-orange-600 dark:text-orange-400';
    if (quantity < 50) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-green-600 dark:text-green-400';
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {t('currentStock')}
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('item')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('quantity')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('lastUpdated')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('actions')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {stockItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {item.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-bold ${getQuantityColor(item.quantity)}`}>
                      {item.quantity.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(item.lastUpdated)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openModal('subtract', item)}
                        className="p-2 rounded-lg bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                        title={t('subtract')}
                      >
                        <MinusIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => openModal('add', item)}
                        className="p-2 rounded-lg bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                        title={t('add')}
                      >
                        <PlusIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => openModal('edit', item)}
                        className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                        title={t('edit')}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ActionModal
        isOpen={modalOpen}
        onClose={closeModal}
        onConfirm={handleAction}
        item={selectedItem}
        type={modalType}
      />
    </>
  );
};

export default StockTable;