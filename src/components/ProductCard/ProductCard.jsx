import React from 'react';
import './ProductCard.css';
import { useNavigate } from 'react-router-dom';

// Agora recebemos 'description' em vez de 'type'
const ProductCard = ({ id, image, name, price, description }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/produto/${id}`);
  };

  // Lógica Inteligente:
  // Verifica se a palavra "Foil" ou "Lendário" existe dentro da descrição
  // Se existir, definimos isso como o tipo para mostrar na etiqueta.
  let badgeText = null;
  
  if (description) {
    const descLower = description.toLowerCase();
    if (descLower.includes('foil')) badgeText = 'FOIL';
    else if (descLower.includes('lendário') || descLower.includes('lendario')) badgeText = 'LENDÁRIO';
    else if (descLower.includes('rare') || descLower.includes('rara')) badgeText = 'RARA';
  }

  return (
    <div className="product-card" onClick={handleClick}>
      
      {/* Só mostra a etiqueta se a nossa lógica encontrou uma palavra chave */}
      {badgeText && <span className="card-badge">{badgeText}</span>}
      
      <img src={image} alt={name} className="card-image" />
      
      <div className="card-info">
        <h3 className="card-name">{name}</h3>
        <p className="card-price">R$ {price}</p>
        <button className="buy-btn">Comprar</button>
      </div>
    </div>
  );
};

export default ProductCard;