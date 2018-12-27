import React, { Component } from 'react';
import EventListItem from './EventListItem';

class EventList extends Component {
  renderEvents = () => {
    return this.props.events.map(event => {
      return (
        <EventListItem
          onDeleteEvent={this.props.onDeleteEvent}
          onSelectEvent={this.props.onSelectEvent}
          key={event.id}
          event={event}
        />
      );
    });
  };

  render() {
    return (
      <div>
        <h1>Events</h1>
        {this.props.events.length ? this.renderEvents() : <p style={{"fontStyle": "italic"}}>No Events yet</p>}
      </div>
    );
  }
}

export default EventList;
