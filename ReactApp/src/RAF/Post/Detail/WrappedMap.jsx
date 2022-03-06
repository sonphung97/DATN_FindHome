import React, { useState } from 'react';

// components
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
} from 'react-google-maps';

const WrappedMap = (props) => {
  const { location } = props;
  const [initLocation] = useState(location || {
    lat: 21.017374,
    lng: 105.859521,
  });

  return (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={initLocation} // Show center point
    >
      {location && <Marker
        position={location}
      />}
    </GoogleMap>
  );
};

const _WrappedMap = withScriptjs(withGoogleMap(WrappedMap));
export default _WrappedMap;