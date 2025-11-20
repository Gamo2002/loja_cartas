import React, { useState } from 'react';
import { ShoppingCart, CreditCard, Truck } from 'lucide-react';
import './ProductPage.css';

const ProductPage = () => {
  // Simulação de dados (depois virá do Banco de Dados via ID)
  const product = {
    name: "Charizard VMAX - Darkness Ablaze",
    price: 299.90,
    description: "Uma das cartas mais cobiçadas da coleção Darkness Ablaze. Esta carta VMAX possui acabamento Full Art texturizado e está em estado Near Mint (NM).",
    image: "https://assets.pokemon.com/assets/cms2/img/cards/web/SWSH3/SWSH3_EN_20.png",
    collection: "Sword & Shield: Darkness Ablaze",
    rarity: "Ultra Rare"
  };

  const [quantity, setQuantity] = useState(1);

  return (
    <div className="product-page container">
      {/* Caminho de Pão (Breadcrumbs) */}
      <div className="breadcrumbs">
        Home &gt; Pokémon &gt; <span>{product.name}</span>
      </div>

      <div className="product-detail-container">
        
        {/* Coluna da Esquerda: Imagem */}
        <div className="product-image-section">
          <div className="main-image-box">
            <img src={product.image} alt={product.name} />
          </div>
        </div>

        {/* Coluna da Direita: Informações */}
        <div className="product-info-section">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-collection">{product.collection} | {product.rarity}</p>

          <div className="price-box">
            <span className="currency">R$</span>
            <span className="value">{product.price.toFixed(2).replace('.', ',')}</span>
            <p className="payment-info">
              <CreditCard size={16} /> em até 3x de R$ {(product.price / 3).toFixed(2).replace('.', ',')} sem juros
            </p>
          </div>

          {/* Seletor de Quantidade e Botão */}
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

          {/* Simulador de Frete */}
          <div className="shipping-simulator">
            <p><Truck size={18} /> Calcule o frete:</p>
            <div className="shipping-input">
              <input type="text" placeholder="00000-000" />
              <button>OK</button>
            </div>
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