import React, { createContext, useContext, useState } from 'react';

const DescuentoContext = createContext();

export const useDescuento = () => useContext(DescuentoContext);

export const DescuentoProvider = ({ children }) => {
  const [descuento, setDescuento] = useState(0); // Porcentaje
  const [cupon, setCupon] = useState('');

  const applyCupon = (code) => {
    // Simula cupones: 'DESCUENTO10' = 10%, etc.
    if (code === 'DESCUENTO10') {
      setDescuento(10);
      setCupon(code);
      return 10;
    }
    return 0;
  };

  const clearCupon = () => {
    setDescuento(0);
    setCupon('');
  };

  const precioConDescuento = (precio) => precio - (precio * descuento / 100);

  return (
    <DescuentoContext.Provider value={{ descuento, cupon, applyCupon, clearCupon, precioConDescuento }}>
      {children}
    </DescuentoContext.Provider>
  );
};