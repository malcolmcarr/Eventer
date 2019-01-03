import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';

import EventList from './EventList';
import { deleteEvent } from '../../actions/eventActions';
import LoadingIcon from '../../components/LoadingIcon';
import EventActivity from './EventActivity';

const actions = { deleteEvent };

const mapStateToProps = state => ({
  events: state.firestore.ordered.events,
});

class EventView extends Component {
  onDeleteEvent = id => {
    this.props.deleteEvent(id);
  };

  render() {
    const { events, loading } = this.props;
    if (!isLoaded(events) || isEmpty(events)) return <LoadingIcon inverted />
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
)(firestoreConnect([{ collection: 'events' }])(EventView));
