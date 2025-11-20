import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Componentes Fixos (Header e Footer aparecem em TODAS as páginas)
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// As Páginas (O "Miolo" que muda)
import Home from './pages/Home/Home';
import ProductPage from './pages/ProductPage/ProductPage';

function App() {
  return (
    <BrowserRouter>
      <Header /> {/* Header fica fixo aqui em cima */}
      
      <main>
        <Routes>
          {/* Quando o link for só a barra (/), mostra a Home com suas cartas */}
          <Route path="/" element={<Home />} />

          {/* Quando o link for /produto, some a Home e aparece a tela de compra */}
          <Route path="/produto/:id" element={<ProductPage />} />
        </Routes>
      </main>

      <Footer /> {/* Footer fica fixo aqui embaixo */}
    </BrowserRouter>
  );
}

export default App;