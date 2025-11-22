// src/pages/Home/Home.jsx
import React from 'react';
// Atenção aos dois pontos (../..) para voltar pastas
import ProductSection from '../../components/ProductSection/ProductSection';
import ProductCard from '../../components/ProductCard/ProductCard';
import { products } from '../../data/products';

const Home = () => {
  // SEUS DADOS (Copiei exatamente do seu código)
  const pokemonCards = products.filter(p => p.category === 'pokemon');
  const magicCards = products.filter(p => p.category === 'magic');
  const yugiohCards = products.filter(p => p.category === 'yugioh');
  const onepieceCards = products.filter(p => p.category === 'onepiece');
  const acessoriosTCG = products.filter(p => p.category === 'acessoriosTCG');

  return (
    <div>
        {/* Seção Pokémon */}
        <ProductSection id="pokemon" title="Pokémon TCG">
          {pokemonCards.map(card => (
            <ProductCard 
              key={card.id}
              id={card.id}
              name={card.name}
              price={card.price}
              image={card.image}
              type={card.type}
            />
          ))}
        </ProductSection>

        {/* Seção Magic */}
        <ProductSection id="magic" title="Magic: The Gathering">
          {magicCards.map(card => (
            <ProductCard 
              key={card.id}
              id={card.id}
              name={card.name}
              price={card.price}
              image={card.image}
              type={card.type}
            />
          ))}
        </ProductSection>

        {/* Seção Yu-Gi-Oh */}
        <ProductSection id="yugioh" title="Yu-Gi-Oh!">
           {yugiohCards.map(card => (
            <ProductCard 
              key={card.id}
              id={card.id}
              name={card.name}
              price={card.price}
              image={card.image}
              type={card.type}
            />
          ))}
        </ProductSection>

        {/* Seção One Piece */}
        <ProductSection id="onepiece" title="One Piece!">
           {onepieceCards.map(card => (
            <ProductCard 
              key={card.id}
              id={card.id}
              name={card.name}
              price={card.price}
              image={card.image}
              type={card.type}
            />
          ))}
        </ProductSection>

        {/* Seção Acessórios */}
        <ProductSection id="acessorios" title="Acessórios">
           {acessoriosTCG.map(card => (
            <ProductCard 
              key={card.id}
              id={card.id}
              name={card.name}
              price={card.price}
              image={card.image}
              type={card.type}
            />
          ))}
        </ProductSection>
    </div>
  );
};

export default Home;