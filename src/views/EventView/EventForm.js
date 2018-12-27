import React, { Component } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';

class EventForm extends Component {
  state = {
    event: {
      title: '',
      date: '',
      city: '',
      venue: '',
      hostedBy: ''
    }
  };
  onFormSubmit = e => {
    e.preventDefault();
    this.props.onCreateEvent(this.state.event);
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
              placeholder='City event is taking place'
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
            Submit
          </Button>
          <Button type='button'>Cancel</Button>
        </Form>
      </Segment>
    );
  }
}

export default EventForm;
