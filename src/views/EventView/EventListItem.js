import React, { Component } from 'react';
import { Button, Icon, Item, Segment, List } from 'semantic-ui-react';
import EventListAttendee from './EventListAttendee';

class EventListItem extends Component {
  render() {
    const { attendees, date, description, title, hostedBy, hostPhotoURL, venue } = this.props.event;
    return (
           <Segment.Group>
              <Segment>
                <Item.Group>
                  <Item>
                    <Item.Image size="tiny" circular src={hostPhotoURL} />
                    <Item.Content>
                      <Item.Header as="a">{title}</Item.Header>
                      <Item.Description>
                        Hosted by <a>{hostedBy}</a>
                      </Item.Description>
                    </Item.Content>
                  </Item>
                </Item.Group>
              </Segment>
              <Segment>
                <span>
                  <Icon name="clock" /> {date} |
                  <Icon name="marker" /> {venue}
                </span>
              </Segment>
              <Segment secondary>
                <List horizontal>
                  {
                    attendees.map(att => {
                      return <EventListAttendee key={att.id} attendee={att} />
                    })
                  }
                </List>
              </Segment>
              <Segment clearing>
                <span>{description}</span>
                <Button as="a" color="teal" floated="right" content="View" />
              </Segment>
            </Segment.Group>
    )
  }
}

export default EventListItem;
