import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import EventListItem from './EventListItem';

class EventList extends Component {
  renderEvents = () => {
    return this.props.events.map(event => {
      return (
        <EventListItem
          key={event.id}
          event={event}
        />
      );
    });
  };

  render() {
    const { events, moreEvents, loading, getMoreEvents } = this.props;
    return (
      <div>
        {events && events.length && (
          <InfiniteScroll
            pageStart={0}
            loadMore={getMoreEvents}
            hasMore={!loading && moreEvents}
            initialLoad={false}
          >
            {events && events.length ? (
              this.renderEvents()
            ) : (
              <p style={{ fontStyle: 'italic' }}>No Events yet</p>
            )}
          </InfiniteScroll>
        )}
      </div>
    );
  }
}

export default EventList;
