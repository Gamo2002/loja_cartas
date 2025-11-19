import React from 'react';
import Header from './components/Header/Header';
import ProductSection from './components/ProductSection/ProductSection';
import ProductCard from './components/ProductCard/ProductCard';
import Footer from './components/Footer/Footer';

function App() {
  // Dados simulados (depois virão do Banco de Dados)
  const pokemonCards = [
    { id: 1, name: 'Charizard VMAX', price: '299,90', image: 'https://assets.pokemon.com/assets/cms2/img/cards/web/SWSH45/SWSH45_EN_SV107.png', type: 'Foil' },
    { id: 2, name: 'Pikachu V', price: '49,90', image: 'https://assets.pokemon.com/assets/cms2/img/cards/web/SWSH4/SWSH4_EN_43.png', type: 'Normal' },
    { id: 3, name: 'Mewtwo GX', price: '89,00', image: 'https://assets.pokemon.com/assets/cms2/img/cards/web/SM11/SM11_EN_79.png', type: 'Rare' },
    { id: 4, name: 'Evee Heroes', price: '12,50', image: 'https://assets.pokemon.com/assets/cms2/img/cards/web/SWSH7/SWSH7_EN_126.png', type: 'Normal' },
    { id: 5, name: 'Gengar VMAX', price: '150,00', image: 'https://assets.pokemon.com/assets/cms2/img/cards/web/SWSH8/SWSH8_EN_157.png', type: 'Foil' },
  ];

  const magicCards = [
    { id: 1, name: 'Black Lotus', price: '50.000,00', image: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=600&type=card', type: 'Lendário' },
    { id: 2, name: 'Sol Ring', price: '15,00', image: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=405&type=card', type: 'Comum' },
    { id: 3, name: 'Mana Vault', price: '300,00', image: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=382994&type=card', type: 'Rara' },
  ];

  const yugiohCards = [
    { id: 1, name: 'Black Lotus', price: '50.000,00', image: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=600&type=card', type: 'Lendário' },
    { id: 2, name: 'Sol Ring', price: '15,00', image: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=405&type=card', type: 'Comum' },
    { id: 3, name: 'Mana Vault', price: '300,00', image: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=382994&type=card', type: 'Rara' },
  ];

  const onepieceCards = [
    { id: 1, name: 'Black Lotus', price: '50.000,00', image: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=600&type=card', type: 'Lendário' },
    { id: 2, name: 'Sol Ring', price: '15,00', image: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=405&type=card', type: 'Comum' },
    { id: 3, name: 'Mana Vault', price: '300,00', image: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=382994&type=card', type: 'Rara' },
  ];

  const acessoriosTCG = [
    { id: 1, name: 'Black Lotus', price: '50.000,00', image: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=600&type=card', type: 'Lendário' },
    { id: 2, name: 'Sol Ring', price: '15,00', image: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=405&type=card', type: 'Comum' },
    { id: 3, name: 'Mana Vault', price: '300,00', image: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=382994&type=card', type: 'Rara' },
  ];


  return (
    <div>
      <Header />
      
      <main>
        {/* Seção Pokémon (Note o ID igual ao link do header) */}
        <ProductSection id="pokemon" title="Pokémon TCG">
          {pokemonCards.map(card => (
            <ProductCard 
              key={card.id}
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
              name={card.name}
              price={card.price}
              image={card.image}
              type={card.type}
            />
          ))}
        </ProductSection>

        {/* Seção Vazia só para testar o scroll */}
        <ProductSection id="yugioh" title="Yu-Gi-Oh!">
           {yugiohCards.map(card => (
            <ProductCard 
              key={card.id}
              name={card.name}
              price={card.price}
              image={card.image}
              type={card.type}
            />
          ))}
        </ProductSection>

        <ProductSection id="onepiece" title="One Piece!">
           {onepieceCards.map(card => (
            <ProductCard 
              key={card.id}
              name={card.name}
              price={card.price}
              image={card.image}
              type={card.type}
            />
          ))}
        </ProductSection>

        <ProductSection id="acessorios" title="Acessórios">
           {acessoriosTCG.map(card => (
            <ProductCard 
              key={card.id}
              name={card.name}
              price={card.price}
              image={card.image}
              type={card.type}
            />
          ))}
        </ProductSection>

      </main>

      <Footer />

    </div>
  );
}

export default App;