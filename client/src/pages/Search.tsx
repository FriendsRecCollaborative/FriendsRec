import React, { useState, useEffect } from "react";
import Sidebar from '../Sidebar';
import { GoogleMap, useJsApiLoader, Marker, InfoWindowF } from "@react-google-maps/api";
import { Library } from "@googlemaps/js-api-loader";
import MapSearchBar from "../MapSearchBar";
import SearchModal from "../SearchModal";

const containerStyle = {
  height: "76%",
  width: "88%",
  maxWidth: "1200px",
  borderRadius: "5px",
};

function Search() {
  const [restaurants, setRestaurants] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);
  const [center, setCenter] = useState({ lat: 40.71, lng: -74.00 }); // Default center
  const [zipOrAddress, setZipOrAddress] = useState('')
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
    id: process.env.REACT_APP_GOOGLE_MAPS_API_ID,
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    if (isLoaded) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: zipOrAddress }, (results, status) => {
        if (results) {
          if (status === 'OK' && results.length > 0) {
            setCenter({
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng(),
            });
          }
        }
      })
      fetchNearbyRestaurants();
    }
  }, [isLoaded, zipOrAddress]);

  const fetchNearbyRestaurants = async () => {
    try {
      const response = await fetch(`/api/map`, {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({location: center})
      })

      const data = await response.json();
      console.log(data.results); // Store the fetched restaurants
      setRestaurants(data.results)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const [map, setMap] = useState(null);

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <div className='flex h-screen bg-gray-50'>
      <Sidebar />
      <div className='ml-80 p-20 pt-24 w-full'>
        <MapSearchBar setZipOrAddress={setZipOrAddress} zipOrAddress={zipOrAddress} setCenter={setCenter} center={center} setRestaurants={setRestaurants} />
        <GoogleMap
          mapContainerStyle={containerStyle}
          // onLoad={handleOnLoad}
          center={center}
          zoom={15}
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
                    onCloseClick={() => setActiveMarker(null)}
                  >
                    <div className='flex-col'>
                      <div className='font-bold text-sm'>{location.name}</div>
                      <div className='flex'>
                        <svg className="w-4 h-4 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="rgb(2 132 199)" viewBox="0 0 22 20">
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <div className='text-sm'>{location.rating}</div>
                      </div>
                      <div className='flex'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgb(2 132 199)" className="w-4 h-4">
                          <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                        </svg>
                        <div className='text-sm'>{location.vicinity}</div>
                      </div>
                      <button className="text-sky-600 active:bg-sky-600 active:text-white font-bold uppercase text-xs px-4 py-2 rounded-full border-sky-600 border shadow hover:shadow-lg outline-none focus:outline-none mr-1 my-2 ease-linear transition-all duration-150" type="button">
                        <div>Recommend</div>
                      </button>
                    </div>
                  </InfoWindowF>
                ) : null}
              </Marker>
            )
          })}
        </GoogleMap>
        <SearchModal />
      </div>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(Search);
