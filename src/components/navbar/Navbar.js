import React from 'react';
import Logo from '../../img/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { GetToken, GetUser, Logout } from '../../services/User';

function Navbar() {

  const navigate = useNavigate();
  const logout = () => {
    Logout();
    navigate('/');
  }
  return (
    <nav className="navbar navbar-custom navbar-expand-lg navbar-dark">
      <div className="container-fluid">

        <a className="navbar-brand" href={GetUser() !== null && GetToken() !== null ? '/home' : '/'}>
          <img src={Logo} alt="Logo" width="60" height="60" className="d-inline-block align-text-center"/>
          BremerBoxDB
        </a>

        {
          GetUser() !== null && GetToken() !== null ?
          <>
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
              <div className="d-flex">
                <button className="btn btn btn-outline-light" onClick={logout} type="button">Logout</button>
              </div>
            </div>
          </>
          :
          null
        }
        
      </div>
    </nav>
  );
}

export default Navbar;
