import React from 'react';
import './Footer.css';
import { Mail, Phone, MapPin } from 'lucide-react'; // Aproveitando os ícones que instalamos

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        
        {/* Coluna 1: Identidade */}
        <div className="footer-section">
          <h3>CENTRO<span className="logo-highlight">CARTAS</span></h3>
          <p>A sua loja especializada em TCGs. Pokémon, Magic, Yu-Gi-Oh! e muito mais.</p>
        </div>

        {/* Coluna 2: Contato */}
        <div className="footer-section">
          <h4>Fale Conosco</h4>
          <ul className="contact-list">
            <li>
              <Mail size={16} />
              <span>contato@centrocartas.com.br</span>
            </li>
            <li>
              <Phone size={16} />
              <span>(11) 99999-9999</span>
            </li>
            <li>
              <MapPin size={16} />
              <span>Rua das Cartas, 123 - São Paulo, SP</span>
            </li>
          </ul>
        </div>

        {/* Coluna 3: Informações */}
        <div className="footer-section">
          <h4>Institucional</h4>
          <ul>
            <li><a href="#">Sobre Nós</a></li>
            <li><a href="#">Política de Privacidade</a></li>
            <li><a href="#">Termos de Uso</a></li>
            <li><a href="#">Trocas e Devoluções</a></li>
          </ul>
        </div>

      </div>

      {/* Barra final de Copyright */}
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; 2025 Centro Cartas. Todos os direitos reservados.</p>
          <p className="cnpj">CNPJ: 00.000.000/0001-00</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;