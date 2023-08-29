import React, { useState, useEffect } from "react";
import Sidebar from '../Sidebar';
import { GoogleMap, useJsApiLoader, Marker, InfoWindowF } from "@react-google-maps/api";
import { Library } from "@googlemaps/js-api-loader";
import { GOOGLE_MAPS_API_KEY, GOOGLE_MAPS_API_ID } from '../config'

const containerStyle = {
  height: "76%",
  width: "88%",
  maxWidth: "1200px",
  borderRadius: "5px",
};

function Search() {
  const [restaurants, setRestaurants] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);
  const [ libraries ] = useState<Library[]>(['places'])

  const handleActiveMarker = (marker: any) => {
    setActiveMarker(null)
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const handleOnLoad = (map: any) => {
    const bounds = new google.maps.LatLngBounds();
    restaurants.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };

  const { isLoaded } = useJsApiLoader({
    id: GOOGLE_MAPS_API_ID,
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    if (isLoaded) {
      fetchNearbyRestaurants();
    }
  }, [isLoaded]);

  const fetchNearbyRestaurants = async () => {
    try {
      const response = await fetch(`/api/map`);

      const data = await response.json();
      console.log(data.results); // Store the fetched restaurants
      setRestaurants(data.results)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const center = {
    lat: 43.45,
    lng: -80.49,
  };

  const [map, setMap] = useState(null);

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <div className='flex h-screen bg-gray-50'>
      <Sidebar />
      <div className='ml-80 p-20 pt-24 w-full'>
        <GoogleMap
          mapContainerStyle={containerStyle}
          onLoad={handleOnLoad}
          center={center}
          zoom={12}
          onUnmount={onUnmount}
          onClick={() => setActiveMarker(null)}
          options={{ 
            styles: [
              {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }],
              },
            ],
          }}
        >
          {restaurants.map((location: any, index) => {
            return (
              <Marker
                key={index}
                position={{ lat: location.geometry.location.lat, lng: location.geometry.location.lng}}
                label={{
                  text: `${index + 1}`, // Show marker index as label
                  color: 'white', // Label text color
                }}
                title={`Location ${index + 1}`}
                onClick={() => handleActiveMarker(index)}
              >
                {activeMarker === index ? (
                  <InfoWindowF 
                    onCloseClick={() => {
                      setActiveMarker(null)
                    }}
                  >
                    <span>Info about Location</span>
                  </InfoWindowF>
                ) : null}
              </Marker>
            )
          })}
        </GoogleMap>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(Search);
