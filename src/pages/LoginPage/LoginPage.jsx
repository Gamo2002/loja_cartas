import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Mail, ArrowRight } from 'lucide-react';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  
  // Estado para guardar o que o usuário digita
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // Atualiza o estado quando o usuário digita
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Define qual URL chamar (Login ou Cadastro)
    const endpoint = isLogin ? '/auth/login' : '/auth/register';
    
    // Prepara os dados para enviar
    // Nota: O backend espera 'nome', 'email', 'senha'. O front tem 'name', 'password'.
    // Vamos mapear aqui:
    const payload = {
      email: formData.email,
      senha: formData.password,
      ...( !isLogin && { nome: formData.name }) // Só envia nome se for cadastro
    };

    try {
      const response = await fetch(`https://undeprecating-randell-periproctic.ngrok-free.dev${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message); // Ex: "Usuário criado!" ou "Login realizado!"
        
        // Se criou conta, muda para a tela de login. Se logou, vai para Home.
        if (!isLogin) {
          setIsLogin(true); 
        } else {
          navigate('/');
        }
      } else {
        // Mostra o erro que veio do backend (Ex: "Senha incorreta")
        alert(data.error || "Ocorreu um erro.");
      }

    } catch (error) {
      console.error("Erro de conexão:", error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        
        <div className="login-header">
          <h2>{isLogin ? 'Bem-vindo de volta!' : 'Crie sua conta'}</h2>
          <p>{isLogin ? 'Acesse sua conta' : 'Preencha seus dados para começar'}</p>
        </div>

        <form onSubmit={handleSubmit}>
          
          {/* Nome (Só no cadastro) */}
          {!isLogin && (
            <div className="input-group">
              <User size={20} className="input-icon" />
              <input 
                type="text" 
                name="name"
                placeholder="Seu Nome Completo" 
                value={formData.name}
                onChange={handleChange}
                required 
              />
            </div>
          )}

          <div className="input-group">
            <Mail size={20} className="input-icon" />
            <input 
              type="email" 
              name="email"
              placeholder="Seu E-mail" 
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="input-group">
            <Lock size={20} className="input-icon" />
            <input 
              type="password" 
              name="password"
              placeholder="Sua Senha" 
              value={formData.password}
              onChange={handleChange}
              required 
            />
          </div>

          <button type="submit" className="login-btn">
            {isLogin ? 'ENTRAR' : 'CADASTRAR'}
            <ArrowRight size={20} />
          </button>

        </form>

        <div className="toggle-auth">
          <p>
            {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
            <button 
              className="toggle-btn" 
              onClick={() => {
                setIsLogin(!isLogin);
                setFormData({ name: '', email: '', password: '' }); // Limpa form ao trocar
              }}
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