import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { useStoreon } from 'storeon/react';

import './style.scss';

const Nav = () => {
  const { user } = useStoreon('user');

  const links = [
    { name: 'Main', path: '/' },
    { name: 'Profile', path: '/profile', isAuthRequired: true },
    { name: 'Sign In', path: '/signin', isAuthNotRequired: true },
    { name: 'Secret page', path: 'admin', isAuthRequired: true },
  ];

  const renderMenu = useMemo(() => {
    return links.map((link) => {
      if ((link.isAuthRequired && !user) || (link.isAuthNotRequired && user)) return;

      return (
        <li key={`menu-item-${link.name}`} className="nav-menu__item">
          <NavLink to={link.path}>{link.name}</NavLink>
        </li>
      );
    });
  }, [links]);

  return (
    <nav className="nav">
      <ul className="nav-menu">{renderMenu}</ul>
    </nav>
  );
};

export default Nav;
