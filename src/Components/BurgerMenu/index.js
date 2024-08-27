import React, { useState } from 'react';
import {Link, useLocation} from 'react-router-dom';

import './BurgerMenu.css';

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const userId = localStorage.getItem('userId');
  const location = useLocation();

const isAdmin = localStorage.getItem("isAdmin") === "true";


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="burger-menu">
      <div className={`burger-icon ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
      <nav className={`menu ${isOpen ? 'open' : ''}`}>
        <ul>
          <div className={`nav-element ${location.pathname === `/home/${userId}` ? 'active' : ''}`}>
            <Link to={`/home/${userId}`}>
              <li><a href="#home">Home</a></li>
            </Link>
          </div>
          <li><a href="#dept_metrics">Department metrics</a></li>
          <li><a href="#services">People</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default BurgerMenu;