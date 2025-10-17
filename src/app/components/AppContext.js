// app/context/AppContext.js
'use client';

import { createContext, useContext, useState } from 'react';

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
