import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { Search, MapPin, User, Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const Header = () => {
  const { cartItems } = useCart();
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
                        
            <div className="action-item">
              <User size={20} />
              <div className="user-info hide-mobile">
                <span>Entre ou cadastre-se</span>
                <strong>Meus pedidos</strong>
              </div>
            </div>

            
              <Link to="/carrinho" className="icon-btn" style={{textDecoration: 'none', color: 'inherit', position: 'relative'}}>
                  <ShoppingCart size={24} />
                     {cartItems.length > 0 && (
                      <span style={{
                        position: 'absolute', 
                        top: -8, 
                        right: -8, 
                        background: '#cc0000', 
                        color: 'white', 
                        borderRadius: '50%', 
                        width: '18px', 
                        height: '18px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        fontSize: '10px',
                        fontWeight: 'bold'
                        }}>
                          {cartItems.length}
                        </span>
                      )}
              </Link>
          </div>

        </div>
      </div>

      {/* Parte Inferior Branca (Menu) */}
      <nav className="header-nav">
        <div className="container">
          <ul>
            <li>
                <Link to="/colecao/pokemon">Pokémon</Link>
                </li>
                <li>
                <Link to="/colecao/magic">Magic: The Gathering</Link>
                </li>
                <li>
                <Link to="/colecao/onepiece">One Piece</Link>
                </li>
                <li>
                <Link to="/colecao/yugioh">Yu-Gi-Oh!</Link>
                </li>
                <li>
                <Link to="/colecao/acessoriosTCG">Acessórios</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;