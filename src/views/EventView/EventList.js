import React, { Component } from 'react';

import EventListItem from './EventListItem';

class EventList extends Component {
  renderEvents = () => {
    return this.props.events.map(event => {
      return (
        <EventListItem
          key={event.id}
          onDeleteEvent={this.props.onDeleteEvent}
          event={event}
        />
      );
    });
  };

  render() {
    const { events } = this.props;
    return (
      <div>
        {/* <h1>Events</h1> */}
        {events && events.length ? (
          this.renderEvents()
        ) : (
          <p style={{ fontStyle: 'italic' }}>No Events yet</p>
        )}
      </div>
    );
  }
}

export default EventList;
