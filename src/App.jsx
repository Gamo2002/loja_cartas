import React from 'react';
import Header from './components/Header/Header';

function App() {
  return (
    <div>
      <Header />
      
      <main style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2>Bem-vindo à Loja de Cartas</h2>
        <p>Aqui ficarão os produtos...</p>
      </main>
    </div>
  );
}

export default App;