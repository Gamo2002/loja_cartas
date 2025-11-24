import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import '../CollectionPage/CollectionPage.css'; 

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || ''; // Pega o texto da busca (ou vazio se não tiver nada)
  
  // Estado para guardar os resultados filtrados
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ao iniciar (ou mudar a busca), busca no banco
    setLoading(true);
    
    fetch('/api/produtos')
      .then(response => response.json())
      .then(data => {
        // Assim que os dados chegam, aplicamos o filtro
        if (!query) {
          setFilteredProducts([]);
        } else {
          const results = data.filter(product => 
            product.name.toLowerCase().includes(query.toLowerCase())
          );
          setFilteredProducts(results);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error("Erro ao buscar produtos:", error);
        setLoading(false);
      });
  }, [query]); // Esse array [query] faz a busca rodar de novo se o usuário digitar outra coisa

  if (loading) {
    return <div className="collection-page container" style={{marginTop: '50px'}}><h2>Buscando...</h2></div>;
  }

  return (
    <div className="collection-page container">
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
              // Atualizado para usar description (que contém o Foil/Lendário)
              description={product.description}
            />
          ))}
        </div>
      ) : (
        <div className="empty-category">
          <h2>Ops! Não encontramos nada com esse nome.</h2>
          <p>Tente buscar pelo nome do produto Exemplo: "Charizard".</p>
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;