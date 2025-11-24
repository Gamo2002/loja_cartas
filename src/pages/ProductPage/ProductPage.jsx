import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import { ShoppingCart, CreditCard, Package } from 'lucide-react'; // Importei o ícone Package
import './ProductPage.css';
import { useCart } from '../../context/CartContext';

const ProductPage = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch('/api/produtos')
      .then(response => response.json())
      .then(data => {
        const foundProduct = data.find(p => p.id === parseInt(id));
        setProduct(foundProduct);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erro:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="container" style={{padding:'50px'}}><h2>Carregando...</h2></div>;
  if (!product) return <div className="container" style={{padding:'50px'}}><h2>Produto não encontrado!</h2></div>;

  let detectedType = "Padrão";
  if (product.description) {
    const desc = product.description.toLowerCase();
    if (desc.includes('foil')) detectedType = "FOIL";
    else if (desc.includes('lendário')) detectedType = "Lendário";
    else if (desc.includes('rare')) detectedType = "Rara";
  }

  // Verifica se tem estoque (se stock for null ou undefined, assume 0)
  const estoqueAtual = product.stock || 0;
  const isEsgotado = estoqueAtual === 0;

  return (
    <div className="product-page container">
      <div className="product-detail-container">
        
        <div className="product-image-section">
          <div className="main-image-box">
            <img src={product.image} alt={product.name} className={isEsgotado ? 'grayscale' : ''} />
            {isEsgotado && <div className="esgotado-overlay">ESGOTADO</div>}
          </div>
        </div>

        <div className="product-info-section">
          <h1 className="product-title">{product.name}</h1>
          
          <p className="product-collection">
            Coleção {product.category ? product.category.toUpperCase() : ''} | {detectedType}
          </p>

          <div className="price-box">
            <span className="currency">R$</span>
            <span className="value">{product.price}</span>
            <p className="payment-info"><CreditCard size={16} /> Cartão ou Pix</p>
          </div>

          {/* MOSTRAR O ESTOQUE AQUI */}
          <div className="stock-info" style={{ margin: '15px 0', color: '#666', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Package size={18} />
            {isEsgotado ? (
              <span style={{ color: 'red', fontWeight: 'bold' }}>Produto Indisponível</span>
            ) : (
              <span>Estoque disponível: <strong>{estoqueAtual}</strong> unidades</span>
            )}
          </div>

          <div className="purchase-actions">
            {/* Seletor de Quantidade Inteligente */}
            <div className="quantity-selector" style={isEsgotado ? {opacity: 0.5, pointerEvents: 'none'} : {}}>
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
              
              <span>{quantity}</span>
              
              {/* O botão + trava se tentar passar do estoque */}
              <button onClick={() => setQuantity(q => Math.min(estoqueAtual, q + 1))}>+</button>
            </div>
            
            <button 
              className="btn-buy" 
              disabled={isEsgotado} // Desabilita o botão se não tiver estoque
              style={isEsgotado ? { backgroundColor: '#ccc', cursor: 'not-allowed' } : {}}
              onClick={() => {
                addToCart(product, quantity);
                alert("Adicionado!");
              }}
            >
              <ShoppingCart size={20} /> 
              {isEsgotado ? 'INDISPONÍVEL' : 'COMPRAR AGORA'}
            </button>
          </div>

          <div className="product-description">
            <h3>Descrição</h3>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;