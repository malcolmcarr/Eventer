import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'

import keys from '../credentials/keys'
import { Icon } from 'semantic-ui-react';

const Marker = () => <Icon name='marker' size='big' color='red' />
 
class test extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '300px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: keys.googleAPIKey }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <Marker
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default test;


