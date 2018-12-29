import React, { Component } from 'react';
import { Button, Grid } from 'semantic-ui-react';
import cuid from 'cuid';

import EventList from './EventList';
import EventForm from './EventForm';

const events = [
  {
    id: '1',
    title: 'Trip to Tower of London',
    date: '2018-03-27',
    category: 'culture',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: "Tower of London, St Katharine's & Wapping, London",
    hostedBy: 'Bob',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
    attendees: [
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
      },
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
      }
    ]
  },
  {
    id: '2',
    title: 'Trip to Punch and Judy Pub',
    date: '2018-03-28',
    category: 'drinks',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: 'Punch & Judy, Henrietta Street, London, UK',
    hostedBy: 'Tom',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
    attendees: [
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
      },
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
      }
    ]
  }
];

class EventView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events,
      isActive: false,
      selectedEvent: null
    };
  }

  toggleForm = () => {
    this.setState({ isActive: !this.state.isActive, selectedEvent: null });
  };

  onCreateEvent = event => {
    event.id = cuid();
    event.hostPhotoURL = '/assets/user.png';
    this.setState({
      events: [...this.state.events, event],
      isActive: false
    });
  };

  onUpdateEvent = event => {
    this.setState({
      event: this.state.events.map(previousEvent => {
        if (event.id === previousEvent.id) {
          return { event, ...this.state.events };
        } else {
          return event;
        }
      }),
      isActive: false,
      selectedEvent: null
    });
  };

  onDeleteEvent = id => {
    this.setState({
      events: this.state.events.filter(event => event.id !== id)
    });
  };

  onSelectEvent = event => () => {
    this.setState({
      selectedEvent: event,
      isActive: true
    });
  };

  render() {
    const { events, selectedEvent } = this.state;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            onDeleteEvent={this.onDeleteEvent}
            onSelectEvent={this.onSelectEvent}
            events={events}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <Button positive content='Create Event' onClick={this.toggleForm} />
          {this.state.isActive ? (
            <EventForm
              selectedEvent={selectedEvent}
              onCreateEvent={this.onCreateEvent}
              onUpdateEvent={this.onUpdateEvent}
            />
          ) : null}
        </Grid.Column>
      </Grid>
    );
  }
}

export default EventView;
