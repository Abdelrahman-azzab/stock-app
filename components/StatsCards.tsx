import React from 'react';
import { useTranslation } from '../lib/i18n';
import { 
  CubeIcon, 
  ExclamationTriangleIcon, 
  ChartBarIcon 
} from '@heroicons/react/24/outline';

interface StatsCardsProps {
  totalItems: number;
  lowStockCount: number;
  totalProducts: number;
}

const StatsCards: React.FC<StatsCardsProps> = ({
  totalItems,
  lowStockCount,
  totalProducts
}) => {
  const { t } = useTranslation();

  const stats = [
    {
      title: t('totalItems'),
      value: totalItems.toLocaleString(),
      icon: CubeIcon,
      color: 'blue',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      iconColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      title: t('lowStock'),
      value: lowStockCount,
      subtitle: t('itemsBelow'),
      icon: ExclamationTriangleIcon,
      color: 'red',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      iconColor: 'text-red-600 dark:text-red-400'
    },
    {
      title: 'Products',
      value: totalProducts,
      icon: ChartBarIcon,
      color: 'green',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      iconColor: 'text-green-600 dark:text-green-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`${stat.bgColor} rounded-xl p-6 border border-gray-200 dark:border-gray-700`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {stat.title}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {stat.value}
              </p>
              {stat.subtitle && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {stat.subtitle}
                </p>
              )}
            </div>
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;