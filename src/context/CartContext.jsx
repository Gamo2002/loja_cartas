import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      // Garante que temos um valor de estoque, ou assume infinito se der erro
      const estoqueMaximo = product.stock || 999; 

      if (existingItem) {
        // Se já existe, soma a nova quantidade, MAS respeita o limite do estoque
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: Math.min(estoqueMaximo, item.quantity + quantity) }
            : item
        );
      } else {
        // Se é novo, adiciona (mas também garante que não passou do estoque)
        return [...prevItems, { ...product, quantity: Math.min(estoqueMaximo, quantity) }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // --- AQUI É A MUDANÇA PRINCIPAL ---
  const updateQuantity = (id, change) => {
    setCartItems(prevItems => 
      prevItems.map(item => {
        if (item.id === id) {
          const estoqueMaximo = item.stock || 999;
          
          // Calcula o novo valor
          let newQuantity = item.quantity + change;

          // Regra 1: Não pode ser menor que 1
          if (newQuantity < 1) newQuantity = 1;

          // Regra 2: Não pode ser maior que o estoque
          if (newQuantity > estoqueMaximo) newQuantity = estoqueMaximo;

          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((total, item) => {
    const price = parseFloat(item.price); 
    return total + (price * item.quantity);
  }, 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);