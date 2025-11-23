import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, Mail, ArrowRight } from 'lucide-react';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true); // Controla se é Login ou Cadastro

  const handleSubmit = (e) => {
    e.preventDefault();
    // AQUI VAI ENTRAR A CONEXÃO COM O BANCO DE DADOS FUTURAMENTE
    // Por enquanto, apenas simulamos e mandamos para a Home
    alert(isLogin ? "Login realizado com sucesso!" : "Conta criada com sucesso!");
    navigate('/');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        
        {/* Cabeçalho do Form */}
        <div className="login-header">
          <h2>{isLogin ? 'Bem-vindo de volta!' : 'Crie sua conta'}</h2>
          <p>
            {isLogin 
              ? 'Acesse sua conta para ver seus pedidos' 
              : 'Preencha seus dados para começar'}
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit}>
          
          {/* Nome (Só aparece no Cadastro) */}
          {!isLogin && (
            <div className="input-group">
              <User size={20} className="input-icon" />
              <input type="text" placeholder="Seu Nome Completo" required />
            </div>
          )}

          <div className="input-group">
            <Mail size={20} className="input-icon" />
            <input type="email" placeholder="Seu E-mail" required />
          </div>

          <div className="input-group">
            <Lock size={20} className="input-icon" />
            <input type="password" placeholder="Sua Senha" required />
          </div>

          {/* Botão de Ação */}
          <button type="submit" className="login-btn">
            {isLogin ? 'ENTRAR' : 'CADASTRAR'}
            <ArrowRight size={20} />
          </button>

        </form>

        {/* Alternador Login/Cadastro */}
        <div className="toggle-auth">
          <p>
            {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
            <button 
              className="toggle-btn" 
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Cadastre-se' : 'Faça Login'}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;