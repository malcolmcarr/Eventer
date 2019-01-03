import React, { Component } from 'react';
import { Icon, Item, Segment, List, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';

import EventListAttendee from './EventListAttendee';
import { objectToArray } from '../../util/helpers';

class EventListItem extends Component {
  render() {
    const {
      id,
      attendees,
      date,
      description,
      title,
      hostedBy,
      hostPhotoURL,
      venue,
      cancelled
    } = this.props.event;
    const { event } = this.props;
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size='tiny' circular src={hostPhotoURL} />
              <Item.Content>
                <Item.Header as={Link} to={`/events/${id}`}>{title}</Item.Header>
                <Item.Description>
                  Hosted by <Link to={`/profile/${event.hostUID}`}>{hostedBy}</Link>
                </Item.Description>
                {cancelled && (
                  <Label
                    style={{ top: '-40px' }}
                    ribbon='right'
                    color='red'
                    content='Cancelled'
                  />
                )}
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name='clock' /> {format(date, 'dddd Do MMMM')} at{' '}
            {format(date, 'h:mm a')} |
            <Icon name='marker' /> {venue}
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {attendees &&
               objectToArray(attendees).map(att => {
                  return <EventListAttendee key={att.id} attendee={att} />;
                })}
          </List>
        </Segment>
        <Segment clearing>
          <span>{description}</span>
        </Segment>
      </Segment.Group>
    );
  }
}

export default EventListItem;
