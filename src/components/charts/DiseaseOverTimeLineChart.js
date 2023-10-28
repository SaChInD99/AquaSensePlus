import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const DiseaseOverTimeLineChart = () => {
  const [diseaseData, setDiseaseData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const firestore = getFirestore();
      const locationsCollection = collection(firestore, 'locations');
      const querySnapshot = await getDocs(locationsCollection);

      const timestampCounts = {};
      querySnapshot.forEach((doc) => {
        const timestamp = doc.data().timestamp.seconds * 1000; // Convert to milliseconds
        const disease = doc.data().disease;

        if (!timestampCounts[timestamp]) {
          timestampCounts[timestamp] = {};
        }

        if (timestampCounts[timestamp][disease]) {
          timestampCounts[timestamp][disease] += 1;
        } else {
          timestampCounts[timestamp][disease] = 1;
        }
      });

      const formattedData = Object.keys(timestampCounts).map((timestamp) => {
        const timestampDate = new Date(parseInt(timestamp));
        return { timestamp: timestampDate, ...timestampCounts[timestamp] };
      });

      setDiseaseData(formattedData);
    };

    fetchData();
  }, []);

  const diseases = Object.keys(diseaseData[0] || {}).filter(key => key !== 'timestamp');

  return (
    <div className="chart-container">
      <h2 className="chart-title">Disease Over Time chart</h2>
      <LineChart width={670} height={350} data={diseaseData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Legend />
        {diseases.map((disease, index) => (
          <Line key={index} type="monotone" dataKey={disease} name={disease} stroke={`#${((1 << 24) * Math.random() | 0).toString(16)}`} />
        ))}
      </LineChart>
    </div>
  );
};

export default DiseaseOverTimeLineChart;
