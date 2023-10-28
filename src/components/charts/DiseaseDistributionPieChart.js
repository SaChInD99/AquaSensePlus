import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Your Firebase configuration import
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import './chart.css'

const DiseaseDistributionPieChart = () => {
  const [diseaseData, setDiseaseData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const firestore = getFirestore();
      const locationsCollection = collection(firestore, 'locations');
      const querySnapshot = await getDocs(locationsCollection);

      const diseaseCounts = {};
      querySnapshot.forEach((doc) => {
        const disease = doc.data().disease;
        if (diseaseCounts[disease]) {
          diseaseCounts[disease] += 1;
        } else {
          diseaseCounts[disease] = 1;
        }
      });

      const formattedData = Object.keys(diseaseCounts).map((disease) => ({
        name: disease,
        value: diseaseCounts[disease],
      }));

      setDiseaseData(formattedData);
    };

    fetchData();
  }, []);

  const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658'];

  return (
    <div className="chart-container">
      <h2 className="chart-title">Disease Distribution Pie Chart</h2>
      <PieChart width={600} height={350}>
        <Pie
          data={diseaseData}
          dataKey="value"
          nameKey="name"
          cx="55%"
          cy="55%"
          outerRadius={80}
          fill="#8884d8"
        >
          {diseaseData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default DiseaseDistributionPieChart;
