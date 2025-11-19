import React from 'react';
import './ProductSection.css';

// Recebe um ID (para o link funcionar), um Titulo e os Filhos (Cards)
const ProductSection = ({ id, title, children }) => {
  return (
    <section id={id} className="product-section">
      <div className="container">
        <h2 className="section-title">{title}</h2>
        
        {/* Área de Scroll Horizontal */}
        <div className="products-grid">
          {children}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;