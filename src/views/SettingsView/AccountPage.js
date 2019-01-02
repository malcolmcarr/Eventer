import React from 'react';
import {
  Segment,
  Header,
  Form,
  Divider,
  Label,
  Button,
  Icon
} from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import {
  combineValidators,
  matchesField,
  isRequired,
  composeValidators
} from 'revalidate';

import TextInput from '../../components/form/TextInput';

const validate = combineValidators({
  newPassword1: isRequired({ message: 'Enter a new password' }),
  newPassword2: composeValidators(
    isRequired({ message: 'Please confirm your password' }),
    matchesField('newPassword1')({ message: 'passwords do not match' })
  )()
});

const AccountPage = ({
  error,
  invalid,
  submitting,
  handleSubmit,
  updatePassword,
  provider
}) => {
  return (
    <Segment>
      <Header dividing size='large' content='Account' />
      {provider === 'password' && (
        <div>
          <Header color='teal' sub content='Change password' />
          <p>Use this form to update your account settings</p>
          <Form onSubmit={handleSubmit(updatePassword)}>
            <Field
              width={8}
              name='newPassword1'
              type='password'
              pointing='left'
              inline={true}
              component={TextInput}
              basic={true}
              placeholder='New Password'
            />
            <Field
              width={8}
              name='newPassword2'
              type='password'
              inline={true}
              basic={true}
              pointing='left'
              component={TextInput}
              placeholder='Confirm Password'
            />
            {error && (
              <Label basic color='red'>
                {error}
              </Label>
            )}
            <Divider />
            <Button
              size='large'
              positive
              content='Update Password'
              disabled={invalid || submitting}
            />
          </Form>
        </div>
      )}

      {provider === 'facebook.com' && (
        <div>
          <Header color='teal' sub content='Facebook Account' />
          <p>Please use Facebook to update your account settings</p>
          <Button type='button' color='facebook'>
            <a
              href='https://facebook.com/'
              target='_blank'
              rel='noopener noreferrer'
              style={{ color: 'white' }}
            >
              <Icon name='facebook' />
              Go to Facebook
            </a>
          </Button>
        </div>
      )}

      {provider === 'google.com' && (
        <div>
          <Header color='teal' sub content='Google Account' />
          <p>Please use Google to update your account settings</p>
          <Button type='button' color='google plus'>
            <a
              href='https://myaccount.google.com/'
              target='_blank'
              rel='noopener noreferrer'
              style={{ color: 'white' }}
            >
              <Icon name='google plus' />
              Go to Google
            </a>
          </Button>
        </div>
      )}
    </Segment>
  );
};

export default reduxForm({ form: 'account', validate })(AccountPage);
