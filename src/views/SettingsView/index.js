import React from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';

import SettingsNav from './SettingsNav';
import { Switch, Route, Redirect } from 'react-router-dom';
import GeneralPage from './GeneralPage';
import AboutPage from './AboutPage';
import AccountPage from './AccountPage';
import PhotosPage from './PhotosPage';
import { updatePassword } from '../../actions/authActions';
import { updateProfile } from '../../actions/userActions';

const actions = {
  updatePassword,
  updateProfile
};

const mapStateToProps = state => ({
  provider: state.firebase.auth.providerData[0].providerId,
  user: state.firebase.profile
});

const SettingsView = ({ provider, updatePassword, user, updateProfile }) => {
  return (
    <Grid>
      <Grid.Column width={12}>
        <Switch>
          <Redirect exact from='/settings' to='/settings/basics' />
          <Route
            path='/settings/general'
            render={() => <GeneralPage updateProfile={updateProfile} initialValues={user} />}
          />
          <Route path='/settings/about' render={() => <AboutPage updateProfile={updateProfile} initialValues={user} />} />
          <Route path='/settings/photos' component={PhotosPage} />
          <Route
            path='/settings/account'
            render={() => (
              <AccountPage
                updatePassword={updatePassword}
                provider={provider}
              />
            )}
          />
        </Switch>
      </Grid.Column>
      <Grid.Column width={4}>
        <SettingsNav />
      </Grid.Column>
    </Grid>
  );
};

export default connect(
  mapStateToProps,
  actions
)(SettingsView);
