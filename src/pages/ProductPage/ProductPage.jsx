import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Importar useParams para ler a URL
import { products } from '../../data/products'; // Importar o banco de dados
import { ShoppingCart, CreditCard, Truck } from 'lucide-react';
import './ProductPage.css';

const ProductPage = () => {
  const { id } = useParams(); // Pega o número lá da URL (ex: 1, 5, 12)
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);

  // Quando a tela carrega, procura o produto certo
  useEffect(() => {
    // O id da URL vem como texto ("1"), precisamos comparar com número
    const foundProduct = products.find(p => p.id === parseInt(id));
    setProduct(foundProduct);
  }, [id]);

  // Se não achar o produto (ou estiver carregando)
  if (!product) {
    return <div className="container" style={{padding: '50px'}}><h2>Produto não encontrado!</h2></div>;
  }

  return (
    <div className="product-page container">
      <div className="breadcrumbs">
      </div>

      <div className="product-detail-container">
        
        <div className="product-image-section">
          <div className="main-image-box">
            <img src={product.image} alt={product.name} />
          </div>
        </div>

        <div className="product-info-section">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-collection">Coleção Especial | {product.type}</p>

          <div className="price-box">
            <span className="currency">R$</span>
            <span className="value">{product.price}</span>
             {/* Lógica simples para parcelamento só visual */}
            <p className="payment-info">
              <CreditCard size={16} /> Cartão de Crédito ou Pix
            </p>
          </div>

          <div className="purchase-actions">
            <div className="quantity-selector">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>
            
            <button className="btn-buy">
              <ShoppingCart size={20} />
              COMPRAR AGORA
            </button>
          </div>

          <div className="product-description">
            <h3>Descrição do Produto</h3>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;