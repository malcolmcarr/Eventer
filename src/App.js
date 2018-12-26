import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

import EventView from './views/EventView';
import NavBar from './components/NavBar';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Container className='main'>
          <EventView />
        </Container>
      </div>
    );
  }
}

export default App;
