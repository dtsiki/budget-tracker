import { faAt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useStoreon } from 'storeon/react';

import Button from './../../base/Button';
import Input from './../../base/Input';
import Text from './../../base/Text';

import './style.scss';

const Budget = () => {
  const { user, dispatch } = useStoreon('user');

  return (
    <div>
      <h1>Budget</h1>
      Wazzup
    </div>
  );
};

export default Budget;
