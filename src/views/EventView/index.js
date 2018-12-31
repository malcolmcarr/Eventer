import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';

import EventList from './EventList';
import { deleteEvent } from '../../actions/eventActions';
import LoadingIcon from '../../components/LoadingIcon';
import EventActivity from './EventActivity';

const actions = { deleteEvent };

const mapStateToProps = state => ({
  events: state.events,
  loading: state.async.loading
});

class EventView extends Component {
  onDeleteEvent = id => {
    this.props.deleteEvent(id);
  };

  render() {
    const { events, loading } = this.props;

    if (loading) return <LoadingIcon />;

    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            onDeleteEvent={this.onDeleteEvent}
            inverted={false}
            events={events}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventActivity />
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  mapStateToProps,
  actions
)(EventView);
