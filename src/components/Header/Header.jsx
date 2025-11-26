import React, { useState } from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, ShoppingCart, LogOut } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/busca?q=${searchTerm}`);
      setSearchTerm("");
    }
  };

  const handleLogout = () => {
      logout();
      navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="container">
          
          <div className="logo">
            <Link to="/" className="logo-link">
              <h1>CENTRO<span className="logo-highlight">CARTAS</span></h1>
            </Link>
          </div>

          <form className="search-bar" onSubmit={handleSearch}>
            <input 
              type="text" 
              placeholder="O que você procura?" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">
                <Search size={20} color="#0af4aaff" />
            </button>
          </form>

          <div className="actions">
            
            {/* LÓGICA DO USUÁRIO */}
            {user ? (
                // --- USUÁRIO LOGADO ---
                <div className="action-item" style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <User size={20} />
                    <div className="user-info hide-mobile">
                        <span>Olá, {user.name || user.nome}</span>
                        
                        <div style={{display: 'flex', gap: '10px', fontSize: '0.85rem'}}>
                            {/* Link adicionado para o Histórico */}
                            <Link to="/historico" style={{textDecoration: 'none', color: 'inherit', fontWeight: 'bold'}}>
                                Meus Pedidos
                            </Link>
                            
                            <span>|</span>

                            <strong onClick={handleLogout} style={{cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', color: '#cc0000'}}>
                                Sair <LogOut size={12}/>
                            </strong>
                        </div>
                    </div>
                </div>
            ) : (
                // --- USUÁRIO DESLOGADO ---
                <Link to="/login" className="action-item" style={{textDecoration: 'none', color: 'inherit'}}>
                    <User size={20} />
                    <div className="user-info hide-mobile">
                        <span>Entre ou cadastre-se</span>
                        <strong>Minha Conta</strong>
                    </div>
                </Link>
            )}

            <Link to="/carrinho" className="icon-btn" style={{textDecoration: 'none', color: 'inherit', position: 'relative'}}>
                  <ShoppingCart size={24} />
                  {cartItems.length > 0 && (
                      <span style={{
                        position: 'absolute', top: -8, right: -8, background: '#cc0000', 
                        color: 'white', borderRadius: '50%', width: '18px', height: '18px', 
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '10px', fontWeight: 'bold'
                      }}>
                        {cartItems.length}
                      </span>
                  )}
            </Link>
          </div>

        </div>
      </div>

      <nav className="header-nav">
        <div className="container">
          <ul>
            <li><Link to="/colecao/pokemon">Pokémon</Link></li>
            <li><Link to="/colecao/magic">Magic: The Gathering</Link></li>
            <li><Link to="/colecao/yugioh">Yu-Gi-Oh!</Link></li>
            <li><Link to="/colecao/acessoriosTCG">Acessórios</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;