import React from 'react';
import { Divider, Form, Segment, Button, Label } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { combineValidators, isRequired } from 'revalidate';

import TextInput from '../form/TextInput';
import { register } from '../../actions/authActions';
import SocialLogin from '../social/SocialLogin';

const actions = {
  register
};

const validate = combineValidators({
  displayName: isRequired({ message: 'Please enter a username.' }),
  email: isRequired({ message: 'Please enter an email.' }),
  password: isRequired({ message: 'Please enter a password' })
});

const RegisterForm = ({
  handleSubmit,
  register,
  error,
  invalid,
  submitting
}) => {
  return (
    <div>
      <Form size='large' onSubmit={handleSubmit(register)}>
        <Segment>
          <Field
            name='displayName'
            type='text'
            component={TextInput}
            placeholder='Display name'
          />
          <Field
            name='email'
            type='text'
            component={TextInput}
            placeholder='Email'
          />
          <Field
            name='password'
            type='password'
            component={TextInput}
            placeholder='Password'
          />
          {error && (
            <Label basic color='red'>
              {error}
            </Label>
          )}
          <Button
            fluid
            size='large'
            color='teal'
            disabled={invalid || submitting}
          >
            Register
          </Button>
          <Divider horizontal>Or</Divider>
        <SocialLogin />
        </Segment>
      </Form>
    </div>
  );
};

export default connect(
  null,
  actions
)(reduxForm({ form: 'registerForm', validate })(RegisterForm));
