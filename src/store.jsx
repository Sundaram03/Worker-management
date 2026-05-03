import React, { useState, useEffect, createContext, useContext } from 'react';

const STORAGE_KEY = 'wage_ledger_data';
const AUTH_KEY = 'wage_ledger_user';

const initialData = {
  workers: [
    { id: 1, name: 'Rengasamy', role: 'Farmer', dailyWage: 1000, phone: '9843787739' },
    { id: 2, name: 'Siva', role: 'Worker', dailyWage: 500, phone: '6383503717' },
    { id: 3, name: 'Sundar', role: 'Supervisor', dailyWage: 2000, phone: '9843787739' },
  ],
  attendance: {}, 
  moneyEntries: [], 
};

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialData;
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem(AUTH_KEY);
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_KEY);
    }
  }, [user]);

  const login = (email, password) => {
    const mockUser = { email, name: email.split('@')[0], role: 'OWNER' };
    setUser(mockUser);
    return true;
  };

  const loginWithGoogle = () => {
    const mockUser = { email: 'google.user@gmail.com', name: 'Google User', role: 'OWNER', provider: 'google' };
    setUser(mockUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const addWorker = (worker) => {
    setData(prev => ({
      ...prev,
      workers: [...prev.workers, { ...worker, id: Date.now() }]
    }));
  };

  const updateWorker = (updatedWorker) => {
    setData(prev => ({
      ...prev,
      workers: prev.workers.map(w => w.id === updatedWorker.id ? updatedWorker : w)
    }));
  };

  const deleteWorker = (id) => {
    setData(prev => ({
      ...prev,
      workers: prev.workers.filter(w => w.id !== id)
    }));
  };

  const updateAttendance = (date, workerId, status) => {
    setData(prev => ({
      ...prev,
      attendance: {
        ...prev.attendance,
        [date]: {
          ...(prev.attendance[date] || {}),
          [workerId]: status
        }
      }
    }));
  };

  const addMoneyEntry = (entry) => {
    setData(prev => ({
      ...prev,
      moneyEntries: [...prev.moneyEntries, { ...entry, id: Date.now() }]
    }));
  };

  return (
    <StoreContext.Provider value={{ 
      data, 
      user, 
      login, 
      loginWithGoogle, 
      logout, 
      addWorker, 
      updateWorker, 
      deleteWorker, 
      updateAttendance, 
      addMoneyEntry 
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
