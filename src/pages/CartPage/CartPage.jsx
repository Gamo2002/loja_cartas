import React from 'react';
import { useCart } from '../../context/CartContext';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart container">
        <h2>Seu carrinho está vazio</h2>
        <p>Que tal dar uma olhada nas nossas ofertas?</p>
        <Link to="/" className="back-btn"><ArrowLeft size={16}/> Voltar para a Loja</Link>
      </div>
    );
  }

  return (
    <div className="cart-page container">
      <h1>Meu Carrinho</h1>
      
      <div className="cart-content">
        {/* Lista de Produtos */}
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              
              <div className="item-details">
                <h3>{item.name}</h3>
                <span className="item-type">{item.type}</span>
              </div>

              <div className="item-quantity">
                <button onClick={() => updateQuantity(item.id, -1)}><Minus size={14}/></button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)}><Plus size={14}/></button>
              </div>

              <div className="item-price">
                <p>R$ {item.price}</p>
              </div>

              <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* Resumo do Pedido */}
        <div className="cart-summary">
          <h2>Resumo do Pedido</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>R$ {cartTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
          </div>
          <div className="summary-row">
            <span>Frete</span>
            <span>Grátis</span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-row total">
            <span>Total</span>
            <span>R$ {cartTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
          </div>
          
          <button className="checkout-btn">FINALIZAR COMPRA</button>
          <Link to="/" className="continue-link">Continuar comprando</Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;