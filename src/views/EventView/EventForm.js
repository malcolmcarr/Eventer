import React, { Component } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import cuid from 'cuid';

import { createEvent, updateEvent } from '../../actions';

const actions = {
  createEvent,
  updateEvent
};

const mapStateToProps = (state, ownProps) => {
  const eventId = ownProps.match ? ownProps.match.params.id : undefined;

  let defaultEvent = {
    title: '',
    date: '',
    city: '',
    venue: '',
    hostedBy: ''
  };

  if (eventId && state.events.length) {
    for (let event of state.events) {
      if (event.id === eventId) return { event };
    }
  }

  return { event: defaultEvent };
};

class EventForm extends Component {
  state = { event: { ...this.props.event } };

  onFormSubmit = e => {
    e.preventDefault();

    // Check if an event is being updated or newly created
    if (this.props.event.id) {
      this.props.updateEvent(this.state.event);
      this.props.history.goBack();
    } else {
      const newEvent = {
        ...this.state.event,
        id: cuid(),
        hostPhotoURL: '/assets/user.png'
      };
      this.props.createEvent(newEvent);
      this.props.history.push('/events');
    }
  };

  onInputChange = e => {
    let oldState = this.state.event;
    oldState[e.target.name] = e.target.value;
    this.setState({
      ...oldState
    });
  };

  render() {
    const { title, date, city, venue, hostedBy } = this.state.event;
    return (
      <Segment>
        <Form onSubmit={this.onFormSubmit}>
          <Form.Field>
            <label>Event Title</label>
            <input
              name='title'
              onChange={this.onInputChange}
              value={title}
              placeholder='Event Title'
            />
          </Form.Field>
          <Form.Field>
            <label>Event Date</label>
            <input
              name='date'
              onChange={this.onInputChange}
              type='date'
              value={date}
              placeholder='Event Date'
            />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input
              name='city'
              onChange={this.onInputChange}
              value={city}
              placeholder='City the event is taking place'
            />
          </Form.Field>
          <Form.Field>
            <label>Venue</label>
            <input
              name='venue'
              onChange={this.onInputChange}
              value={venue}
              placeholder='Enter the Venue of the event'
            />
          </Form.Field>
          <Form.Field>
            <label>Hosted By</label>
            <input
              name='hostedBy'
              onChange={this.onInputChange}
              value={hostedBy}
              placeholder='Enter the name of person hosting'
            />
          </Form.Field>
          <Button positive type='submit'>
            {this.props.match && this.props.match.params.id ? 'Save' : 'Create'}
          </Button>
          <Button onClick={this.props.history.goBack} type='button'>Cancel</Button>
        </Form>
      </Segment>
    );
  }
}

export default connect(
  mapStateToProps,
  actions
)(EventForm);
