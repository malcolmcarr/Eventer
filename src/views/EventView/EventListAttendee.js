import React, { Component } from 'react';
import { Image, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class EventListAttendee extends Component {
  render() {
    const { name, photoURL } = this.props.attendee;
    const { attendee } = this.props;
    return (
      <List.Item>
        <Image as={Link} to={`/profile/${attendee.id}`} size="mini" circular title={name} src={photoURL} />
      </List.Item>
    )
  }
}

export default EventListAttendee;
