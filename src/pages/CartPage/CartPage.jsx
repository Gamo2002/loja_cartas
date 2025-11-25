import React, { useState } from 'react'; // Adicione useState
import { useCart } from '../../context/CartContext';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'; // Adicione useNavigate
import './CartPage.css';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart(); // Adicione clearCart
  const navigate = useNavigate(); // Hook de navegação
  const [loading, setLoading] = useState(false);

  const formatMoney = (value) => {
    return parseFloat(value).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  // --- NOVA FUNÇÃO DE CHECKOUT ---
  const handleCheckout = async () => {
    // 1. Verifica se está logado
    const userStored = localStorage.getItem('user'); // Supondo que você salvou assim no Login
    
    if (!userStored) {
      alert("Você precisa estar logado para finalizar a compra!");
      navigate('/login'); // Redireciona para sua rota de login
      return;
    }

    const user = JSON.parse(userStored);

    // 2. Confirmação simples
    if (!window.confirm("Deseja confirmar o pedido?")) return;

    setLoading(true);

    try {
      const response = await fetch('https://undeprecating-randell-periproctic.ngrok-free.dev/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id_cliente: user.id, // ID salvo no localStorage vindo do Login
          cartItems: cartItems,
          total: cartTotal,
          
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Pedido realizado com sucesso! ID: " + data.id_pedido);
        clearCart(); // Limpa o carrinho visual
        navigate('/'); // Volta para a home ou página de "Meus Pedidos"
      } else {
        alert("Erro ao finalizar: " + data.error);
      }

    } catch (error) {
      console.error(error);
      alert("Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
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
                  <span style={{fontSize: '0.75rem', color: '#888'}}>
                    Estoque: {estoque} un.
                  </span>
                </div>

                <div className="item-quantity">
                  <button onClick={() => updateQuantity(item.id, -1)}>
                    <Minus size={14}/>
                  </button>
                  
                  <span>{item.quantity}</span>
                  
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
          
          {/* BOTÃO ATUALIZADO */}
          <button 
            className="checkout-btn" 
            onClick={handleCheckout} 
            disabled={loading}
          >
            {loading ? "Processando..." : "FINALIZAR COMPRA"}
          </button>
          
          <Link to="/" className="continue-link">Continuar comprando</Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;