import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de autenticação
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="login-container">
      <h2>Login - BremerBoxDB</h2>
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
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
