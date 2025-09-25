import React, { createContext, useContext, useState, useEffect } from 'react';

const CarritoContext = createContext();

export const useCarrito = () => useContext(CarritoContext);

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    // Persistencia localStorage
    const saved = localStorage.getItem('carrito');
    if (saved) setCarrito(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const addToCarrito = (product, quantity = 1) => {
    setCarrito(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCarrito = (id) => {
    setCarrito(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCarrito(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const clearCarrito = () => setCarrito([]);

  const total = carrito.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CarritoContext.Provider value={{ carrito, addToCarrito, removeFromCarrito, updateQuantity, clearCarrito, total }}>
      {children}
    </CarritoContext.Provider>
  );
};