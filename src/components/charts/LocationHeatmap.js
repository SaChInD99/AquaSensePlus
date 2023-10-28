import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.heat';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const LocationHeatmap = () => {
  const [heatmapData, setHeatmapData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const firestore = getFirestore();
      const locationsCollection = collection(firestore, 'locations');
      const querySnapshot = await getDocs(locationsCollection);

      const data = querySnapshot.docs.map((doc) => ({
        lat: doc.data().latitude, // Replace with your latitude field
        lng: doc.data().longitude, // Replace with your longitude field
        intensity: 1, // You can set intensity based on the data if needed
      }));

      setHeatmapData(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const map = L.map('map').setView([0, 0], 2); // Set initial map view

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    const heat = L.heatLayer(heatmapData, { radius: 25 }).addTo(map);

    return () => {
      map.remove();
    };
  }, [heatmapData]);

  return (
    <div className="heatmap-container">
      <h2 className="heatmap-title">Location Heatmap</h2>
      <div id="map" className="heatmap-map"></div>
    </div>
  );
};

export default LocationHeatmap;
