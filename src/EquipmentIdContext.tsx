import React, { createContext, useContext, useState } from 'react';

interface EquipmentContextType {
  eqpId: string;
  setEqpId: (eqpId: string) => void;
}

const EquipmentIdContext = createContext<EquipmentContextType | undefined>(undefined);

export const EquipmentIdProvider: React.FC<{ children: React.ReactNode; initialEqpId?: string }> = ({
  children,
  initialEqpId = '',
}) => {
  const [eqpId, setEqpId] = useState(initialEqpId);

  return (
    <EquipmentIdContext.Provider value={{ eqpId, setEqpId }}>
      {children}
    </EquipmentIdContext.Provider>
  );
};

export const useEqpId = () => {
  const context = useContext(EquipmentIdContext);
  if (!context) {
    throw new Error('useGuid must be used within a GuidProvider');
  }
  return context;
};