import React from 'react';
import { Form, Segment, Button, Label, Divider } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import TextInput from '../form/TextInput';
import { signIn } from '../../actions/authActions';
import SocialLogin from '../social/SocialLogin';

const actions = { signIn };

const LoginForm = ({ signIn, handleSubmit, error }) => {
  return (
    <Form size='large' onSubmit={handleSubmit(signIn)}>
      <Segment>
        <Field
          name='email'
          component={TextInput}
          type='text'
          placeholder='Email Address'
        />
        <Field
          name='password'
          component={TextInput}
          type='password'
          placeholder='password'
        />
        {error && (
          <Label basic color='red'>{error}</Label>
        )}
        <Button fluid size='large' color='teal'>
          Sign In
        </Button>
        <Divider horizontal>Or</Divider>
        <SocialLogin />
      </Segment>
    </Form>
  );
};

export default connect(
  null,
  actions
)(reduxForm({ form: 'loginForm' })(LoginForm));
