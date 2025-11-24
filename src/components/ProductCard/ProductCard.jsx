import React from 'react';
import './ProductCard.css'; // Importa o CSS do card, não da página
import { useNavigate } from 'react-router-dom';

// Recebe 'description' para gerar a etiqueta
const ProductCard = ({ id, image, name, price, description }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/produto/${id}`);
  };

  // Lógica para detectar se é FOIL/Lendário baseado na descrição
  let badgeText = null;
  if (description) {
    const descLower = description.toLowerCase();
    if (descLower.includes('foil')) badgeText = 'FOIL';
    else if (descLower.includes('lendário') || descLower.includes('lendario')) badgeText = 'LENDÁRIO';
    else if (descLower.includes('rare') || descLower.includes('rara')) badgeText = 'RARA';
  }

  return (
    <div className="product-card" onClick={handleClick}>
      {/* Etiqueta condicional */}
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