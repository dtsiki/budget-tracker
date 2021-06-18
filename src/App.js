import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useStoreon } from 'storeon/react';

import Loader from './components/base/Loader';
import { AdminRoute, PrivateRoute } from './components/base/Routes/';
import Nav from './components/common/Nav';
import Notifications from './components/common/Notifications';
import Sidebar from './components/common/Sidebar';
import Admin from './components/pages/Admin';
import Error from './components/pages/Error';
import Main from './components/pages/Main';
import Profile from './components/pages/Profile';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import { auth } from './config';
import { getUserDoc } from './controllers/firebase/auth';

const App = () => {
  const { user, dispatch } = useStoreon('user');
  const [isInitializing, setInitializing] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  const onAuthStateChanged = (user) => {
    setCurrentUser(user);

    if (isInitializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);

    return subscriber;
  }, []);

  useEffect(() => {
    const checkUserRole = async (userId) => {
      const result = await getUserDoc(userId);

      if (result.isAdmin) {
        return true;
      }
      return false;
    };

    if (currentUser) {
      const isUserAdmin = checkUserRole(currentUser.uid);

      const userInfo = {
        isLogin: true,
        displayName: currentUser.displayName,
        email: currentUser.email,
        isAdmin: isUserAdmin ? true : false,
      };

      dispatch('user/login', userInfo);
    }
  }, [currentUser]);

  return isInitializing ? (
    <Loader />
  ) : (
    <>
      <div className="wrapper">
        <Nav />
        <div className="container">
          <Sidebar />
          <main className="content">
            <Switch>
              <PrivateRoute exact path="/" isLogin={user.isLogin} component={Main} />
              <PrivateRoute path="/profile" isLogin={user.isLogin} component={Profile} />
              <AdminRoute path="/admin" isLogin={user.isLogin} isAdmin={user.isAdmin} component={Admin} />
              <Route path="/signin" component={SignIn} />
              <Route path="/signup" component={SignUp} />
              <Route path="*" component={Error} />
            </Switch>
          </main>
        </div>
      </div>
      <Notifications />
    </>
  );
};

export default App;
