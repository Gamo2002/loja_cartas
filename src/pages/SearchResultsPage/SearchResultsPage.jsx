import React from 'react';
import { useSearchParams } from 'react-router-dom'; // Hook para ler a URL (?q=...)
import { products } from '../../data/products';
import ProductCard from '../../components/ProductCard/ProductCard';
import '../CollectionPage/CollectionPage.css'; 

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q'); // Pega o que está escrito depois do q=

  // Lógica de Filtragem
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="collection-page container"> {/* Usando classes existentes */}
      <div className="collection-header">
        <h1>Resultados para: "{query}"</h1>
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
          <h2>Ops! Não encontramos nada com esse nome.</h2>
          <p>Tente buscar pelo nome do produto Exemplo:"Charizard".</p>
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;