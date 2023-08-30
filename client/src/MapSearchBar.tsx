import React, { useState, useEffect } from "react";


function MapSearchBar( props: any ) {

  const handleClick = async () => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: props.zipOrAddress }, (results, status) => {
      if (results) {
        if (status === 'OK' && results.length > 0) {
          props.setCenter({
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          });
        }
      }
    })
    try {
      const response = await fetch(`/api/map`, {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({location: props.center})
      })

      const data = await response.json();
      console.log(data.results); // Store the fetched restaurants
      props.setRestaurants(data.results)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <form>   
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
      <div className="relative w-[65%] mb-10">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
        </div>
        <input onChange={(e)=>props.setZipOrAddress(e.target.value)} value={props.zipOrAddress} type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search locations..." required />
        <button onClick={()=>handleClick()} type="button" className="text-white absolute right-2.5 bottom-2.5 bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Search</button>
      </div>
    </form>
  )
}

export default MapSearchBar;
