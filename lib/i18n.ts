import { useState, useEffect } from 'react';

export interface Translations {
  [key: string]: string;
}

const translations: Record<string, Translations> = {
  en: {
    title: "Stock Management System",
    subtitle: "Track and manage your inventory efficiently",
    currentStock: "Current Stock",
    item: "Item",
    quantity: "Quantity",
    lastUpdated: "Last Updated",
    actions: "Actions",
    subtract: "Subtract",
    add: "Add",
    edit: "Edit",
    save: "Save",
    cancel: "Cancel",
    amount: "Amount",
    subtractAmount: "Subtract Amount",
    addAmount: "Add Amount",
    editQuantity: "Edit Quantity",
    newQuantity: "New Quantity",
    enterAmount: "Enter amount",
    enterQuantity: "Enter quantity",
    close: "Close",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    language: "Language",
    english: "English",
    arabic: "العربية",
    totalItems: "Total Items",
    lowStock: "Low Stock",
    lastSync: "Last Sync",
    sync: "Sync",
    error: "Error",
    success: "Success",
    stockUpdated: "Stock updated successfully",
    syncCompleted: "Data synchronized",
    errorUpdating: "Error updating stock",
    errorSyncing: "Error synchronizing data",
    confirmSubtract: "Subtract {{amount}} from {{item}}?",
    confirmAdd: "Add {{amount}} to {{item}}?",
    confirmEdit: "Change {{item}} quantity to {{quantity}}?",
    itemsBelow: "items below 50 units"
  },
  ar: {
    title: "نظام إدارة المخزون",
    subtitle: "تتبع وإدارة مخزونك بكفاءة",
    currentStock: "المخزون الحالي",
    item: "الصنف",
    quantity: "الكمية",
    lastUpdated: "آخر تحديث",
    actions: "الإجراءات",
    subtract: "طرح",
    add: "إضافة",
    edit: "تعديل",
    save: "حفظ",
    cancel: "إلغاء",
    amount: "الكمية",
    subtractAmount: "طرح كمية",
    addAmount: "إضافة كمية",
    editQuantity: "تعديل الكمية",
    newQuantity: "الكمية الجديدة",
    enterAmount: "أدخل الكمية",
    enterQuantity: "أدخل الكمية",
    close: "إغلاق",
    darkMode: "الوضع المظلم",
    lightMode: "الوضع المضيء",
    language: "اللغة",
    english: "English",
    arabic: "العربية",
    totalItems: "إجمالي الأصناف",
    lowStock: "مخزون منخفض",
    lastSync: "آخر مزامنة",
    sync: "مزامنة",
    error: "خطأ",
    success: "نجح",
    stockUpdated: "تم تحديث المخزون بنجاح",
    syncCompleted: "تمت المزامنة",
    errorUpdating: "خطأ في تحديث المخزون",
    errorSyncing: "خطأ في مزامنة البيانات",
    confirmSubtract: "طرح {{amount}} من {{item}}؟",
    confirmAdd: "إضافة {{amount}} إلى {{item}}؟",
    confirmEdit: "تغيير كمية {{item}} إلى {{quantity}}؟",
    itemsBelow: "أصناف أقل من 50 وحدة"
  }
};

export const useTranslation = () => {
  const [locale, setLocale] = useState<string>('en');

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') || 'en';
    setLocale(savedLocale);
    document.documentElement.dir = savedLocale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = savedLocale;
  }, []);

  const changeLanguage = (newLocale: string) => {
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
    document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLocale;
  };

  const t = (key: string, params?: Record<string, any>) => {
    let translation = translations[locale]?.[key] || translations['en'][key] || key;
    
    if (params) {
      Object.keys(params).forEach(param => {
        translation = translation.replace(`{{${param}}}`, params[param]);
      });
    }
    
    return translation;
  };

  return { t, locale, changeLanguage };
};