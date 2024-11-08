import React from 'react';
import Logo from '../../img/logo.png';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar navbar-custom navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src={Logo} alt="Logo" width="60" height="60" className="d-inline-block align-text-center"/>
          BremerBoxDB
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/home" className="nav-link" aria-current="page">Home</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Perfil
              </a>
              <ul className="dropdown-menu">
                <li> <Link to="/userprofile" className="dropdown-item" aria-current="page">Página de perfil</Link></li>
                <li><a className="dropdown-item" href="#">Minhas reviews</a></li>
              </ul>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Pesquisar filme" aria-label="Search"/>
            <button className="btn btn btn-outline-light" type="submit">Enviar</button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
