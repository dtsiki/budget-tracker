import { faAt, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useStoreon } from 'storeon/react';

import { login } from './../../../controllers/firebase/auth';
import Button from './../../base/Button';
import Input from './../../base/Input';
import Text from './../../base/Text';

import './style.scss';

const SignIn = () => {
  const { dispatch } = useStoreon();
  const history = useHistory();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const signIn = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      dispatch(
        'notifications/add',
        `Error: the ${
          !form.email && !form.password ? 'email and the password' : !form.email ? 'email' : 'password'
        } cannot be null or empty`
      );
      return;
    }

    await login(form.email, form.password)
      .then((result) => {
        if (result.user) {
          const userInfo = {
            isLogin: true,
            displayName: result.user.displayName,
            email: result.user.email,
            isAdmin: false,
          };

          dispatch('user/login', userInfo);
          dispatch('notifications/add', 'Welcome back 🤟');
          history.push('/profile');
        }
      })
      .catch((error) => {
        const { message } = error;
        dispatch('notifications/add', `Sign in error: ${message} 👀`);
      });
  };

  const changeValue = async (e) => {
    e.preventDefault();

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form className="form" onSubmit={signIn}>
        <Input
          value={form.email}
          onChange={changeValue}
          type="text"
          name="email"
          id="email"
          placeholder="Enter email"
          label="Email:"
          icon={<FontAwesomeIcon icon={faAt} />}
        />
        <Input
          value={form.password}
          onChange={changeValue}
          type="password"
          name="password"
          id="password"
          placeholder="Enter password"
          label="Password:"
          icon={<FontAwesomeIcon icon={faLock} />}
        />
        <Button onClick={signIn}>Sign in</Button>
      </form>
      <Text align="center" textClassName="form__footer">
        {`Doesn't have an account?`} <Link to="/signup">Sign up here.</Link>
      </Text>
    </div>
  );
};

SignIn.propTypes = {};

export default SignIn;
