import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import LocationList from './pages/LocationList';
import LocationDetail from './pages/LocationDetail';
import ViewDisease from './pages/ViewDisease';
import Diseases from './pages/Diseases';
import DiseaseCalendar from './charts/DiseaseCalendar';
import { WeatherMap } from './pages/WeatherMap';
import { app } from './firebase';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/locationlist" element={<LocationList />} />
          <Route path="/locationdetail/:id" element={<LocationDetail />} />
          <Route path="/viewdisease" element={<ViewDisease />} />
          <Route path="/diseases" element={<Diseases />} />
          <Route path="/diseasescalendar" element={<DiseaseCalendar />} />
          <Route path="/weathermap" element={<WeatherMap />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}



