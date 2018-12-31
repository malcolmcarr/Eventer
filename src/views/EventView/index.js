import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';

import EventList from './EventList';
import { createEvent, deleteEvent, updateEvent } from '../../actions/eventActions';

const actions = {
  createEvent,
  deleteEvent,
  updateEvent
};

const mapStateToProps = state => ({
  events: state.events
});

class EventView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      selectedEvent: null
    };
  }

  onDeleteEvent = id => {
    this.props.deleteEvent(id);
  };

  onSelectEvent = event => () => {
    this.setState({
      selectedEvent: event,
      isActive: true
    });
  };

  render() {
    const { events } = this.props;

    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            onDeleteEvent={this.onDeleteEvent}
            events={events}
          />
        </Grid.Column>
        <Grid.Column width={6}>

        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  mapStateToProps,
  actions
)(EventView);
