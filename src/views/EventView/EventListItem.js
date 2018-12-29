import React, { Component } from 'react';
import { Button, Icon, Item, Segment, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

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
      venue
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
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name='clock' /> {date} |
            <Icon name='marker' /> {venue}
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {attendees
              ? attendees.map(att => {
                  return <EventListAttendee key={att.id} attendee={att} />;
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
