import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useStoreon } from 'storeon/react';

import { logout } from './../../../controllers/firebase/auth';
import Button from './../../base/Button';

import './style.scss';

const Sidebar = () => {
  const { dispatch, user } = useStoreon('user');
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

  return (
    <aside className="sidebar">
      <h3 className="sidebar__title">
        {user.isLogin ? `Wazzup, ${user.displayName} 🖖` : 'You are not authorized ⛔'}
      </h3>
      <div className="sidebar__content">
        {user.isLogin ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : (
          <Button>
            <Link to="/signin">Sign in</Link>
          </Button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
