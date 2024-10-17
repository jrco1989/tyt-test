import React, { createContext, useContext, useState } from 'react';

// Crear el contexto
const CodContext = createContext();

// Proveedor del contexto
export const CodProvider = ({ children }) => {
  const [cod, setCod] = useState(null);

  return (
    <CodContext.Provider value={{ cod, setCod }}>
      {children}
    </CodContext.Provider>
  );
};

// Hook para usar el contexto
export const useCod = () => {
  return useContext(CodContext);
};
