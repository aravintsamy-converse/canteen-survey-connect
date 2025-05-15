import React, { createContext, useContext, useState } from 'react';

interface GuidContextType {
  guid: string;
  setGuid: (guid: string) => void;
}

const GuidContext = createContext<GuidContextType | undefined>(undefined);

export const GuidProvider: React.FC<{ children: React.ReactNode; initialGuid?: string }> = ({
  children,
  initialGuid = '',
}) => {
  const [guid, setGuid] = useState(initialGuid);

  return (
    <GuidContext.Provider value={{ guid, setGuid }}>
      {children}
    </GuidContext.Provider>
  );
};

export const useGuid = () => {
  const context = useContext(GuidContext);
  if (!context) {
    throw new Error('useGuid must be used within a GuidProvider');
  }
  return context;
};