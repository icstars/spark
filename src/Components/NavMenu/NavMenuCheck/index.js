import React from 'react';
import NavMenu from '../Manager';
import EmpNavMenu from '../Employee';

const NavMenuCheck = () => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const isManager = localStorage.getItem('isManager') === 'true';

  return (
    <div className="nav-menu">
      {isAdmin || isManager ? <NavMenu /> : <EmpNavMenu />}
    </div>
  );
};

export default NavMenuCheck;
