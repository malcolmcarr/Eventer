/*global google*/
import React, { Component } from 'react';
import { Button, Grid, Header, Form, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import cuid from 'cuid';
import { combineValidators, isRequired } from 'revalidate';
import Script from 'react-load-script';

import { createEvent, updateEvent } from '../../actions';
import TextInput from '../../components/form/TextInput';
import TextArea from '../../components/form/TextArea';
import SelectInput from '../../components/form/SelectInput';
import DateInput from '../../components/form/DateInput';
import PlaceInput from '../../components/form/PlaceInput';
import keys from '../../credentials/keys';

const actions = {
  createEvent,
  updateEvent
};

const categories = [
  { key: 'drinks', text: 'Drinks', value: 'drinks' },
  { key: 'culture', text: 'Culture', value: 'culture' },
  { key: 'film', text: 'Film', value: 'film' },
  { key: 'food', text: 'Food', value: 'food' },
  { key: 'music', text: 'Music', value: 'music' },
  { key: 'travel', text: 'Travel', value: 'travel' }
];

const validate = combineValidators({
  title: isRequired({ message: 'Please enter a title for the event.' }),
  category: isRequired({ message: 'Please select a category.' }),
  city: isRequired({ message: 'Please enter a city.' }),
  venue: isRequired({ message: 'Please enter a venue.' })
});

const mapStateToProps = (state, ownProps) => {
  const eventId = ownProps.match ? ownProps.match.params.id : undefined;

  let defaultEvent = {};

  if (eventId && state.events.length) {
    for (let event of state.events) {
      if (event.id === eventId) return { initialValues: event };
    }
  }

  return { initialValues: defaultEvent };
};

class EventForm extends Component {
  state = {
    cityLocation: null,
    venueLocation: null,
    scriptLoaded: false
  };

  onCitySelect = suggestion => {
    if (suggestion) {
      // Fix to make sure selected value is updated in store
      this.props.change('city', suggestion.description);
      suggestion && this.setState({ cityLocation: suggestion.location });
    }
  };

  onVenueSelect = suggestion => {
    if (suggestion) {
      // Fix to make sure selected value is updated in store
      this.props.change('venue', suggestion.description); 
      suggestion && this.setState({ venueLocation: suggestion.location });
    }
  };

  onFormSubmit = values => {
    // Convert object to string for for React, if provided
    if (values.date) values.date = values.date.toString();
    values.venueLocation = this.state.venueLocation;
    const { initialValues } = this.props;
    // Check if an event is being updated or newly created
    if (initialValues.id) {
      this.props.updateEvent(values);
      this.props.history.goBack();
    } else {
      const newEvent = {
        ...values,
        id: cuid(),
        hostPhotoURL: '/assets/user.png',
        hostedBy: 'Charlie'
      };
      this.props.createEvent(newEvent);
      this.props.history.push('/events');
    }
  };

  onScriptLoad = () => {
    this.setState({ scriptLoaded: true });
  };

  render() {
    const { invalid, submitting, pristine } = this.props;
    const { cityLocation } = this.state;
    return (
      <Grid>
        <Script
          url={`https://maps.googleapis.com/maps/api/js?key=${
            keys.googleAPIKey
          }&libraries=places`}
          onLoad={this.onScriptLoad}
        />
        <Grid.Column width={10}>
          <Segment>
            <Header sub color='teal' content='Event details' />
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
              <Field
                name='title'
                type='text'
                component={TextInput}
                placeholder='What is the name of your event?'
              />
              <Field
                name='category'
                type='text'
                options={categories}
                component={SelectInput}
                placeholder='What kind of event is it?'
              />
              <Field
                name='description'
                type='text'
                rows={3}
                component={TextArea}
                placeholder='How would you describe your event?'
              />
              <Header sub color='teal' content='Event location details' />
              <Field
                name='city'
                type='text'
                component={PlaceInput}
                types={['(cities)']}
                placeholder='What city is this taking place in?'
                onSuggestSelect={this.onCitySelect}
              />
              {this.state.scriptLoaded && (
                <Field
                  name='venue'
                  type='text'
                  component={PlaceInput}
                  types={['establishment']}
                  location={new google.maps.LatLng(cityLocation)}
                  radius='1000'
                  placeholder='What venue will your event be held at?'
                  onSuggestSelect={this.onVenueSelect}
                />
              )}
              <Field
                name='date'
                type='text'
                component={DateInput}
                placeholder='When is your event?'
                timeIntervals={15}
                dateFormat='MMMM d, yyyy h:mm aa'
                timeFormat='HH:mm'
                showTimeSelect
              />
              <Button
                positive
                type='submit'
                disabled={invalid || submitting || pristine}
              >
                {this.props.match && this.props.match.params.id
                  ? 'Update'
                  : 'Create'}
              </Button>
              <Button
                // Send location based on whether updating or creating
                onClick={
                  this.props.match.params.id
                    ? this.props.history.goBack
                    : () => this.props.history.push('/events')
                }
                type='button'
              >
                Cancel
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  mapStateToProps,
  actions
)(
  reduxForm({ form: 'eventForm', enableReinitialize: true, validate })(
    EventForm
  )
);
