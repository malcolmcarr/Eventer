import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';

import EventDetailHeader from './EventDetailHeader';
import EventDetailInfo from './EventDetailInfo';
import EventDetailChat from './EventDetailChat';
import EventDetailSidebar from './EventDetailSidebar';
import { withFirestore } from 'react-redux-firebase';
import { objectToArray } from '../../util/helpers';
import { setUserGoing, setUserNotGoing } from '../../actions/userActions';

const actions = {
  setUserGoing,
  setUserNotGoing
};

const mapStateToProps = state => {
  if (state.firestore.ordered.events && state.firestore.ordered.events[0])
    return {
      event: state.firestore.ordered.events[0],
      auth: state.firebase.auth
    };

  return { event: {}, auth: state.firebase.auth };
};

class EventDetailView extends Component {
  async componentDidMount() {
    const { firestore, match } = this.props;
    await firestore.setListener(`events/${match.params.id}`);
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
  }

  render() {
    const { event, auth, setUserGoing, setUserNotGoing } = this.props;
    const attendees = objectToArray(event.attendees);
    const isHost = event.hostUID === auth.uid;
    const isGoing = attendees && attendees.some(a => a.id === auth.uid);

    return (
      <Grid>
        <Grid.Column width={10}>
          <EventDetailHeader
            setUserNotGoing={setUserNotGoing}
            setUserGoing={setUserGoing}
            isGoing={isGoing}
            isHost={isHost}
            event={event}
          />
          <EventDetailInfo event={event} />
          <EventDetailChat />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventDetailSidebar event={event} attendees={attendees} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default withFirestore(
  connect(
    mapStateToProps,
    actions
  )(EventDetailView)
);
