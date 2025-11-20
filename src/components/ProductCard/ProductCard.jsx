import React from 'react';
import './ProductCard.css';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ id, image, name, price, type }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/produto/${id}`);
  };

  return (
    <div className="product-card" onClick={handleClick}>
      {/* Tagzinha de tipo (Foil, Normal, etc) */}
      {type && <span className="card-badge">{type}</span>}
      
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