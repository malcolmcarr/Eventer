import React, { Component } from 'react';
import EventListItem from './EventListItem';

class EventList extends Component {
  renderEvents = () => {
    return this.props.events.map(event => {
      return <EventListItem key={event.id} event={event} />;
    });
  };

  render() {
    return (
      <div>
        <h1>Events</h1>
        {this.renderEvents()}
      </div>
    );
  }
}

export default EventList;
