import React from 'react';
import NavMenu from '../Manager';

const NavMenuCheck = () => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const isManager = localStorage.getItem('isManager') === 'true';

  return (
    <>
      {isAdmin || isManager ? <NavMenu /> : null}
    </>
  );
};

export default NavMenuCheck;
