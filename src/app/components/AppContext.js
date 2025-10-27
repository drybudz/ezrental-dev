// app/context/AppContext.js
'use client';

import { createContext, useContext, useState } from 'react';
import Image from 'next/image';
import styles from './styles/Loading.module.css';

export const AppContext = createContext();

export function AppProvider({ children, initialData }) {
  const [allData, setAllData] = useState(initialData);

  return (
    <AppContext.Provider value={{ allData }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}

// Loading Component
export function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <Image
        src="/images/icon-loading.png"
        alt="Loading"
        width={60}
        height={60}
        className={styles.loadingIcon}
      />
    </div>
  );
}
