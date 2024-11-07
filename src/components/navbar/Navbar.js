import React from 'react';
import Logo from '../../img/logo.png';
import './Navbar.css';

function Navbar() {
  return (
    <nav class="navbar navbar-custom navbar-expand-lg navbar-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img src={Logo} alt="Logo" width="60" height="60" class="d-inline-block align-text-center"/>
          BremerBoxDB
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Filmes</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Perfil
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Página de perfil</a></li>
                <li><a class="dropdown-item" href="#">Minhas reviews</a></li>
              </ul>
            </li>
          </ul>
          <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="Pesquisar filme" aria-label="Search"/>
            <button class="btn btn btn-outline-light" type="submit">Enviar</button>
          </form>
        </div>
      </div>
    </nav>
  );
}


export default Navbar;
