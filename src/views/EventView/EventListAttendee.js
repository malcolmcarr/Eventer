import React, { Component } from 'react';
import { Image, List } from 'semantic-ui-react';

class EventListAttendee extends Component {
  render() {
    const { name, photoURL } = this.props.attendee;
    return (
      <List.Item>
        <Image as="a" size="mini" circular title={name} src={photoURL} />
      </List.Item>
    )
  }
}

export default EventListAttendee;
