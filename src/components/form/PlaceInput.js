import React, { Component } from 'react';
import { Form, Label } from 'semantic-ui-react';
import Script from 'react-load-script';
import Geosuggest from 'react-geosuggest';

import keys from '../../credentials/keys';

class PlaceInput extends Component {
  state = {
    scriptLoaded: false
  };

  onScriptLoad = () => {
    this.setState({ scriptLoaded: true });
  };

  render() {
    const {
      input,
      width,
      onSelect,
      placeholder,
      options,
      meta: { touched, error },
      ...rest
    } = this.props;
    return (
      <Form.Field error={touched && !!error} width={width}>
        <Script
          url={`https://maps.googleapis.com/maps/api/js?key=${
            keys.googleAPIKey
          }&libraries=places`}
          onLoad={this.onScriptLoad}
        />
        {this.state.scriptLoaded && (
          <Geosuggest
            {...input}
            placeholder={placeholder}
            onSuggestSelect={this.props.onSuggestSelect}
            onSelect={onSelect}
            // {...rest}
          />
        )}
        {touched && error && (
          <Label basic color='red'>
            {error}
          </Label>
        )}
      </Form.Field>
    );
  }
}

export default PlaceInput;
