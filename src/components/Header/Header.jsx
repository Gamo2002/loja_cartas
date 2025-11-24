import React, { useState } from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, User, Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const Header = () => {
  const { cartItems } = useCart();
  const [searchTerm, setSearchTerm] = useState(""); // Guarda o texto
  const navigate = useNavigate(); // Função para mudar de página

  const handleSearch = (e) => {
    e.preventDefault(); // Evita que a página recarregue
    if (searchTerm.trim()) {
      navigate(`/busca?q=${searchTerm}`); // Manda para a página de busca
      setSearchTerm(""); // Limpa o campo depois de buscar
    }
  };

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
          <form className="search-bar" onSubmit={handleSearch}>
            <input 
              type="text" 
              placeholder="O que você procura?" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o estado enquanto digita
            />
            <button type="submit">
                <Search size={20} color="#0af4aaff" />
            </button>
          </form>

          {/* 3. Ações (CEP, Login, Favoritos, Carrinho) */}
          <div className="actions">
                        
            <Link to="/login" className="action-item" style={{textDecoration: 'none', color: 'inherit'}}>
              <User size={20} />
              <div className="user-info hide-mobile">
                <span>Entre ou cadastre-se</span>
                <strong>Meus pedidos</strong>
              </div>
            </Link>

            
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