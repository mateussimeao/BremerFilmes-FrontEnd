import { Link } from 'react-router-dom';
import './Footer.css';
import React from 'react';

function Footer() {
  return (
    <footer className="footer navbar-fixed-bottom">
      <div className="text-center p-3" style={{color: '#f2f2f2', backgroundColor: 'rgba(26, 26, 29)' }}>
        © 2024 Copyright:
        <a href="https://www.instagram.com/jmarcelo_22/" style={{ color: '#add8e6' }}> BremerBoxDB</a>
      </div>
    </footer>
  );
}

export default Footer;
