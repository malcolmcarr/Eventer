import React, { Component } from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import SignedOutMenu from './SignedOutMenu';
import SignedInMenu from './SignedInMenu';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    };
  }

  onSignIn = () => {
    this.setState({ authenticated: true });
  };

  onSignOut = () => {
    this.setState({ authenticated: false });
    this.props.history.push('/');
  };

  render() {
    const { authenticated } = this.state;
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
              <SignedInMenu onSignOut={this.onSignOut} />
            ) : (
              <SignedOutMenu onSignIn={this.onSignIn} />
            )}
          </Container>
        </Menu>
      </div>
    );
  }
}

export default withRouter(NavBar);
