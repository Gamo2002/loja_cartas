import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Mail, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext'; // Importando o contexto
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Pegando a função de login do contexto
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
        alert(data.message); 
        
        // Lógica de Sucesso
        if (!isLogin) {
          // Se acabou de criar conta, muda para a tela de login
          setIsLogin(true); 
        } else {
          // SE FEZ LOGIN:
          // 1. Prepara os dados do usuário. Se o backend não mandar o objeto 'user', criamos um temporário com o email.
          const userData = data.user || { name: formData.email.split('@')[0], email: formData.email };
          
          // 2. Salva no contexto global (Isso atualiza o Header)
          login(userData);
          
          // 3. Redireciona para a Home
          navigate('/');
        }
      } else {
        // Mostra o erro que veio do backend
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
          
          {/* Nome (Só aparece no cadastro) */}
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