import React, { useEffect, useState } from 'react';
import { db } from '../firebasemap'; // Import your Firebase configuration
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

  const handleRefresh = () => {
    window.location.reload();
  };

const Forecastmap = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Get a reference to the collection using getFirestore
      const firestore = getFirestore();


      // Fetch data from Firebase Firestore collection
      const querySnapshot = await getDocs(collection(firestore, 'locations'));
      const data = querySnapshot.docs.map((doc) => doc.data());
      setLocations(data);
    };

    fetchData();
  }, []);

  const mapStyles = {
    height: '525px',
    width: '100%',
  };

  const center = {
    lat: 6.9147533333333335,
    lng: 79.972915,
  };

  

  return (
    <div className="chart-container">
       <button className="refresh-button" onClick={handleRefresh}>
            Refresh The Map
          </button>
      <h2 className="chart-title">Disease Map</h2>
      <LoadScript googleMapsApiKey="AIzaSyALjH_ptXKWD_lMyex2_nbGHdnvzK3Qsbc">
        <GoogleMap mapContainerStyle={mapStyles} center={center} zoom={8}>
          {locations.map((location, index) => (
            <Marker
              key={index}
              position={{
                lat: location.latitude,
                lng: location.longitude,
              }}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Forecastmap;
