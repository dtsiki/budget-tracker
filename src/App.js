import React, { useEffect, useState } from 'react';
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
  const [currentUser, setCurrentUser] = useState(null);
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
        userId: currentUser.uid,
      };

      dispatch('user/login', userInfo);
    }
  }, [currentUser]);

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

  return isInitializing ? (
    <Loader isFullscreen />
  ) : (
    <>
      <div className="wrapper">
        <Nav links={links} />
        <Switch>
          <PrivateRoute exact path="/" component={Main} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/budget" component={Budget} />
          <PrivateRoute path="/admin" component={Admin} isForbidden />
          <PublicRoute path="/signin" component={SignIn} />
          <PublicRoute path="/signup" component={SignUp} />
          <PublicRoute path="*" component={Error} />
        </Switch>
      </div>
      <Notifications />
    </>
  );
};

export default App;
