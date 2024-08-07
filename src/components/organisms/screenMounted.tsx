import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

type ContextType = {
  screenMounted: boolean;
  setScreenMounted: Dispatch<SetStateAction<boolean>>;
};

const ScreenMountContext = createContext<ContextType | undefined>(undefined);

type ScreenMountProviderProps = {
  children: ReactNode;
};

export const ScreenMountProvider = ({ children }: ScreenMountProviderProps) => {
  const [screenMounted, setScreenMounted] = useState(false);

  const contextValue: ContextType = {
    screenMounted,
    setScreenMounted,
  };

  return (
    <ScreenMountContext.Provider value={contextValue}>
      {children}
    </ScreenMountContext.Provider>
  );
};

export default ScreenMountContext;
