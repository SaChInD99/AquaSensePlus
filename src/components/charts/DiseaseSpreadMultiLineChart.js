import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const DiseaseSpreadMultiLineChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const firestore = getFirestore();
      const locationsCollection = collection(firestore, 'locations');
      const querySnapshot = await getDocs(locationsCollection);

      const diseaseSpreadData = {};

      querySnapshot.forEach((doc) => {
        const timestamp = doc.data().timestamp.seconds * 1000; // Convert to milliseconds
        const disease = doc.data().disease;

        if (!diseaseSpreadData[timestamp]) {
          diseaseSpreadData[timestamp] = { timestamp };
        }

        if (diseaseSpreadData[timestamp][disease]) {
          diseaseSpreadData[timestamp][disease] += 1;
        } else {
          diseaseSpreadData[timestamp][disease] = 1;
        }
      });

      const formattedData = Object.values(diseaseSpreadData);

      setData(formattedData);
    };

    fetchData();
  }, []);

  const diseases = Object.keys(data[0] || {}).filter((key) => key !== 'timestamp');

  return (
    <div className="chart-container">
      <h2 className="chart-title">Disease Spread Multi-Line Chart</h2>
      <div className="chart">
        <LineChart width={700} height={535} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            type="number"
            domain={['dataMin', 'dataMax']}
            tickFormatter={(timestamp) => new Date(timestamp).toLocaleDateString()}
          />
          <YAxis />
          <Tooltip
            labelFormatter={(timestamp) => new Date(timestamp).toLocaleDateString()}
          />
          <Legend />
          {diseases.map((disease, index) => (
            <Line
              key={index}
              type="monotone"
              dataKey={disease}
              name={disease}
              stroke={`#${((1 << 24) * Math.random() | 0).toString(16)}`}
            />
          ))}
        </LineChart>
      </div>
    </div>
  );
};

export default DiseaseSpreadMultiLineChart;
