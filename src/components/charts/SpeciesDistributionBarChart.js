import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Your Firebase configuration import
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const SpeciesDistributionBarChart = () => {
  const [speciesData, setSpeciesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const firestore = getFirestore();
      const locationsCollection = collection(firestore, 'locations');
      const querySnapshot = await getDocs(locationsCollection);

      const speciesCounts = {};
      querySnapshot.forEach((doc) => {
        const species = doc.data().species;
        if (speciesCounts[species]) {
          speciesCounts[species] += 1;
        } else {
          speciesCounts[species] = 1;
        }
      });

      const formattedData = Object.keys(speciesCounts).map((species) => ({
        name: species,
        count: speciesCounts[species],
      }));

      setSpeciesData(formattedData);
    };

    fetchData();
  }, []);

  return (
    <div className="chart-container">
      <h2 className="chart-title">Species Distribution Chart</h2>
      <p className='chart-subtitle'>shows disease infected species.</p>
      <BarChart width={797} height={300} data={speciesData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default SpeciesDistributionBarChart;
