import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { Search, MapPin, User, Heart, ShoppingCart } from 'lucide-react';

const Header = () => {
  return (
    <header className="header">
      <div className="header-top">
        <div className="container">
          
          {/* 1. Logo (Simulado com texto por enquanto) */}
          <div className="logo">
            <Link to="/" className="logo-link">
              <h1>CENTRO<span className="logo-highlight">CARTAS</span></h1>
            </Link>
          </div>

          {/* 2. Barra de Busca */}
          <div className="search-bar">
            <input type="text" placeholder="O que você procura?" />
            <button><Search size={20} color="#0af4aaff" /></button>
          </div>

          {/* 3. Ações (CEP, Login, Favoritos, Carrinho) */}
          <div className="actions">
            <div className="action-item hide-mobile">
              <MapPin size={20} />
              <span>Informe seu CEP</span>
            </div>
            
            <div className="action-item">
              <User size={20} />
              <div className="user-info hide-mobile">
                <span>Entre ou cadastre-se</span>
                <strong>Meus pedidos</strong>
              </div>
            </div>

            <div className="icon-btn">
              <ShoppingCart size={24} />
            </div>
          </div>

        </div>
      </div>

      {/* Parte Inferior Branca (Menu) */}
      <nav className="header-nav">
        <div className="container">
          <ul>
            <li><a href="#pokemon">Pokémon</a></li>
            <li><a href="#magic">Magic: The Gathering</a></li>
            <li><a href="#onepiece">One Piece</a></li>
            <li><a href="#yugioh">Yu-Gi-Oh!</a></li>
            <li><a href="#acessorios">Acessórios</a></li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;