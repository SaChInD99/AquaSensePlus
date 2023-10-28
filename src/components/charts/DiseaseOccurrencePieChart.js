import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const DiseaseOccurrencePieChart = ({ data }) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']; // Add more colors if needed

  const dataWithCounts = data.reduce((acc, item) => {
    acc[item.disease] = (acc[item.disease] || 0) + 1;
    return acc;
  }, {});

  const pieChartData = Object.keys(dataWithCounts).map(disease => ({
    name: disease,
    value: dataWithCounts[disease],
  }));

  return (
    <PieChart width={400} height={300}>
      <Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
        {pieChartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default DiseaseOccurrencePieChart;
