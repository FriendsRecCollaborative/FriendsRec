import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar';
import { GoogleMap, useJsApiLoader, Marker, InfoWindowF } from '@react-google-maps/api';
import { Library } from '@googlemaps/js-api-loader';
import MapSearchBar from '../MapSearchBar';
import SearchModal from '../SearchModal';
import { getNewsfeed } from '../features/newsfeed/newsfeedSlice';
import newsfeedService from '../features/newsfeed/newsfeedService';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

interface NewsfeedItem {
  created_at: string;
  name: string;
  restaurant_name: string;
  review: string;
}

const containerStyle = {
  height: '76%',
  width: '88%',
  maxWidth: '1200px',
  borderRadius: '5px',
};

function Search() {
  const [restaurants, setRestaurants] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);
  const [center, setCenter] = useState({ lat: 40.71, lng: -74.0 }); // Default center
  const [zipOrAddress, setZipOrAddress] = useState('');
  const [libraries] = useState<Library[]>(['places']);
  const [open, setOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('');
  const [reviewText, setReviewText] = useState('');
  const newsfeed: NewsfeedItem[] = useSelector((state: RootState) => state.newsfeed.newsfeed);
  const { user }: any = useSelector((state: RootState) => state.auth);
  if (!process.env.REACT_APP_GOOGLE_MAPS_API_KEY) {
    process.env.REACT_APP_GOOGLE_MAPS_API_KEY = '';
  }

  const handleActiveMarker = (marker: any, location: any) => {
    setCurrentLocation(location);
    setActiveMarker(null);
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const handleDeleteRec = async (recID: any) => {
    try {
      const response = await fetch(`/api/review/delete/${recID}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ location: center }),
      });
      const data = await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
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
    const fetchNearbyRestaurants = async () => {
      try {
        const response = await fetch(`/api/map`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ location: center }),
        });
        const friendsRecs = await newsfeedService.getNewsfeed();
        const data = await response.json();
        const newFriendsRecs: any = [];
        for (let i = 0; i < friendsRecs.length; i++) {
          const geocoder = new window.google.maps.Geocoder();
          const newArrayObj = {
            name: friendsRecs[i].restaurant_name,
            geometry: { location: { lat: 0, lng: 0 } },
            friendsName: friendsRecs[i].name,
            vicinity: friendsRecs[i].address,
            recID: friendsRecs[i].recs_id,
          };
          geocoder.geocode({ address: friendsRecs[i].address }, (results, status) => {
            if (results) {
              if (status === 'OK' && results.length > 0) {
                newArrayObj.geometry.location.lat = results[0].geometry.location.lat();
                newArrayObj.geometry.location.lng = results[0].geometry.location.lng();
              }
            }
          });

          newFriendsRecs.push(newArrayObj);
        }
        let indicesToDelete = [];
        for (let i = 0; i < data.results.length; i++) {
          for (let j = 0; j < newFriendsRecs.length; j++) {
            if (newFriendsRecs[j].vicinity) {
              let parts = newFriendsRecs[j].vicinity.split(',');
              let resultString = parts.slice(0, 2).join(',');
              if (resultString === data.results[i].vicinity) {
                data.results.splice(i, 1);
                indicesToDelete.push(i);
              }
            }
          }
        }
        for (let i = indicesToDelete.length - 1; i >= 0; i--) {
          data.results.splice(indicesToDelete[i], 1);
        }
        const combinedArray: any = [...newFriendsRecs, ...data.results];
        console.log('friendsRecs', newFriendsRecs);
        console.log('combinedArray', combinedArray);
        setRestaurants(combinedArray);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

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
      });
      fetchNearbyRestaurants();
    }
  }, [isLoaded, zipOrAddress]);

  return isLoaded ? (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-80 p-20 pt-24 w-full">
        <MapSearchBar setZipOrAddress={setZipOrAddress} zipOrAddress={zipOrAddress} setCenter={setCenter} center={center} setRestaurants={setRestaurants} />
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          onClick={() => setActiveMarker(null)}
          options={{
            styles: [
              {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }],
              },
            ],
          }}>
          {restaurants.map((location: any, index) => {
            if (location.friendsName === user.fullName) {
              const customMarkerIcon = {
                path: 'M-1.547 12l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM0 0q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z',
                fillColor: 'orange',
                fillOpacity: 0.9,
                strokeWeight: 0,
                rotation: 0,
                scale: 2,
                anchor: new google.maps.Point(0, 20),
              };
              return (
                <div key={index}>
                  <Marker
                    position={{ lat: location.geometry.location.lat, lng: location.geometry.location.lng }}
                    icon={customMarkerIcon}
                    title={location.name}
                    onClick={() => handleActiveMarker(index, location)}>
                    {activeMarker === index ? (
                      <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                        <div className="flex-col">
                          <div className="font-bold text-sm">{`${location.name} (You recommend this place)`}</div>
                          <div className="flex">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgb(2 132 199)" className="w-4 h-4">
                              <path
                                fillRule="evenodd"
                                d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <div className="text-sm">{location.vicinity}</div>
                          </div>
                          <button
                            onClick={() => {
                              handleDeleteRec(location.recID);
                            }}
                            className="text-sky-600 active:bg-sky-600 active:text-white font-bold uppercase text-xs px-4 py-2 rounded-full border-sky-600 border shadow hover:shadow-lg outline-none focus:outline-none mr-1 my-2 ease-linear transition-all duration-150"
                            type="button">
                            <div>Delete Recommendation</div>
                          </button>
                        </div>
                      </InfoWindowF>
                    ) : null}
                  </Marker>
                </div>
              );
            } else if (location.friendsName) {
              const customMarkerIcon = {
                path: 'M-1.547 12l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM0 0q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z',
                fillColor: 'blue',
                fillOpacity: 0.6,
                strokeWeight: 0,
                rotation: 0,
                scale: 2,
                anchor: new google.maps.Point(0, 20),
              };
              return (
                <div key={index}>
                  <Marker
                    position={{ lat: location.geometry.location.lat, lng: location.geometry.location.lng }}
                    icon={customMarkerIcon}
                    title={location.name}
                    onClick={() => handleActiveMarker(index, location)}>
                    {activeMarker === index ? (
                      <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                        <div className="flex-col">
                          <div className="font-bold text-sm">{location.name}</div>
                          <div className="flex">
                            <div className="text-sm">{`${location.friendsName} recommends this place`}</div>
                          </div>
                          <div className="flex">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgb(2 132 199)" className="w-4 h-4">
                              <path
                                fillRule="evenodd"
                                d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <div className="text-sm">{location.vicinity}</div>
                          </div>
                          <button
                            onClick={() => {
                              setReviewText('');
                              setOpen(!open);
                            }}
                            className="text-sky-600 active:bg-sky-600 active:text-white font-bold uppercase text-xs px-4 py-2 rounded-full border-sky-600 border shadow hover:shadow-lg outline-none focus:outline-none mr-1 my-2 ease-linear transition-all duration-150"
                            type="button">
                            <div>Recommend</div>
                          </button>
                        </div>
                      </InfoWindowF>
                    ) : null}
                  </Marker>
                </div>
              );
            } else if (!location.friendsName) {
              return (
                <div key={index}>
                  <Marker position={{ lat: location.geometry.location.lat, lng: location.geometry.location.lng }} title={location.name} onClick={() => handleActiveMarker(index, location)}>
                    {activeMarker === index ? (
                      <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                        <div className="flex-col">
                          <div className="font-bold text-sm">{location.name}</div>
                          <div className="flex">
                            <svg className="w-4 h-4 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="rgb(2 132 199)" viewBox="0 0 22 20">
                              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                            <div className="text-sm">{location.rating}</div>
                          </div>
                          <div className="flex">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgb(2 132 199)" className="w-4 h-4">
                              <path
                                fillRule="evenodd"
                                d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <div className="text-sm">{location.vicinity}</div>
                          </div>
                          <button
                            onClick={() => {
                              setReviewText('');
                              setOpen(!open);
                            }}
                            className="text-sky-600 active:bg-sky-600 active:text-white font-bold uppercase text-xs px-4 py-2 rounded-full border-sky-600 border shadow hover:shadow-lg outline-none focus:outline-none mr-1 my-2 ease-linear transition-all duration-150"
                            type="button">
                            <div>Recommend</div>
                          </button>
                        </div>
                      </InfoWindowF>
                    ) : null}
                  </Marker>
                </div>
              );
            }
          })}
        </GoogleMap>
        <SearchModal open={open} setOpen={setOpen} currentLocation={currentLocation} setReviewText={setReviewText} reviewText={reviewText} />
      </div>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(Search);
