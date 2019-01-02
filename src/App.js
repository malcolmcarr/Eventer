import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { Switch, Route } from 'react-router-dom';

import EventView from './views/EventView';
import NavBar from './components/NavBar';
import ProfileView from './views/ProfileView';
import SettingsView from './views/SettingsView';
import PeopleView from './views/PeopleView';
import EventDetailView from './views/EventDetailView';
import EventForm from './views/EventView/EventForm';
import HomeView from './views/HomeView';
import test from './components/test';
import ModalManager from './components/modals/ModalManager';

class App extends Component {
  render() {
    return (
      <div>
        <ModalManager />
        <Switch>
          <Route exact path='/' component={HomeView} />
        </Switch>
        <Route
          path='/(.+)'
          render={() => (
            <div>
              <NavBar />
              <Container className='main'>
                <Switch>
                  <Route path='/events/create' component={EventForm} />
                  <Route exact path='/events' component={EventView} />
                  <Route exact path='/events/:id' component={EventDetailView} />
                  <Route path='/events/:id/manage' component=
                  {EventForm} />
                  <Route path='/people' component={PeopleView} />
                  <Route path='/profile/:id' component={ProfileView} />
                  <Route path='/settings' component={SettingsView} />
                  <Route path='/test' component={test} />
                </Switch>
              </Container>
            </div>
          )}
        />
      </div>
    );
  }
}

export default App;
