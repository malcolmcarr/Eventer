import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import EventDetailHeader from './EventDetailHeader';
import EventDetailInfo from './EventDetailInfo';
import EventDetailChat from './EventDetailChat';
import EventDetailSidebar from './EventDetailSidebar';
import { withFirestore, firebaseConnect, isEmpty } from 'react-redux-firebase';
import { createDataTree, objectToArray } from '../../util/helpers';
import { setUserGoing, setUserNotGoing } from '../../actions/userActions';
import { addEventComment } from '../../actions/eventActions';

const actions = {
  setUserGoing,
  setUserNotGoing,
  addEventComment
};

const mapStateToProps = (state, ownProps) => {
  if (state.firestore.ordered.events && state.firestore.ordered.events[0])
    return {
      event: state.firestore.ordered.events[0],
      auth: state.firebase.auth,
      eventChat:
        !isEmpty(state.firebase.data.event_chat) && !isEmpty(state.firebase.data.event_chat[ownProps.match.params.id]) &&
        objectToArray(state.firebase.data.event_chat[ownProps.match.params.id])
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
    const {
      event,
      auth,
      setUserGoing,
      setUserNotGoing,
      addEventComment,
      eventChat
    } = this.props;
    const attendees = objectToArray(event.attendees);
    const isHost = event.hostUID === auth.uid;
    const isGoing = attendees && attendees.some(a => a.id === auth.uid);
    const commentTree = !isEmpty(eventChat) && createDataTree(eventChat)

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
          <EventDetailChat
            addEventComment={addEventComment}
            eventId={event.id}
            eventChat={commentTree}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventDetailSidebar event={event} attendees={attendees} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default compose(
  withFirestore,
  connect(
    mapStateToProps,
    actions
  ),
  firebaseConnect(props => [`event_chat/${props.match.params.id}`])
)(EventDetailView);
