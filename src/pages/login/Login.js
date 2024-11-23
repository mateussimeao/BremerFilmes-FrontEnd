import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../../img/logo.png';
import Navbar from '../../components/navbar/Navbar';

import Footer from '../../components/footer/Footer';


import UserContext from '../../context/UserContext';
import { GetToken, GetUserById, IsAutenticated, LoginUser, SaveUser } from '../../services/User';
import { toast } from 'react-toastify';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser} = useContext(UserContext);

  const navigate = useNavigate();
  const fetchLogin = async (email, password) => {
    const response = await LoginUser({username: email, password: password})
    const arrayToken = response.token.split('.')
    const tokenPayload = JSON.parse(atob(arrayToken[1]));
    const usuario = await GetUserById(tokenPayload.id);
    setUser(usuario.dados);
    SaveUser(usuario.dados);
    if(IsAutenticated()){
      navigate('/home');
    }else{
      toast.error("Clique novamente no login", {position: 'top-left'});
    }
    
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (email && password) {
        fetchLogin(email, password);
        
      } else {
        alert('Preencha todos os campos');
      }
    } catch (error) {
      console.error(error);
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
            <label>Nome</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Digite seu nome de usuário"
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
            <button type="submit" className="btn btn-light"> Entrar </button>
          </div>
          <div className="signup-link">
            Ainda não possui conta? <Link to="/signup">Cadastre-se aqui</Link>
          </div>
          
        </form>
      </div>
      <Footer />
    </div>
  );
  
}

export default Login;
