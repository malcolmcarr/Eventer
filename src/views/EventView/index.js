import React, { Component } from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import EventList from './EventList';
import { getEventsForDashboard } from '../../actions/eventActions';
import LoadingIcon from '../../components/LoadingIcon';
import EventActivity from './EventActivity';
import { arraysAreEqual } from '../../util/helpers';

const actions = { getEventsForDashboard };

const mapStateToProps = state => ({
  events: state.events,
  loading: state.async.loading
});

class EventView extends Component {
  state = {
    moreEvents: false,
    initialLoad: true,
    cachedEvents: []
  };


  componentDidUpdate(prevProps) {
    if (!arraysAreEqual(prevProps.events, this.state.cachedEvents)) {
      this.setState({
        cachedEvents: [...this.state.cachedEvents, ...this.props.events]
      }) 
  } 
}

  async componentDidMount() {    
    let next = await this.props.getEventsForDashboard();

    if (next && next.docs && next.docs.length > 1) {
      this.setState({
        moreEvents: true,
        initialLoad: false
      });
    }
  }

  getMoreEvents = async () => {

    const { events } = this.props;
    let lastEvent = events && events[events.length - 1];

    let next = await this.props.getEventsForDashboard(lastEvent);

    if (next && next.docs && next.docs.length <= 1) {
      this.setState({
        moreEvents: false
      });
    }
  };

  render() {
    const { loading } = this.props;
    const { initialLoad, cachedEvents, moreEvents } = this.state;
    if (initialLoad) return <LoadingIcon inverted />;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            loading={loading}
            moreEvents={moreEvents}
            getMoreEvents={this.getMoreEvents}
            inverted={false}
            events={cachedEvents}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventActivity />
        </Grid.Column>
        <Grid.Column width={10}>
          <Loader active={loading} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  mapStateToProps,
  actions
)(firestoreConnect([{ collection: 'events' }])(EventView));
