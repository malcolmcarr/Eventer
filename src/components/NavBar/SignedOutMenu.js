import React from 'react';
import { Button, Menu } from 'semantic-ui-react';

const SignedOutMenu = ({ openSignIn, openRegister }) => {
  return (
      <Menu.Item position='right'>
        <Button onClick={openSignIn} basic inverted content='Sign In' />
        <Button
          basic
          inverted
          content='Register'
          onClick={openRegister}
          style={{ marginLeft: '0.5em' }}
        />
      </Menu.Item>
  );
};

export default SignedOutMenu;
