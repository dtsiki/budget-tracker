import { faAt, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useStoreon } from 'storeon/react';

import { addUserToCollection, signUpWithCredential } from './../../../controllers/firebase/auth';
import Button from './../../base/Button';
import Checkbox from './../../base/Checkbox';
import Input from './../../base/Input';
import Text from './../../base/Text';

import './style.scss';

const SignUp = () => {
  const { dispatch } = useStoreon();
  const [form, setForm] = useState({
    username: 'Dashich',
    email: '',
    password: '',
    userId: null,
    isAdmin: false,
  });
  const history = useHistory();

  const signUp = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password || !form.username) {
      dispatch('notifications/add', `Error: empty field`);
      return;
    }

    await signUpWithCredential(form.email, form.password)
      .then(async (result) => {
        if (result.user) {
          result.user.updateProfile({
            displayName: form.username,
          });

          const userInfo = {
            isLogin: true,
            displayName: form.username,
            email: result.user.email,
            isAdmin: false,
          };

          const addResult = await addUserToCollection(result.user.uid, {
            isAdmin: form.isAdmin,
            username: form.username,
          });

          if (addResult) {
            history.push('/profile');
            dispatch('notifications/add', `Welcome! 💜`);
            dispatch('user/login', userInfo);
          } else {
            dispatch('notifications/add', `Something went wrond: ${addResult}`);
          }
        }
      })
      .catch((error) => {
        const { message } = error;
        dispatch('notifications/add', `Sign up error: ${message} 👀`);
      });
  };

  const changeValue = async (e) => {
    if (e.target.type !== 'checkbox') e.preventDefault();

    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    setForm({
      ...form,
      [e.target.name]: value,
    });
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form className="form" onSubmit={signUp}>
        <Input
          value={form.username}
          onChange={changeValue}
          type="text"
          name="username"
          id="username"
          placeholder="Enter username"
          label="Username:"
          icon={<FontAwesomeIcon icon={faUser} />}
        />
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
        <div className="form__checkbox">
          <Checkbox name="isAdmin" value={form.isAdmin} onChange={changeValue} label="Sign up as an admin" />
        </div>
        <Button onClick={signUp}>Sign up</Button>
      </form>
      <Text align="center" textClassName="form__footer">
        Already have an account? <Link to="/signin">Sign in here.</Link>
      </Text>
    </div>
  );
};

SignUp.propTypes = {};

export default SignUp;
