import React from 'react';
import logo from '../../img/logo.png';
import './Navbar.css';

function Navbar() {
  return (
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
  );
}

export default Navbar;
