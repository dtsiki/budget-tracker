import React from 'react';

import Text from './../../base/Text';

import './style.scss';

const Admin = () => {
  return (
    <div>
      <h1>Admin page</h1>
      <Text hasGap>This is secret page 🤫. If you can see this page - you`re the chosen one 😎</Text>
    </div>
  );
};

export default Admin;
