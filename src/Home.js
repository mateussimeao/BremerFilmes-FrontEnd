import React from 'react';
import './Home.css'; // Atualize o nome do arquivo de estilização
import logo from './img/logo.png'

function Home() {
    return (
      <div>
        <nav className="navbar">
          <div className="navbar-logo">
            <img src={logo} alt="Logo" />
          </div>
          <ul className="navbar-options">
            <li>Início</li>
            <li>Filmes</li>
            <li>Sobre</li>
            <li>Contato</li>
          </ul>
        </nav>
        <div className="home-container">
          <img src={logo} alt="Logo" className="logo" />
          <h1>Estamos em manutenção, seu filme irá começar logo...</h1>
        </div>
      </div>
    );
  }
  
  export default Home;