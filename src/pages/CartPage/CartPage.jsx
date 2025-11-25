import React from 'react';
import { useCart } from '../../context/CartContext';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  const formatMoney = (value) => {
    return parseFloat(value).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

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
        <div className="cart-items">
          {cartItems.map(item => {
            // Verifica se atingiu o limite para bloquear o botão
            const estoque = item.stock || 0;
            const atingiuLimite = item.quantity >= estoque;

            return (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <span className="item-type">
                     {item.description ? item.description.substring(0, 30) + '...' : ''}
                  </span>
                  {/* Aviso visual de estoque */}
                  <span style={{fontSize: '0.75rem', color: '#888'}}>
                    Estoque: {estoque} un.
                  </span>
                </div>

                <div className="item-quantity">
                  <button onClick={() => updateQuantity(item.id, -1)}>
                    <Minus size={14}/>
                  </button>
                  
                  <span>{item.quantity}</span>
                  
                  {/* Botão de + fica desabilitado se atingiu o limite */}
                  <button 
                    onClick={() => updateQuantity(item.id, 1)}
                    disabled={atingiuLimite}
                    style={atingiuLimite ? { opacity: 0.3, cursor: 'not-allowed' } : {}}
                    title={atingiuLimite ? "Estoque máximo atingido" : "Adicionar mais"}
                  >
                    <Plus size={14}/>
                  </button>
                </div>

                <div className="item-price">
                  <p>R$ {formatMoney(item.price)}</p>
                  <span style={{fontSize: '0.8rem', color: '#666'}}>
                    Total: R$ {formatMoney(item.price * item.quantity)}
                  </span>
                </div>

                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                  <Trash2 size={18} />
                </button>
              </div>
            );
          })}
        </div>

        <div className="cart-summary">
          <h2>Resumo do Pedido</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>R$ {formatMoney(cartTotal)}</span>
          </div>
          <div className="summary-row">
            <span>Frete</span>
            <span>Grátis</span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-row total">
            <span>Total</span>
            <span>R$ {formatMoney(cartTotal)}</span>
          </div>
          
          <button className="checkout-btn" onClick={() => alert("Indo para pagamento...")}>
            FINALIZAR COMPRA
          </button>
          <Link to="/" className="continue-link">Continuar comprando</Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;