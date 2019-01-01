import React from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';

import EventDetailHeader from './EventDetailHeader';
import EventDetailInfo from './EventDetailInfo';
import EventDetailChat from './EventDetailChat';
import EventDetailSidebar from './EventDetailSidebar';

const mapStateToProps = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  if (eventId && state.events.length) {
    for (let event of state.events) {
      if (event.id === eventId)   return { event };
    }
  }
  return { event: {} };
};

const EventDetailView = ({ event }) => {
  if (!event.venue) return <h1>Nothing is here :(</h1>

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailHeader event={event} />
        <EventDetailInfo event={event} />
        <EventDetailChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailSidebar attendees={event.attendees} />
      </Grid.Column>
    </Grid>
  );
};

export default connect(mapStateToProps)(EventDetailView);
