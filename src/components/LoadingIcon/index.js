import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

const LoadingIcon = ({ inverted }) => {
  return (
    <Dimmer inverted={inverted} active={true}>
      <Loader content='Loading Events...' />
    </Dimmer>
  );
};

export default LoadingIcon;
