'use client';

import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import { useState } from 'react';

const firstPoint = {
  lat: 33.9425,
  lng: -83.3724,
};

const mapStyles = [
  {
    featureType: 'poi',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'transit',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'road',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
];

export default function FavoriteMap({ favoriteLocations }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const [selectedMarker, setSelectedMarker] = useState(null);

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div className="mapArea">
      <GoogleMap
        center={firstPoint}
        mapContainerClassName="map"
        zoom={14}
        options={{
          styles: mapStyles,
          disableDefaultUI: false,
        }}
        onClick={() => setSelectedMarker(null)}
      >
        {favoriteLocations.map((loc, index) => (
          <Marker
            key={index}
            position={{ lat: loc.lat, lng: loc.lng }}
            title={loc.name}
            icon="/yellow-dot.png"
            onClick={() => setSelectedMarker(loc)}
          />
        ))}

        {selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div
              style={{
                maxWidth: '200px',
                fontFamily: 'Geist',
                color: '#333',
                padding: '8px',
              }}
            >
              <h3 style={{ margin: 0, fontSize: '16px', color: '#e91e63' }}>
                💛{selectedMarker.name}
              </h3>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}
