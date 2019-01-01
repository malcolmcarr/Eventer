import React, { Component } from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';

import SignedOutMenu from './SignedOutMenu';
import SignedInMenu from './SignedInMenu';
import { openModal } from '../../actions/modalActions';

const actions = {
  openModal,
};

const mapStateToProps = state => ({ auth: state.firebase.auth, profile: state.firebase.profile });

class NavBar extends Component {

  openSignIn = () => {
    this.props.openModal('LoginModal', {});
  };

  openRegister = () => {
    this.props.openModal('RegisterModal');
  };

  onSignOut = () => {
    this.props.firebase.logout();
    this.props.history.push('/');
  };

  render() {
    const { auth, profile } = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;
    return (
      <div>
        <Menu inverted fixed='top'>
          <Container>
            <Menu.Item as={Link} to='/events' header>
              <img src='/assets/logo.png' alt='logo' />
              Ventually
            </Menu.Item>
            <Menu.Item as={NavLink} to='/events' name='Events' />
            {authenticated && (
              <Menu.Item as={NavLink} to='/people' name='People' />
            )}
            {authenticated && (
              <Menu.Item>
                <Button
                  floated='right'
                  positive
                  inverted
                  content='Create Event'
                  as={Link}
                  to='/events/create'
                />
              </Menu.Item>
            )}
            {authenticated ? (
              <SignedInMenu onSignOut={this.onSignOut} profile={profile} />
            ) : (
              <SignedOutMenu openRegister={this.openRegister} openSignIn={this.openSignIn} />
            )}
          </Container>
        </Menu>
      </div>
    );
  }
}

export default withRouter(withFirebase(connect(mapStateToProps, actions)(NavBar)));
