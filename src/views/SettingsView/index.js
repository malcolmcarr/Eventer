import React from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';

import SettingsNav from './SettingsNav';
import { Switch, Route, Redirect } from 'react-router-dom';
import BasicsPage from './BasicsPage';
import AboutPage from './AboutPage';
import AccountPage from './AccountPage';
import PhotosPage from './PhotosPage';
import { updatePassword } from '../../actions/authActions';

const actions = {
  updatePassword
};

const mapStateToProps = state => ({ provider: state.firebase.auth.providerData[0].providerId });

const SettingsView = ({ provider, updatePassword }) => {
  return (
    <Grid>
      <Grid.Column width={12}>
        <Switch>
          <Redirect exact from='/settings' to='/settings/basics' />
          <Route path='/settings/basics' component={BasicsPage} />
          <Route path='/settings/about' component={AboutPage} />
          <Route path='/settings/photos' component={PhotosPage} />
          <Route
            path='/settings/account'
            render={() => <AccountPage updatePassword={updatePassword} provider={provider} />}
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
