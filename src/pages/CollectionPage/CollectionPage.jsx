import React from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../../data/products';
import ProductCard from '../../components/ProductCard/ProductCard';
import './CollectionPage.css';

const CollectionPage = () => {
  const { category } = useParams(); // Pega o nome da URL (ex: 'pokemon', 'magic')

  // Filtra os produtos baseados na categoria da URL
  const filteredProducts = products.filter(p => p.category === category);

  // Um dicionário simples para deixar o título bonito na tela
  const pageTitles = {
    'pokemon': 'Pokémon TCG',
    'magic': 'Magic: The Gathering',
    'yugioh': 'Yu-Gi-Oh!',
    'onepiece': 'One Piece Card Game',
    'acessorios': 'Acessórios e Sleeves'
  };

  return (
    <div className="collection-page container">
      <div className="collection-header">
        {/* Se o título existir no dicionário, usa ele. Se não, usa o da URL mesmo */}
        <h1>{pageTitles[category] || category}</h1>
        <p>{filteredProducts.length} produtos encontrados</p>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="collection-grid">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              type={product.type}
            />
          ))}
        </div>
      ) : (
        <div className="empty-category">
          <h2>Nenhum produto encontrado nesta categoria</h2>
        </div>
      )}
    </div>
  );
};

export default CollectionPage;