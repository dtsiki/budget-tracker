import React, { useEffect, useMemo, useState } from 'react';
import { Switch } from 'react-router-dom';
import { useStoreon } from 'storeon/react';

import Loader from './components/base/Loader';
import { PrivateRoute, PublicRoute } from './components/base/Routes/';
import Nav from './components/common/Nav';
import Notifications from './components/common/Notifications';
import Admin from './components/pages/Admin';
import Budget from './components/pages/Budget';
import Error from './components/pages/Error';
import Main from './components/pages/Main';
import Profile from './components/pages/Profile';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import { auth } from './config';
import transactionTypes from './constants/transactionTypes';
import { getUserDoc } from './controllers/firebase/auth';
import { getTransactions } from './controllers/firebase/transactions';

const App = () => {
  const { user, dispatch } = useStoreon('user', 'userTransactions');
  const [isInitializing, setInitializing] = useState(true);
  const [isTransactionsLoading, setTransactionsLoading] = useState({
    incomes: true,
    expenses: true,
  });

  const links = [
    { name: 'Main', path: '/' },
    { name: 'Budget', path: '/budget', isAuthRequired: true },
    { name: 'Profile', path: '/profile', isAuthRequired: true },
    { name: 'Sign In', path: '/signin', isAuthNotRequired: true },
    { name: 'Secret page', path: 'admin', isAuthRequired: true },
  ];

  const routes = [
    { name: 'Main', path: '/', isPrivate: true, component: Main, isExact: true },
    { name: 'Budget', path: '/budget', isPrivate: true, component: Budget },
    { name: 'Profile', path: '/profile', isPrivate: true, component: Profile },
    { name: 'Sign In', path: '/signin', isPrivate: false, component: SignIn },
    { name: 'Sign Up', path: '/signup', isPrivate: false, component: SignUp },
    { name: 'Secret page', path: '/admin', isPrivate: true, isForbidden: true, component: Admin },
    { name: '404', path: '*', isPrivate: false, component: Error },
  ];

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const result = await getUserDoc(user.uid);

        if (result) {
          const userObj = {
            isLogin: true,
            displayName: user.displayName,
            email: user.email,
            isAdmin: result.isAdmin,
            userId: user.uid,
          };

          dispatch('user/login', userObj);
          setInitializing(false);
        }
      }
    });
  }, []);

  const fetchTransactions = async (type) => {
    setTransactionsLoading((prevTransactionsLoading) => ({
      ...prevTransactionsLoading,
      [type]: true,
    }));

    const result = await getTransactions(user.userId, type);

    if (type === 'expenses') {
      dispatch('userTransactions/addExpenses', result);
    }
    if (type === 'incomes') {
      dispatch('userTransactions/addIncomes', result);
    }

    setTransactionsLoading((prevTransactionsLoading) => ({
      ...prevTransactionsLoading,
      [type]: false,
    }));
  };

  useEffect(() => {
    if (!isInitializing) {
      transactionTypes.map((transactionType) => {
        fetchTransactions(transactionType);
      });
    }
  }, [isInitializing]);

  const renderRoutes = useMemo(() => {
    return routes.map((route) => {
      if (route.isPrivate) {
        return (
          <PrivateRoute
            key={`${route.name}`}
            exact={route.isExact}
            path={route.path}
            component={route.component}
            isForbidden={route.isForbidden}
          />
        );
      } else
        return (
          <PublicRoute key={`${route.name}`} exact={route.isExact} path={route.path} component={route.component} />
        );
    });
  }, [links]);

  return isInitializing ? (
    <Loader isFullscreen />
  ) : (
    <>
      <div className="wrapper">
        <Nav links={links} />
        <Switch>{renderRoutes}</Switch>
      </div>
      <Notifications />
    </>
  );
};

export default App;
