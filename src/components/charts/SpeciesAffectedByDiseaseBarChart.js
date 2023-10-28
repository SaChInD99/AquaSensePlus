import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const SpeciesAffectedByDiseaseBarChart = () => {
  const [data, setData] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const firestore = getFirestore();
      const locationsCollection = collection(firestore, 'locations');
      const querySnapshot = await getDocs(locationsCollection);

      const affectedSpecies = {};

      querySnapshot.forEach((doc) => {
        const species = doc.data().species;
        const disease = doc.data().disease;

        if (!affectedSpecies[disease]) {
          affectedSpecies[disease] = { name: disease };
        }

        if (!affectedSpecies[disease][species]) {
          affectedSpecies[disease][species] = 0;
        }

        affectedSpecies[disease][species] += 1;
      });

      const formattedData = Object.values(affectedSpecies);

      setData(formattedData);
    };

    fetchData();
  }, []);

  const allSpecies = Object.keys(data[0] || {}).filter((key) => key !== 'name');

  // Define a color palette for species
  const speciesColorPalette = [
    '#8884d8', '#83a6ed', '#8dd1e1', '#a4de6c', '#d0ed57'
    // Add more colors as needed
  ];

  return (
    <div className="chart-container">
      <h2 className="chart-title">Species Affected by Each Disease Chart</h2>
      <select
        value={selectedSpecies}
        onChange={(e) => setSelectedSpecies(e.target.value)}
      >
        <option value="">All Species</option>
        {allSpecies.map((species) => (
          <option key={species} value={species}>
            {species}
          </option>
        ))}
      </select>
      <BarChart width={750} height={500} data={data} layout="vertical">
        <CartesianGrid strokeDasharray="4 4" />
        <XAxis type="number" />
        <YAxis type="category" dataKey="name" />
        <Tooltip />
        <Legend />
        {allSpecies.map((species, index) => (
          <Bar
            key={index}
            dataKey={species}
            name={species}
            stackId="a"
            fill={speciesColorPalette[index % speciesColorPalette.length]} // Assign color from the palette
          />
        ))}
      </BarChart>
    </div>
  );
};

export default SpeciesAffectedByDiseaseBarChart;
