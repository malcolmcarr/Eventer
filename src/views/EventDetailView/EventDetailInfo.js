import React, { Component } from 'react';
import { Button, Grid, Icon, Segment } from 'semantic-ui-react';
import format from 'date-fns/format';

import EventDetailMap from './EventDetailMap';

class EventDetailInfo extends Component {
  state = {
    showMap: false
  };

  showMapToggle = () => {
    this.setState(prevState => ({
      showMap: !prevState.showMap
    }));
  };

  render() {
    const { event } = this.props;
    return (
      <div>
        <Segment.Group>
          <Segment attached='top'>
            <Grid>
              <Grid.Column width={1}>
                <Icon size='large' color='teal' name='info' />
              </Grid.Column>
              <Grid.Column width={15}>
                <p>{event.description}</p>
              </Grid.Column>
            </Grid>
          </Segment>
          <Segment attached>
            <Grid verticalAlign='middle'>
              <Grid.Column width={1}>
                <Icon name='calendar' size='large' color='teal' />
              </Grid.Column>
              <Grid.Column width={15}>
                <span>{format(event.date, 'dddd Do MMMM')} at{' '} {format(event.date, 'h:mm a')}</span>
              </Grid.Column>
            </Grid>
          </Segment>
          <Segment attached>
            <Grid verticalAlign='middle'>
              <Grid.Column width={1}>
                <Icon name='marker' size='large' color='teal' />
              </Grid.Column>
              <Grid.Column width={11}>
                <span>{event.venue}</span>
              </Grid.Column>
              <Grid.Column width={4}>
                <Button onClick={this.showMapToggle} color='teal' size='tiny' content={this.state.showMap ?'Hide Map' : 'Show Map'} />
              </Grid.Column>
            </Grid>
          </Segment>
            {this.state.showMap && <EventDetailMap lat={event.venueLocation.lat} lng={event.venueLocation.lng}/>}
        </Segment.Group>
      </div>
    );
  }
}

export default EventDetailInfo;
