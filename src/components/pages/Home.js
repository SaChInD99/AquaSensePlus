import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Make sure to import your Firestore instance
import { collectionGroup, getDocs } from 'firebase/firestore';
import DiseaseBarChart from '../charts/DiseaseBarChart';
import DiseaseDistributionPieChart from '../charts/DiseaseDistributionPieChart';
import SpeciesDistributionBarChart from '../charts/SpeciesDistributionBarChart';
import DiseaseOverTimeLineChart from '../charts/DiseaseOverTimeLineChart';
import SpeciesVsDiseaseStackedBarChart from '../charts/SpeciesVsDiseaseStackedBarChart';
import SpeciesAffectedByDiseaseBarChart from '../charts/SpeciesAffectedByDiseaseBarChart';
import DiseaseSpreadMultiLineChart from '../charts/DiseaseSpreadMultiLineChart';
import WeatherWidget from '../charts/WeatherWidget';
import '../charts/chart.css'
import Map from './Map';

function Home() {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="content-wrapper">
      <div>
        <div className="dashboard-heading">
          <button className="refresh-button" onClick={handleRefresh}>
            Refresh Page
          </button>
          <h3 className="chart-title2">Disease Dashboard</h3>
          <div className="charts-container">
            <div className="chart-row">
              <div className="chart">
                <DiseaseBarChart />
              </div>
              <div className="chart">
                <DiseaseDistributionPieChart />
              </div>
            </div>
            <div className="chart-row">
              <div className="chart">
                <SpeciesDistributionBarChart />
              </div>
              <div className="chart">
                <DiseaseOverTimeLineChart />
              </div>
            </div>
            <div className="chart-row">
              <div className="chart">
                <SpeciesVsDiseaseStackedBarChart />
              </div>
              <div className="chart">
                <DiseaseSpreadMultiLineChart />
              </div>
            </div>
            <div className="chart-row">
              <div className="chart1">
                <SpeciesAffectedByDiseaseBarChart />
              </div>
              <div className="chart1">
                <Map />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Home;

