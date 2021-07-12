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
import Settings from './components/pages/Settings';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import { auth } from './config';
import transactionTypes from './constants/transactionTypes';
import { getUserDoc } from './controllers/firebase/auth';
import { getCurrency } from './controllers/firebase/currency';
import { getTransactions } from './controllers/firebase/transactions';

const App = () => {
  const { user, dispatch } = useStoreon('user', 'userCurrency');
  const [isInitializing, setInitializing] = useState(true);
  const [isLoaded, setLoaded] = useState(false);
  const [isTransactionsLoaded, setTransactionsLoaded] = useState({
    incomes: false,
    expenses: false,
  });
  const [isCurrencyLoaded, setCurrencyLoaded] = useState(false);

  const links = [
    { name: 'Main', path: '/' },
    { name: 'Budget', path: '/budget', isAuthRequired: true },
    { name: 'Profile', path: '/profile', isAuthRequired: true },
    { name: 'Sign In', path: '/signin', isAuthNotRequired: true },
    { name: 'Secret page', path: 'admin', isAuthRequired: true },
    { name: 'Settings', path: 'settings', isAuthRequired: true },
  ];

  const routes = [
    { name: 'Main', path: '/', isPrivate: true, component: Main, isExact: true },
    { name: 'Budget', path: '/budget', isPrivate: true, component: Budget },
    { name: 'Profile', path: '/profile', isPrivate: true, component: Profile },
    { name: 'Sign In', path: '/signin', isPrivate: false, component: SignIn },
    { name: 'Sign Up', path: '/signup', isPrivate: false, component: SignUp },
    { name: 'Secret page', path: '/admin', isPrivate: true, isForbidden: true, component: Admin },
    { name: 'Settings', path: '/settings', isPrivate: true, component: Settings },
    { name: '404', path: '*', isPrivate: false, component: Error },
  ];

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const result = await getUserDoc(user.uid);

        if (typeof result === 'string') {
          const userObj = {
            isLogin: false,
            isAdmin: false,
          };

          dispatch('user/login', userObj);
          dispatch('notifications/add', result);
          setInitializing(false);
          return;
        }

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
    setTransactionsLoaded((prevTransactionsLoading) => ({
      ...prevTransactionsLoading,
      [type]: false,
    }));

    const result = await getTransactions(user.userId, type);

    if (type === 'expenses') dispatch('userTransactions/addExpenses', result);
    if (type === 'incomes') dispatch('userTransactions/addIncomes', result);

    setTransactionsLoaded((prevTransactionsLoading) => ({
      ...prevTransactionsLoading,
      [type]: true,
    }));
  };

  useEffect(() => {
    if (!isInitializing) {
      transactionTypes.map((transactionType) => {
        fetchTransactions(transactionType);
      });
    }
  }, [isInitializing]);

  useEffect(() => {
    if (isTransactionsLoaded.expenses && isTransactionsLoaded.incomes && isCurrencyLoaded) setLoaded(true);
  }, [isTransactionsLoaded, isCurrencyLoaded]);

  useEffect(() => {
    const fetchCurrency = async () => {
      setCurrencyLoaded(false);

      const result = await getCurrency(user.userId);

      if (result) dispatch('userCurrency/update', result);

      setCurrencyLoaded(true);
    };

    if (!isInitializing) fetchCurrency();
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
  }, [routes]);

  return isLoaded ? (
    <>
      <div className="wrapper">
        <Nav links={links} />
        <Switch>{renderRoutes}</Switch>
      </div>
      <Notifications />
    </>
  ) : (
    <Loader isFullscreen />
  );
};

export default App;
