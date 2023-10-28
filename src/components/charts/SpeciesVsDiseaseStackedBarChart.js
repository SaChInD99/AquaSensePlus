import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './chart.css'; // Make sure to link your CSS file

const SpeciesVsDiseaseStackedBarChart = () => {
  const [data, setData] = useState([]);
  const [selectedDisease, setSelectedDisease] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const firestore = getFirestore();
      const locationsCollection = collection(firestore, 'locations');
      const querySnapshot = await getDocs(locationsCollection);

      const stackedData = {};

      querySnapshot.forEach((doc) => {
        const species = doc.data().species;
        const disease = doc.data().disease;

        if (!stackedData[species]) {
          stackedData[species] = { name: species };
        }

        if (!stackedData[species][disease]) {
          stackedData[species][disease] = 0;
        }

        stackedData[species][disease] += 1;
      });

      const formattedData = Object.values(stackedData);

      setData(formattedData);
    };

    fetchData();
  }, []);

  const allDiseases = Object.keys(data[0] || {}).filter((key) => key !== 'name');

  // Define a color palette for diseases
  const diseaseColorPalette = [
    '#8884d8', '#82ca9d', '#83a6ed', '#8dd1e1', '#a4de6c', '#d0ed57'
    // Add more colors as needed
  ];

  return (
    <div className="chart-container">
      <h2 className="chart-title">Species vs. Disease Stacked Chart</h2>
      <select
        value={selectedDisease}
        onChange={(e) => setSelectedDisease(e.target.value)}
        className="select-dropdown" // Apply appropriate CSS class
      >
        <option value="">All Diseases</option>
        {allDiseases.map((disease) => (
          <option key={disease} value={disease}>
            {disease}
          </option>
        ))}
      </select>
      <div className="bar-chart-container"> {/* Apply appropriate CSS class */}
        <BarChart width={750} height={500} data={data} layout="vertical">
          <CartesianGrid strokeDasharray="4 4" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="name" />
          <Tooltip />
          <Legend />
          {allDiseases.map((disease, index) => (
            <Bar
              key={index}
              dataKey={disease}
              name={disease}
              stackId="b"
              fill={diseaseColorPalette[index % diseaseColorPalette.length]} // Assign color from the palette
            />
          ))}
        </BarChart>
      </div>
    </div>
  );
};

export default SpeciesVsDiseaseStackedBarChart;
