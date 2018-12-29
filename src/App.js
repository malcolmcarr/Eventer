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

class App extends Component {
  render() {
    return (
      <div>
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
                  <Route path='/events' component={EventView} />
                  <Route path='/event/:id' component={EventDetailView} />
                  <Route path='/people' component={PeopleView} />
                  <Route path='/profile:id' component={ProfileView} />
                  <Route path='/settings' component={SettingsView} />
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
