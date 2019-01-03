import React from 'react';
import { Item, Label, List, Segment } from 'semantic-ui-react';

const displayAttendees = (attendees, event) =>
  attendees && attendees.map((attendee, i) => (
    <Segment attached>
      <List relaxed divided>
        <Item key={i} style={{ position: 'relative' }}>
          {attendee.displayName === event.hostedBy && (
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
              <a>{attendee.displayName}</a>
            </Item.Header>
          </Item.Content>
        </Item>
      </List>
    </Segment>
  ));

  const displayNumAttending = attendees => {
    if (!attendees || !attendees.length) {
      return '0 people are going';
    } else if (attendees && attendees.length === 1) {
      return '1 person is going';
    } else {
      return `${attendees.length} people are going`;
    }
  }

const EventDetailSidebar = ({ attendees, event }) => {
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
        {displayNumAttending(attendees)}
      </Segment>
      {displayAttendees(attendees, event)}
    </div>
  );
};

export default EventDetailSidebar;
