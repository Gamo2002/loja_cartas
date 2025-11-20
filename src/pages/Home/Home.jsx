// src/pages/Home/Home.jsx
import React from 'react';
// Atenção aos dois pontos (../..) para voltar pastas
import ProductSection from '../../components/ProductSection/ProductSection';
import ProductCard from '../../components/ProductCard/ProductCard';

const Home = () => {
  // SEUS DADOS (Copiei exatamente do seu código)
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
    { id: 1, name: 'Mago Negro', price: '50,00', image: 'https://ms.yugipedia.com//thumb/8/8a/DarkMagician-TF04-JP-VG.jpg/411px-DarkMagician-TF04-JP-VG.jpg', type: 'Lendário' },
    { id: 2, name: 'Dragão Branco', price: '150,00', image: 'https://ms.yugipedia.com//thumb/2/2e/BlueEyesWhiteDragon-TF04-JP-VG.jpg/411px-BlueEyesWhiteDragon-TF04-JP-VG.jpg', type: 'Comum' },
    { id: 3, name: 'Exodia', price: '300,00', image: 'https://ms.yugipedia.com//thumb/7/7b/ExodiatheForbiddenOne-TF04-JP-VG.jpg/411px-ExodiatheForbiddenOne-TF04-JP-VG.jpg', type: 'Rara' },
  ];

  const onepieceCards = [
    { id: 1, name: 'Luffy Gear 5', price: '500,00', image: 'https://m.media-amazon.com/images/I/71n8-i-vUjL._AC_UF894,1000_QL80_.jpg', type: 'Lendário' },
    { id: 2, name: 'Zoro', price: '15,00', image: 'https://http2.mlstatic.com/D_NQ_NP_833289-MLB72214338931_102023-O.webp', type: 'Comum' },
    { id: 3, name: 'Nami', price: '300,00', image: 'https://http2.mlstatic.com/D_NQ_NP_622859-MLB71269818309_082023-O.webp', type: 'Rara' },
  ];

  const acessoriosTCG = [
    { id: 1, name: 'Sleeves', price: '25,00', image: 'https://m.media-amazon.com/images/I/61qK1qqM4NL._AC_UF894,1000_QL80_.jpg', type: 'Comum' },
    { id: 2, name: 'Deck Box', price: '15,00', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcCC70n0VDrZ1F-gZz_kFhK_h4vWJ5eT5wIg&s', type: 'Comum' },
    { id: 3, name: 'Playmat', price: '300,00', image: 'https://down-br.img.susercontent.com/file/br-11134207-7r98o-lqj5q5o5q5o52e', type: 'Rara' },
  ];

  return (
    <div>
        {/* Seção Pokémon */}
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

        {/* Seção Yu-Gi-Oh */}
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

        {/* Seção One Piece */}
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

        {/* Seção Acessórios */}
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
    </div>
  );
};

export default Home;