import React from 'react';
import { Item, Label, List, Segment } from 'semantic-ui-react';

const displayAttendees = attendees =>
  attendees.map(attendee => (
    <Segment attached>
      <List relaxed divided>
        <Item key={attendee.id} style={{ position: 'relative' }}>
          {attendee.name === attendees.hostedBy && (
            <Label
              style={{ position: 'absolute' }}
              color='orange'
              ribbon='right'
            >
              Host
            </Label>
          )}
          <Item.Image size='tiny' src={attendee.photoURL} />
          <Item.Content verticalAlign='middle'>
            <Item.Header as='h3'>
              <a>{attendee.name}</a>
            </Item.Header>
          </Item.Content>
        </Item>
      </List>
    </Segment>
  ));

const EventDetailSidebar = ({ attendees }) => {
  return (
    <div>
      <Segment
        textAlign='center'
        style={{ border: 'none' }}
        attached='top'
        secondary
        inverted
        color='teal'
      >
        {attendees && attendees.length}{' '}
        {attendees && attendees.length === 1 ? 'person is' : 'people are'} going
      </Segment>
      {displayAttendees(attendees)}
    </div>
  );
};

export default EventDetailSidebar;