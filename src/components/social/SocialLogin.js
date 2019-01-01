import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { socialSignIn } from '../../actions/authActions';

const actions = {
  socialSignIn
};

const SocialLogin = ({ socialSignIn }) => {
  return (
    <div>
      <Button
        type='button'
        style={{ marginBottom: '10px' }}
        fluid
        color='facebook'
        onClick={() => socialSignIn('facebook')}
      >
        <Icon name='facebook' /> Sign In with Facebook
      </Button>

      <Button type='button' fluid color='google plus' onClick={() => socialSignIn('google')}>
        <Icon name='google plus' />
        Sign In with Google
      </Button>
    </div>
  );
};

export default connect(
  null,
  actions
)(SocialLogin);
