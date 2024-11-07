import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../../img/logo.png';
import Navbar from '../../components/navbar/Navbar';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      navigate('/home');
    } else {
      alert('Preencha todos os campos');
    }
  };

  return (
    <div className="main-div">
      <Navbar />
      <div className="login-container">
        <img src={logo} alt="Logo" className="login-logo" />
        <h2 id="login_text">Login</h2>
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
          <div className="form-group">
            <button type="button" class="btn btn-light">Entrar</button>
          </div>
          <div className="signup-link">
            Ainda não possui conta? <Link to="/signup">Cadastre-se aqui</Link>
          </div>
          
        </form>
      </div>
    </div>
  );
}

export default Login;
