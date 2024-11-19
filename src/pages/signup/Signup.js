import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';
import logo from '../../img/logo.png';
import Navbar from '../../components/navbar/Navbar';

import Footer from '../../components/footer/Footer';

import { SignUp } from '../../services/User';
import { toast } from 'react-toastify';
function Signup() {
  const [name, setName] = useState('');
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
        console.log("Senha:", password);
        setError('');
        fetchCadastro(name, password);
        
      }
    } catch (error) {
      toast.error("Ops, infelizmente não conseguimos cadastrar sua conta: " + error.message, {position:'top-left'})
    }
    
  };

  return (
    <div>
      <div className="signup-page">
        <Navbar />
        <div className="signup-container">
          <header className="site-header">
            <img src={logo} alt="Logo da BremerBoxDB" className="header-img" />
            <p id="site-name">MyBremerBoxDB</p>
          </header>
          <h2 id="signup_text">Cadastro</h2>
          <form>
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
            <Link to ="/"><button type="button" className="btn btn-light" onClick={handleSubmit}>Cadastrar</button></Link>
          </form>
          <div className="back-to-login">
            Já possui uma conta? <Link to="/">Volte ao login</Link>
          </div>
          
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Signup;
