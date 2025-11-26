import React, { useState, useEffect } from 'react';
import './OrderHistory.css';
// 1. Importe o hook useAuth (ajuste o caminho se necessário)
import { useAuth } from '../../context/AuthContext';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 2. Pegue o objeto 'user' diretamente do contexto
  const { user } = useAuth(); 

  useEffect(() => {
    // Se user for null (não logado), paramos aqui
    if (!user) {
        setLoading(false);
        return;
    }

    // Assumindo que seu objeto user tem um campo 'id'. 
    // Se no login você salvou como 'userId', troque user.id por user.userId
    const currentUserId = user.id; 

    fetch('https://undeprecating-randell-periproctic.ngrok-free.dev/api/pedidos')
      .then(response => response.json())
      .then(data => {
        // Filtra usando o ID vindo do Contexto
        const userOrders = data.filter(order => 
            order.user_id === currentUserId || order.userId === currentUserId
        );
        
        const sortedOrders = userOrders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        
        setOrders(sortedOrders);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erro ao buscar histórico:", error);
        setLoading(false);
      });
  }, [user]); // 3. A dependência agora é o objeto 'user'

  if (loading) {
    return <div className="history-page container"><h2>Carregando histórico...</h2></div>;
  }

  // Validação pelo objeto user
  if (!user) {
      return <div className="history-page container"><h2>Você precisa estar logado para ver seus pedidos.</h2></div>;
  }

  return (
    <div className="history-page container">
      {/* O restante do seu JSX permanece igual... */}
      <div className="history-header">
        <h1>Meus Pedidos</h1>
        <p>{orders.length} pedidos encontrados</p>
      </div>

      {orders.length > 0 ? (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div>
                    <h3>Pedido #{order.id}</h3>
                    <span className="order-date">
                        {new Date(order.created_at || Date.now()).toLocaleDateString('pt-BR')}
                    </span>
                </div>
                <div className="order-status-price">
                    <span className={`status-badge ${order.status?.toLowerCase()}`}>
                        {order.status || 'Processando'}
                    </span>
                    <span className="total-price">
                        R$ {parseFloat(order.total).toFixed(2).replace('.', ',')}
                    </span>
                </div>
              </div>

              <hr />

              <div className="order-items">
                <h4>Itens do pedido:</h4>
                <ul>
                  {order.itens && order.itens.map((item, index) => (
                    <li key={index} className="order-item">
                        <img 
                            src={item.image || 'https://via.placeholder.com/50'} 
                            alt={item.name} 
                            className="item-thumb"
                        />
                        <div className="item-details">
                            <span className="item-name">{item.name}</span>
                            <span className="item-qtd">Qtd: {item.quantity}</span>
                            <span className="item-price">R$ {parseFloat(item.price).toFixed(2)}</span>
                        </div>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="empty-history">
          <h2>Você ainda não fez nenhum pedido.</h2>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;