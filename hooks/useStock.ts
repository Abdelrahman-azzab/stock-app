import { useState, useEffect, useCallback } from 'react';
import { StockItem, getStockData, updateStockItem } from '../lib/stockService';

export const useStock = () => {
  const [stockItems, setStockItems] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastSync, setLastSync] = useState<Date | null>(null);

  const fetchStock = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getStockData();
      setStockItems(data);
      setLastSync(new Date());
    } catch (error) {
      console.error('Error fetching stock:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateItem = useCallback(async (itemId: string, newQuantity: number) => {
    try {
      await updateStockItem(itemId, newQuantity);
      setStockItems(prev => 
        prev.map(item => 
          item.id === itemId 
            ? { ...item, quantity: newQuantity, lastUpdated: new Date() }
            : item
        )
      );
      setLastSync(new Date());
      return true;
    } catch (error) {
      console.error('Error updating stock item:', error);
      return false;
    }
  }, []);

  const subtractFromItem = useCallback(async (itemId: string, amount: number) => {
    const item = stockItems.find(i => i.id === itemId);
    if (!item) return false;
    
    const newQuantity = Math.max(0, item.quantity - amount);
    return await updateItem(itemId, newQuantity);
  }, [stockItems, updateItem]);

  const addToItem = useCallback(async (itemId: string, amount: number) => {
    const item = stockItems.find(i => i.id === itemId);
    if (!item) return false;
    
    const newQuantity = item.quantity + amount;
    return await updateItem(itemId, newQuantity);
  }, [stockItems, updateItem]);

  const getLowStockCount = useCallback(() => {
    return stockItems.filter(item => item.quantity < 50).length;
  }, [stockItems]);

  const getTotalItems = useCallback(() => {
    return stockItems.reduce((total, item) => total + item.quantity, 0);
  }, [stockItems]);

  useEffect(() => {
    fetchStock();
  }, [fetchStock]);

  return {
    stockItems,
    loading,
    lastSync,
    updateItem,
    subtractFromItem,
    addToItem,
    refreshStock: fetchStock,
    getLowStockCount,
    getTotalItems
  };
};