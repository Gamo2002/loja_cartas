import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

// Componentes Fixos (Header e Footer aparecem em TODAS as páginas)
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// As Páginas
import Home from './pages/Home/Home';
import ProductPage from './pages/ProductPage/ProductPage';
import CartPage from './pages/CartPage/CartPage'; 
import CollectionPage from './pages/CollectionPage/CollectionPage';

function App() {
  return (
    <CartProvider>
    <BrowserRouter>
      <Header /> {/* Header fica fixo aqui em cima */}
      
      <main>
        <Routes>
          {/* Quando o link for só a barra (/), mostra a Home com suas cartas */}
          <Route path="/" element={<Home />} />

          {/* Quando o link for /produto, some a Home e aparece a tela de compra */}
          <Route path="/produto/:id" element={<ProductPage />} />
          <Route path="/carrinho" element={<CartPage />} />
          <Route path="/colecao/:category" element={<CollectionPage />} />
        </Routes>
      </main>

      <Footer /> {/* Footer fica fixo aqui embaixo */}
    </BrowserRouter>
    </CartProvider>
  );
}

export default App;