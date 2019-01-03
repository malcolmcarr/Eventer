import React from 'react';
import { Image, Item, Button, Segment, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';

const eventImageStyle = {
  filter: 'brightness(30%)'
};

const eventImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white'
};

const EventDetailHeader = ({ event, isHost, isGoing, setUserGoing, setUserNotGoing }) => {
  return (
    <div>
      <Segment.Group>
        <Segment basic attached='top' style={{ padding: '0' }}>
          <Image
            src={`/assets/categoryImages/${event.category}.jpg`}
            fluid
            style={eventImageStyle}
          />

          <Segment basic style={eventImageTextStyle}>
            <Item.Group>
              <Item>
                <Item.Content>
                  <Header
                    size='huge'
                    content={`${event.title}`}
                    style={{ color: 'white' }}
                  />
                  <p>
                    {event.date && format(event.date.toDate(), 'dddd Do MMMM')} at{' '}
                    {event.date && format(event.date.toDate(), 'h:mm a')}
                  </p>
                  <p>
                    Hosted by <strong>{event.hostedBy}</strong>
                  </p>
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
        </Segment>

        <Segment attached='bottom'>
          {isGoing && !isHost && <Button onClick={() => setUserNotGoing(event)}>Cancel My Place</Button>}
          {!isGoing && !isHost && (
            <Button color='teal' onClick={() => setUserGoing(event)}>
              JOIN THIS EVENT
            </Button>
          )}
          {isHost && (
            <Button
              as={Link}
              to={`/events/${event.id}/manage`}
              color='orange'
              // floated='right'
            >
              Manage Event
            </Button>
          )}
        </Segment>
      </Segment.Group>
    </div>
  );
};

export default EventDetailHeader;
