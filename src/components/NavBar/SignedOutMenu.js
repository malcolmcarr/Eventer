import React from 'react';
import { Button, Menu } from 'semantic-ui-react';

const SignedOutMenu = ({ onSignIn, onRegister }) => {
  return (
      <Menu.Item position='right'>
        <Button onClick={onSignIn} basic inverted content='Login' />
        <Button
          basic
          inverted
          content='Register'
          onClick={onRegister}
          style={{ marginLeft: '0.5em' }}
        />
      </Menu.Item>
  );
};

export default SignedOutMenu;
