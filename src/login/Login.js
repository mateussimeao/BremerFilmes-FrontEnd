import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Adiciona o hook useNavigate
import './Login.css';
import logo from '../img/logo.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook de navegação para redirecionamento

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulação de autenticação (você pode substituir com sua lógica)
    if (email && password) {
      // Redireciona para a página Home após login bem-sucedido
      navigate('/home');
    } else {
      alert('Preencha todos os campos');
    }
  };

  return (
    <div>
      <header className="site-Header">
        <img src={logo} alt="Logo da BremerBoxDB" className="headerImg" />
        <p id="site-Name">MyBremerBoxDB</p>
      </header>

      <div className="login-container">
        <h2 id="login_text">Login</h2>
        {/* <img src={filme} alt='Imagem do Filme ao lado de Login' className='filmeImg'></img> */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Digite seu email"
            />
          </div>
          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Digite sua senha"
            />
          </div>
          <div className="signup-link">
            Ainda não possui conta? <Link to="/signup">Cadastre-se aqui</Link>
          </div>
          <button type="submit"><b>Entrar</b></button>
        </form>
      </div>
    </div>
  );
}

export default Login;
