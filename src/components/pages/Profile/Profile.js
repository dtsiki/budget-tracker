import { faAt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useStoreon } from 'storeon/react';

import { deleteUser, updateEmail, updateProfileData } from './../../../controllers/firebase/auth';
import Button from './../../base/Button';
import Input from './../../base/Input';
import Text from './../../base/Text';

import './style.scss';

const Profile = () => {
  const { user, dispatch } = useStoreon('user');
  const [form, setForm] = useState({
    username: user.displayName,
    email: user.email,
  });
  const history = useHistory();

  const deleteProfile = async () => {
    const result = await deleteUser();

    if (!result) {
      dispatch('notifications/add', 'Bye :(((');
      dispatch('user/logout');
      history.push('/signup');
    }

    if (result) dispatch('notifications/add', `Something went wrong: ${result}`);
  };

  const changeProfile = async (e) => {
    e.preventDefault();

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    if (!form.username) {
      dispatch('notifications/add', `Error: the username cannot be empty`);
      return;
    }

    if (!form.email) {
      dispatch('notifications/add', `Error: the email cannot be empty`);
      return;
    }

    const resultProfile = await updateProfileData({ displayName: form.username });
    if (resultProfile) dispatch('notifications/add', resultProfile);

    //const resultEmail = await updateEmail(form.email);
    //if (resultEmail) dispatch('notifications/add', resultEmail);
  };

  return (
    <div>
      <h1>Profile</h1>
      <div className="section">
        <h2>Update profile</h2>
        <form className="form" onSubmit={updateProfile}>
          <Input
            value={form.username}
            onChange={changeProfile}
            type="text"
            name="username"
            id="username"
            placeholder="Change username"
            label="Username:"
            icon={<FontAwesomeIcon icon={faUser} />}
          />
          <Input
            value={form.email}
            onChange={changeProfile}
            type="text"
            name="email"
            id="email"
            placeholder="Change email"
            label="Email:"
            icon={<FontAwesomeIcon icon={faAt} />}
          />
          <Button onClick={updateProfile}>Save</Button>
        </form>
      </div>
      <div className="section">
        <h2>Account deletion</h2>
        <Text hasGap>Deleting your profile will remove all your data. You cannot undo this. </Text>
        <Button onClick={deleteProfile} variant="secondary">
          Delete
        </Button>
      </div>
    </div>
  );
};

export default Profile;
