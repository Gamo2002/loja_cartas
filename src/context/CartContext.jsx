import React, { createContext, useState, useContext } from 'react';

// 1. Cria o Contexto (a "nuvem")
const CartContext = createContext();

// 2. Cria o Provedor (o componente que vai envolver o App inteiro)
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Função para adicionar ao carrinho
  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      // Verifica se o item já existe no carrinho
      const itemExists = prevItems.find(item => item.id === product.id);

      if (itemExists) {
        // Se existe, só aumenta a quantidade
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Se não existe, adiciona o novo item
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  // Função para remover do carrinho
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // Função para alterar quantidade (botões + e - no carrinho)
  const updateQuantity = (productId, amount) => {
    setCartItems(prevItems => 
      prevItems.map(item => {
        if (item.id === productId) {
          // Não deixa a quantidade ser menor que 1
          const newQuantity = Math.max(1, item.quantity + amount);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  // Calcula o valor total do carrinho
  const cartTotal = cartItems.reduce((total, item) => {
    // Remove pontos e virgulas para calcular (ex: "299,90" -> 299.90)
    // Nota: Se seus preços no products.js forem strings "299,90", precisa tratar.
    // Vou assumir que no products.js você mudou para Strings, vamos limpar:
    const priceNumber = parseFloat(item.price.replace('.', '').replace(',', '.'));
    return total + (priceNumber * item.quantity);
  }, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar o carrinho mais fácil
export const useCart = () => useContext(CartContext);