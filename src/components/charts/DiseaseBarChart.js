import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Your Firebase configuration import
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './chart.css'; // Import your custom CSS file

const DiseaseBarChart = () => {
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
        count: diseaseCounts[disease],
      }));

      setDiseaseData(formattedData);
    };

    fetchData();
  }, []);

  return (
    <div className="chart-container">
      <h2 className="chart-title">Reported Disease Frequency</h2>
      <p className="chart-subtitle">Show the frequency of reported diseases.</p>
      <div className="chart">
        <BarChart width={460} height={300} data={diseaseData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#83a6ed" />
        </BarChart>
      </div>
    </div>
  );
};

export default DiseaseBarChart;

