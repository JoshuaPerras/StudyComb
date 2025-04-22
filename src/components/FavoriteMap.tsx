'use client';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

// default map center (uga area)
const defaultCenter = {
  lat: 33.9425,
  lng: -83.3724,
};

// custom map styling to hide certain map features
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

export default function FavoriteMap() {
  // get current session and auth status
  const { data: session, status } = useSession();

  // state for fetched favorite locations
  const [favoriteLocations, setFavoriteLocations] = useState([]);
  
  // state for which marker is selected (for infowindow)
  const [selectedMarker, setSelectedMarker] = useState(null);
  
  // state for loading and error feedback
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // load google maps script using api key from env
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    async function fetchFavorites() {
      // only fetch if user is authenticated
      if (status === 'authenticated' && session?.user?.name) {
        try {
          setIsLoading(true);

          // call api route to get user's favorites
          const response = await fetch(`/api/favorites/locations?username=${encodeURIComponent(session.user.name)}`);
         
          if (!response.ok) {
            throw new Error('Failed to fetch favorite locations');
          }
         
          const data = await response.json();
          
          // validate and save locations
          if (data && data.locations && Array.isArray(data.locations)) {
            setFavoriteLocations(data.locations);
          } else {
            console.error('Unexpected data format:', data);
            setFavoriteLocations([]);
          }
        } catch (err) {
          console.error('Error fetching favorites:', err);
          setError('Failed to load your favorite study spots');
        } finally {
          setIsLoading(false);
        }
      } else if (status !== 'loading') {
        // if user is not logged in, stop loading state
        setIsLoading(false);
      }
    }

    fetchFavorites();
  }, [session, status]);

  // loading state for maps library or auth
  if (!isLoaded || (status === 'loading')) {
    return <div className="loading">Loading map...</div>;
  }
  
  // show message if user is not logged in
  if (status === 'unauthenticated') {
    return <div className="not-logged-in">Please log in to see your favorite study spots</div>;
  }
  
  // show error message if there was an issue
  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="mapArea">
      {isLoading ? (
        // show loading while fetching favorites
        <div className="loading">Loading your favorite study spots...</div>
      ) : favoriteLocations.length === 0 ? (
        // no favorites message
        <div className="no-favorites">
          You haven't added any study spots to your favorites yet.
        </div>
      ) : (
        // render map with markers
        <GoogleMap
          center={favoriteLocations.length > 0 ?
            { lat: Number(favoriteLocations[0].lat), lng: Number(favoriteLocations[0].lng) } :
            defaultCenter
          }
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
              key={loc._id || index}
              position={{ lat: Number(loc.lat), lng: Number(loc.lng) }}
              title={loc.name}
              icon="/yellow-dot.png"
              onClick={() => setSelectedMarker(loc)}
            />
          ))}

          {/* show info window if marker is selected */}
          {selectedMarker && (
            <InfoWindow
              position={{ lat: Number(selectedMarker.lat), lng: Number(selectedMarker.lng) }}
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
                  💛 {selectedMarker.name}
                </h3>
                {selectedMarker.location && (
                  <p style={{ margin: '4px 0 0', fontSize: '14px' }}>
                    {selectedMarker.location}
                  </p>
                )}
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      )}
    </div>
  );
}
