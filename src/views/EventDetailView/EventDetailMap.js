import React from 'react';
import { Segment } from 'semantic-ui-react';
import GoogleMapReact from 'google-map-react';

import Marker from '../../components/map/Marker';
import keys from '../../credentials/keys';

const EventDetailMap = ({ lat, lng }) => {
  const center = [lat, lng];
  const zoom = 14;
  return (
    <Segment attached='bottom'>
      <div style={{ height: '300px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: keys.googleAPIKey }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          <Marker lat={lat} lng={lng} />
        </GoogleMapReact>
      </div>
    </Segment>
  );
};

export default EventDetailMap;
