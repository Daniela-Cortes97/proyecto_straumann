import React, { createContext, useContext, useState } from 'react';
import { Notificacion } from '../types';

interface NotificationContextType {
  notifications: Notificacion[];
  addNotification: (notification: Omit<Notificacion, 'id' | 'fechaCreacion' | 'leida'>) => void;
  markAsRead: (id: string) => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notificacion[]>([]);

  const addNotification = (notification: Omit<Notificacion, 'id' | 'fechaCreacion' | 'leida'>) => {
    const newNotification: Notificacion = {
      ...notification,
      id: Date.now().toString(),
      fechaCreacion: new Date().toISOString(),
      leida: false
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Auto-remove después de 5 segundos para notificaciones de éxito/info
    if (notification.tipo === 'success' || notification.tipo === 'info') {
      setTimeout(() => {
        removeNotification(newNotification.id);
      }, 5000);
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, leida: true } : notif
      )
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      markAsRead,
      removeNotification,
      clearAll
    }}>
      {children}
    </NotificationContext.Provider>
  );
};