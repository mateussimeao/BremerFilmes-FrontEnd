import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';
import logo from '../../img/logo.png';
import Navbar from '../../components/navbar/Navbar';
import { SignUp } from '../../services/User';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const fetchCadastro = async (email, password) => {
    const response = await SignUp({username: email, password: password});
    navigate('/');
  }
  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      if (password !== confirmPassword) {
        setError("As senhas não coincidem!");
      } else {
        console.log("Nome:", name);
        console.log("Email:", email);
        console.log("Senha:", password);
        setError('');
        fetchCadastro(name, password);
        
      }
    } catch (error) {
      console.error(error);
    }
    
  };

  return (
    <div className="signup-page">
      <Navbar />
      <div className="signup-container">
        <header className="site-header">
          <img src={logo} alt="Logo da BremerBoxDB" className="header-img" />
          <p id="site-name">MyBremerBoxDB</p>
        </header>
        <h2 id="signup_text">Cadastro</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Digite seu nome"
            />
          </div>
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
            <label>Confirmação de Senha</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirme sua senha"
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="btn btn-light">Cadastrar</button>
        </form>
        <div className="back-to-login">
          Já possui uma conta? <Link to="/">Volte ao login</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
