import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

export interface StockItem {
  id: string;
  name: string;
  quantity: number;
  lastUpdated: Date;
}

export const STOCK_ITEMS: Omit<StockItem, 'lastUpdated'>[] = [
  { id: 'rozleaf-125', name: 'Rozleaf 125', quantity: 144 },
  { id: 'rozleaf-175', name: 'Rozleaf 175', quantity: 120 },
  { id: 'rozleaf-250', name: 'Rozleaf 250', quantity: 48 },
  { id: 'rozleaf-350', name: 'Rozleaf 350', quantity: 40 },
  { id: 'rozleaf-450', name: 'Rozleaf 450', quantity: 32 },
];

export const getStockData = async (): Promise<StockItem[]> => {
  try {
    const stockRef = doc(db, 'inventory', 'stock');
    const stockSnap = await getDoc(stockRef);
    
    if (stockSnap.exists()) {
      const data = stockSnap.data();
      return data.items.map((item: any) => ({
        ...item,
        lastUpdated: item.lastUpdated?.toDate() || new Date()
      }));
    } else {
      // Initialize with default data
      const initialData = STOCK_ITEMS.map(item => ({
        ...item,
        lastUpdated: new Date()
      }));
      await setDoc(stockRef, { items: initialData });
      return initialData;
    }
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return STOCK_ITEMS.map(item => ({
      ...item,
      lastUpdated: new Date()
    }));
  }
};

export const updateStockItem = async (itemId: string, newQuantity: number): Promise<void> => {
  try {
    const stockRef = doc(db, 'inventory', 'stock');
    const stockSnap = await getDoc(stockRef);
    
    if (stockSnap.exists()) {
      const data = stockSnap.data();
      const updatedItems = data.items.map((item: any) => 
        item.id === itemId 
          ? { ...item, quantity: newQuantity, lastUpdated: new Date() }
          : item
      );
      
      await updateDoc(stockRef, { items: updatedItems });
    }
  } catch (error) {
    console.error('Error updating stock item:', error);
    throw error;
  }
};

export const updateMultipleStockItems = async (updates: { id: string; quantity: number }[]): Promise<void> => {
  try {
    const stockRef = doc(db, 'inventory', 'stock');
    const stockSnap = await getDoc(stockRef);
    
    if (stockSnap.exists()) {
      const data = stockSnap.data();
      const updatedItems = data.items.map((item: any) => {
        const update = updates.find(u => u.id === item.id);
        return update 
          ? { ...item, quantity: update.quantity, lastUpdated: new Date() }
          : item;
      });
      
      await updateDoc(stockRef, { items: updatedItems });
    }
  } catch (error) {
    console.error('Error updating multiple stock items:', error);
    throw error;
  }
};