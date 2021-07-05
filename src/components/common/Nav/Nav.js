import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useStoreon } from 'storeon/react';

import { logout } from './../../../controllers/firebase/auth';
import Button from './../../base/Button';

import './style.scss';

const Nav = ({ links }) => {
  const { user, dispatch } = useStoreon('user');
  const history = useHistory();

  const handleLogout = async () => {
    await logout()
      .then(() => {
        dispatch('user/logout');
        dispatch('notifications/add', 'You have been logged out, see you later 👋');
        history.push('/signin');
      })
      .catch((error) => {
        dispatch('notifications/add', `Logout failed: ${error}`);
      });
  };

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

  return user.isLogin ? (
    <nav className="nav">
      <ul className="nav-menu">{renderMenu}</ul>

      <footer className="nav-footer">
        {user.isLogin && (
          <Button
            customClassName="nav-button nav-button--logout"
            onClick={handleLogout}
            icon={<FontAwesomeIcon icon={faSignOutAlt} />}
          >
            Logout
          </Button>
        )}
      </footer>
    </nav>
  ) : null;
};

Nav.propTypes = {
  links: PropTypes.array,
};

export default Nav;
