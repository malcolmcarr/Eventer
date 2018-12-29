import React from 'react';
import { Button, Menu } from 'semantic-ui-react';

const SignedOutMenu = ({ onSignIn }) => {
  return (
      <Menu.Item position='right'>
        <Button onClick={onSignIn} basic inverted content='Login' />
        <Button
          basic
          inverted
          content='Register'
          style={{ marginLeft: '0.5em' }}
        />
      </Menu.Item>
  );
};

export default SignedOutMenu;
