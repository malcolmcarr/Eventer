import React, { Component } from 'react';
import { Button, Icon, Item, Segment, List, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';

import EventListAttendee from './EventListAttendee';

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
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size='tiny' circular src={hostPhotoURL} />
              <Item.Content>
                <Item.Header as='a'>{title}</Item.Header>
                <Item.Description>
                  Hosted by <a>{hostedBy}</a>
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
            {attendees
              ? Object.values(attendees).map((att, index) => {
                  return <EventListAttendee key={index} attendee={att} />;
                })
              : null}
          </List>
        </Segment>
        <Segment clearing>
          <span>{description}</span>
          <Button
            onClick={() => this.props.onDeleteEvent(id)}
            as='a'
            color='red'
            floated='right'
            content='Delete'
          />
          <Button
            as={Link}
            to={`/events/${id}`}
            color='teal'
            floated='right'
            content='View'
          />
        </Segment>
      </Segment.Group>
    );
  }
}

export default EventListItem;
