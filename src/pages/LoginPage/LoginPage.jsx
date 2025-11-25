import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Mail, ArrowRight, MapPin, Home } from 'lucide-react'; // Adicionei ícones novos
import { useAuth } from '../../context/AuthContext';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false); // Para feedback visual

  // Estado expandido com endereço
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    cep: '',
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // --- FUNÇÃO EXTRA: BUSCAR CEP AUTOMATICAMENTE ---
  const checkCEP = async (e) => {
    const cep = e.target.value.replace(/\D/g, '');
    if (cep.length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await res.json();
        if (!data.erro) {
          setFormData(prev => ({
            ...prev,
            rua: data.logradouro,
            bairro: data.bairro,
            cidade: data.localidade,
            estado: data.uf
          }));
        }
      } catch (error) {
        console.error("Erro ao buscar CEP", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const endpoint = isLogin ? '/auth/login' : '/auth/register';
    
    // Prepara o payload. Se for cadastro, envia TUDO. Se for login, só email e senha.
    const payload = {
      email: formData.email,
      senha: formData.password,
      ...( !isLogin && { 
        nome: formData.name,
        cep: formData.cep,
        rua: formData.rua,
        numero: formData.numero,
        complemento: formData.complemento,
        bairro: formData.bairro,
        cidade: formData.cidade,
        estado: formData.estado
      })
    };

    try {
      // Nota: Mantenha sua URL do Ngrok ou localhost
      const response = await fetch(`https://undeprecating-randell-periproctic.ngrok-free.dev${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        // Se for Login, salva e redireciona
        if (isLogin) {
          localStorage.setItem('user', JSON.stringify(data.user));
          const userData = data.user || { name: formData.email.split('@')[0], email: formData.email };
          login(userData);
          navigate('/');
        } else {
          // Se for Cadastro, avisa e manda pro login
          alert("Conta criada com sucesso! Faça login para continuar.");
          setIsLogin(true);
          setFormData({ ...formData, password: '' }); // Limpa a senha por segurança
        }
      } else {
        alert(data.error || "Ocorreu um erro.");
      }

    } catch (error) {
      console.error("Erro de conexão:", error);
      alert("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className={`login-container ${!isLogin ? 'register-mode' : ''}`}>
        
        <div className="login-header">
          <h2>{isLogin ? 'Bem-vindo de volta!' : 'Crie sua conta'}</h2>
          <p>{isLogin ? 'Acesse sua conta' : 'Preencha seus dados para começar'}</p>
        </div>

        <form onSubmit={handleSubmit}>
          
          {/* === DADOS PESSOAIS === */}
          {!isLogin && (
            <div className="input-group">
              <User size={20} className="input-icon" />
              <input 
                type="text" name="name" placeholder="Nome Completo" 
                value={formData.name} onChange={handleChange} required 
              />
            </div>
          )}

          <div className="input-group">
            <Mail size={20} className="input-icon" />
            <input 
              type="email" name="email" placeholder="E-mail" 
              value={formData.email} onChange={handleChange} required 
            />
          </div>

          <div className="input-group">
            <Lock size={20} className="input-icon" />
            <input 
              type="password" name="password" placeholder="Senha" 
              value={formData.password} onChange={handleChange} required 
            />
          </div>

          {/* === ÁREA DE ENDEREÇO (SÓ APARECE NO CADASTRO) === */}
          {!isLogin && (
            <div className="address-section">
              <div className="section-divider">
                <span>Endereço de Entrega</span>
              </div>

              <div className="input-group">
                <MapPin size={20} className="input-icon" />
                <input 
                  type="text" name="cep" placeholder="CEP (somente números)" 
                  value={formData.cep} onChange={handleChange} onBlur={checkCEP}
                  maxLength="9" required 
                />
              </div>

              <div className="form-row">
                <div className="input-group" style={{flex: 2}}>
                  <Home size={20} className="input-icon" />
                  <input 
                    type="text" name="rua" placeholder="Rua" 
                    value={formData.rua} onChange={handleChange} required 
                  />
                </div>
                <div className="input-group" style={{flex: 1}}>
                  <input 
                    type="text" name="numero" placeholder="Nº" 
                    value={formData.numero} onChange={handleChange} required 
                  />
                </div>
              </div>

              <div className="input-group">
                <input 
                  type="text" name="complemento" placeholder="Complemento (Opcional)" 
                  value={formData.complemento} onChange={handleChange} 
                />
              </div>

              <div className="input-group">
                <input 
                  type="text" name="bairro" placeholder="Bairro" 
                  value={formData.bairro} onChange={handleChange} required 
                />
              </div>

              <div className="form-row">
                <div className="input-group" style={{flex: 3}}>
                  <input 
                    type="text" name="cidade" placeholder="Cidade" 
                    value={formData.cidade} onChange={handleChange} required 
                  />
                </div>
                <div className="input-group" style={{flex: 1}}>
                  <input 
                    type="text" name="estado" placeholder="UF" maxLength="2"
                    value={formData.estado} onChange={handleChange} required 
                  />
                </div>
              </div>
            </div>
          )}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'PROCESSANDO...' : (isLogin ? 'ENTRAR' : 'CADASTRAR')}
            {!loading && <ArrowRight size={20} />}
          </button>

        </form>

        <div className="toggle-auth">
          <p>
            {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
            <button 
              className="toggle-btn" 
              onClick={() => {
                setIsLogin(!isLogin);
                // Limpa form ao trocar para evitar sujeira
                setFormData({ 
                  name: '', email: '', password: '', 
                  cep: '', rua: '', numero: '', complemento: '', bairro: '', cidade: '', estado: '' 
                }); 
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