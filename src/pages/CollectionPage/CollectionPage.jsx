import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// ❌ O import estático foi removido: import { products } from '../../data/products';
import ProductCard from '../../components/ProductCard/ProductCard';
import './CollectionPage.css';

const CollectionPage = () => {
  const { category } = useParams(); 
  
  // 1. Estado para armazenar os produtos que vêm do banco
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Para mostrar "Carregando..."

  // 2. Busca os dados no Backend assim que a página abre
  useEffect(() => {
    fetch('https://undeprecating-randell-periproctic.ngrok-free.dev/api/produtos') // ⚠️ Verifique se a porta é 3000 ou outra
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erro ao buscar produtos:", error);
        setLoading(false);
      });
  }, []); // O array vazio [] garante que isso rode apenas uma vez ao abrir a página

  // 3. A lógica de filtro continua igual (filtra o que veio do banco)
  // Lógica de Filtro Aprimorada
  const filteredProducts = products.filter(p => {
    // Se o produto não tiver categoria, ignora
    if (!p.category) return false;

    // Limpa a categoria do BANCO (tira traços e põe minúsculo)
    // Ex: "Yu-Gi-Oh" vira "yugioh"
    const catBanco = p.category.toString().toLowerCase().replace(/-/g, '');

    // Limpa a categoria da URL (tira traços e põe minúsculo)
    // Ex: "yu-gi-oh" vira "yugioh"
    const catURL = category.toString().toLowerCase().replace(/-/g, '');

    if (catURL.includes('acessorio') && catBanco.includes('acessorio')) {
    return true;
    }
    
    return catBanco === catURL;
  });

  const pageTitles = {
    'pokemon': 'Pokémon TCG',
    'magic': 'Magic: The Gathering',
    'yu-gi-oh': 'Yu-Gi-Oh!',
    'onepiece': 'One Piece Card Game',
    'acessorio': 'Acessórios e Sleeves' // Ajustei para bater com o banco se necessário
  };

  if (loading) {
    return <div className="collection-page container"><h2>Carregando cartas...</h2></div>;
  }

  return (
    <div className="collection-page container">
      <div className="collection-header">
        <h1>{pageTitles[category] || category.toUpperCase()}</h1>
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
              // type={product.type} -> REMOVIDO pois agora está na descrição
              description={product.description} // Passando a descrição para o Card
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