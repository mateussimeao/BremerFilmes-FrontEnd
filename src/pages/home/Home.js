import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import './Home.css';
import logo from '../../img/logo.png';

function Home() {
  return (
    <div>
      <Navbar />
      <div className="home-container">
        <img src={logo} alt="Logo" className="logo" />
        <h1>Estamos em manutenção, seu filme irá começar logo...</h1>
      </div>
    </div>
  );
}

export default Home;
