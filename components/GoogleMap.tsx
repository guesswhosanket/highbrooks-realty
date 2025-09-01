import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

interface MapProps {
  center: {
    lat: number;
    lng: number;
  };
  alternatives?: Array<{
    name: string;
    address: string;
    lat: number;
    lng: number;
    score?: number;
  }>;
}

const containerStyle = {
  width: '100%',
  height: '500px'
};

const GoogleMapComponent: React.FC<MapProps> = ({ center, alternatives = [] }) => {
  const [activeMarker, setActiveMarker] = useState<number | null>(null);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || ''
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    alternatives.forEach(location => {
      // Ensure coordinates are numbers (handle string conversion if needed)
      const lat = typeof location.lat === 'number' ? location.lat : parseFloat(location.lat as string);
      const lng = typeof location.lng === 'number' ? location.lng : parseFloat(location.lng as string);
      
      if (!isNaN(lat) && !isNaN(lng)) {
        bounds.extend({ lat, lng });
      }
    });
    map.fitBounds(bounds);
  }, [center, alternatives]);

  const handleMarkerClick = (markerIndex: number) => {
    setActiveMarker(markerIndex);
  };

  const handleInfoWindowClose = () => {
    setActiveMarker(null);
  };

  if (!isLoaded) return <div className="h-96 bg-gray-100 flex items-center justify-center">Loading map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={14}
      onLoad={onLoad}
    >
      {/* Main location marker */}
      <Marker
        position={center}
        icon={{
          url: '/pin-primary.svg',
          scaledSize: new window.google.maps.Size(40, 40)
        }}
        onClick={() => handleMarkerClick(-1)}
      >
        {activeMarker === -1 && (
          <InfoWindow onCloseClick={handleInfoWindowClose}>
            <div className="p-2">
              <h3 className="font-semibold">Selected Location</h3>
              <p>Your analyzed location</p>
            </div>
          </InfoWindow>
        )}
      </Marker>

      {/* Alternative locations */}
      {alternatives.map((location, index) => (
        <Marker
          key={index}
          position={{ lat: location.lat, lng: location.lng }}
          icon={{
            url: '/pin-alternative.svg',
            scaledSize: new window.google.maps.Size(32, 32)
          }}
          onClick={() => handleMarkerClick(index)}
        >
          {activeMarker === index && (
            <InfoWindow onCloseClick={handleInfoWindowClose}>
              <div className="p-2">
                <h3 className="font-semibold">{location.name}</h3>
                <p className="text-sm">{location.address}</p>
                {location.score && (
                  <p className="text-sm mt-1">
                    Suitability score: <span className="font-semibold">{location.score}/10</span>
                  </p>
                )}
              </div>
            </InfoWindow>
          )}
        </Marker>
      ))}
    </GoogleMap>
  );
};

export default React.memo(GoogleMapComponent);
