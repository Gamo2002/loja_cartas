import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importando os Contextos
import { CartProvider } from './context/CartContext'; // O que você acabou de mandar
import { AuthProvider } from './context/AuthContext'; // O que criamos para o Login

// Componentes
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import ProductPage from './pages/ProductPage/ProductPage';
import CartPage from './pages/CartPage/CartPage'; 
import CollectionPage from './pages/CollectionPage/CollectionPage';
import SearchResultsPage from './pages/SearchResultsPage/SearchResultsPage';
import LoginPage from './pages/LoginPage/LoginPage';


function App() {
  return (
    // 1. AuthProvider envolve tudo (para saber quem é o usuário)
    <AuthProvider> 
      
      {/* 2. CartProvider vem dentro (para gerenciar o carrinho) */}
      <CartProvider>
        
        <BrowserRouter>
          <Header /> {/* O Header vai usar dados dos DOIS contextos */}
          
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/produto/:id" element={<ProductPage />} />
              <Route path="/carrinho" element={<CartPage />} />
              <Route path="/colecao/:category" element={<CollectionPage />} />
              <Route path="/busca" element={<SearchResultsPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </main>

          <Footer />
        </BrowserRouter>

      </CartProvider>
    </AuthProvider>
  );
}

export default App;