import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const SpeciesBar = ({ data }) => {
  // Assuming data is an array of objects with "species" property
  const speciesData = data.reduce((acc, entry) => {
    acc[entry.species] = (acc[entry.species] || 0) + 1;
    return acc;
  }, {});

  const barChartData = Object.entries(speciesData).map(([species, count]) => ({ species, count }));

  return (
    <BarChart width={400} height={300} data={barChartData}>
      <CartesianGrid strokeDasharray="9 3" />
      <XAxis dataKey="species" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill="#8884d8" name="Species Count" />
    </BarChart>
  );
};

export default SpeciesBar;

