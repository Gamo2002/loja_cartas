import React, { useState, useEffect } from 'react';
import ProductSection from '../../components/ProductSection/ProductSection';
import ProductCard from '../../components/ProductCard/ProductCard';

const Home = () => {
  // 1. Estado para guardar as cartas que vêm do banco
  const [products, setProducts] = useState([]);

  // 2. Busca os dados no servidor ao carregar a página
  useEffect(() => {
    fetch('/api/produtos')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Erro ao carregar Home:", err));
  }, []);

  // 3. Filtros (Agora operando sobre os dados do banco)
  // Nota: Verifiquei seu JSON anterior, no banco está "yu-gi-oh" (com traço) e "pokemon" (minúsculo)
  
  const pokemonCards = products.filter(p => p.category === 'pokemon');
  
  const magicCards = products.filter(p => p.category === 'magic');
  
  // Aqui aceita com ou sem traço para garantir
  const yugiohCards = products.filter(p => p.category === 'yu-gi-oh' || p.category === 'yugioh');
  
  // Ajuste para pegar 'Acessorio' (enum) ou 'acessorios' (se convertido)
  const acessoriosCards = products.filter(p => 
    p.category && p.category.toLowerCase().includes('acessorio')
  );

  return (
    <div>
        {/* Seção Pokémon */}
        {pokemonCards.length > 0 && (
          <ProductSection id="pokemon" title="Pokémon TCG">
            {pokemonCards.map(card => (
              <ProductCard 
                key={card.id}
                id={card.id}
                name={card.name}
                price={card.price}
                image={card.image}
                // Mudamos de 'type' para 'description' para a etiqueta funcionar
                description={card.description} 
              />
            ))}
          </ProductSection>
        )}

        {/* Seção Magic */}
        {magicCards.length > 0 && (
          <ProductSection id="magic" title="Magic: The Gathering">
            {magicCards.map(card => (
              <ProductCard 
                key={card.id}
                id={card.id}
                name={card.name}
                price={card.price}
                image={card.image}
                description={card.description}
              />
            ))}
          </ProductSection>
        )}

        {/* Seção Yu-Gi-Oh */}
        {yugiohCards.length > 0 && (
          <ProductSection id="yugioh" title="Yu-Gi-Oh!">
             {yugiohCards.map(card => (
              <ProductCard 
                key={card.id}
                id={card.id}
                name={card.name}
                price={card.price}
                image={card.image}
                description={card.description}
              />
            ))}
          </ProductSection>
        )}

        {/* Seção Acessórios */}
        {acessoriosCards.length > 0 && (
          <ProductSection id="acessorios" title="Acessórios">
             {acessoriosCards.map(card => (
              <ProductCard 
                key={card.id}
                id={card.id}
                name={card.name}
                price={card.price}
                image={card.image}
                description={card.description}
              />
            ))}
          </ProductSection>
        )}
    </div>
  );
};

export default Home;