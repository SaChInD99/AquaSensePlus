import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Your Firebase configuration import
import Header2 from "./Header2"
import Footer from "./Footer"
import SideNav from "./SideNav"
import './LocationDetail.css'
import logo from "../images/logo.png"
import virus from "../images/d3.png"
import carp1 from "../images/fi1.jpg"
import carp2 from "../images/carp2.jpg"
import farm from "../images/f2.jpg"
import phone from "../images/mo1.png"
import time from "../images/d2.png"
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import '../charts/chart.css'
import '../charts/specieschart.css'
import SpeciesBarChart from '../charts/SpeciesBarChart';
import {
  faSun,
  faMoon,
  faCloud,
  faCloudSun,
  faCloudMoon,
  faCloudShowersHeavy,
  faCloudRain,
  faSnowflake,
  faBolt,
  faTemperatureHigh,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DiseaseOccurrencePieChart from '../charts/DiseaseOccurrencePieChart'; // Adjust the path accordingly
import SpeciesBar from '../charts/SpeciesBar';

const LocationDetail = () => {
  const { id } = useParams();
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [locationName, setLocationName] = useState('');
  const [forecast, setForecast] = useState(null);
  const weatherIcons = {
    '01d': faSun,            // Clear sky (day)
    '01n': faMoon,           // Clear sky (night)
    '02d': faCloudSun,       // Few clouds (day)
    '02n': faCloudMoon,      // Few clouds (night)
    '03d': faCloud,          // Scattered clouds
    '03n': faCloud,          // Scattered clouds
    '04d': faCloud,          // Broken clouds
    '04n': faCloud,          // Broken clouds
    '09d': faCloudShowersHeavy, // Shower rain
    '09n': faCloudShowersHeavy, // Shower rain
    '10d': faCloudRain,      // Rain
    '10n': faCloudRain,      // Rain
    '11d': faBolt,           // Thunderstorm
    '11n': faBolt,           // Thunderstorm
    '13d': faSnowflake,      // Snow
    '13n': faSnowflake,      // Snow
  };
  const [currentWeatherIcon, setCurrentWeatherIcon] = useState(null);

  const firestore = getFirestore();
  const locationDocRef = doc(firestore, 'locations', id);

  const handleRefresh = () => {
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };



  useEffect(() => {
    if (weather && weather.weather[0].icon) {
      setCurrentWeatherIcon(weatherIcons[weather.weather[0].icon]);
    }
  }, [weather]);

  useEffect(() => {
    const getLocation = async () => {
      const locationSnapshot = await getDoc(locationDocRef);
      if (locationSnapshot.exists()) {
        setLocation({ id: locationSnapshot.id, ...locationSnapshot.data() });
      }
    };

    getLocation();
  }, [id]);

  useEffect(() => {
    if (location) {
      fetchWeather(location.latitude, location.longitude);
      fetchLocationName(location.latitude, location.longitude);
      fetchForecast(location.latitude, location.longitude);

    }
  }, [location]);

  const fetchForecast = async (latitude, longitude) => {
    const apiKey = 'db63784ca22e2ee8ed904af656c366c3'; // Replace with your actual weather API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setForecast(data);
    } catch (error) {
      console.error('Error fetching forecast data:', error);
    }
  };

  const fetchWeather = async (latitude, longitude) => {
    const apiKey = 'db63784ca22e2ee8ed904af656c366c3'; // Replace with your actual weather API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };
  const fetchLocationName = async (latitude, longitude) => {
    const apiKey = 'AIzaSyDAu6RkliN9RABYhxGeRLNh-UlnIaqgr84'; // Replace with your actual Google Maps API key
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        setLocationName(data.results[0].formatted_address);
      }
    } catch (error) {
      console.error('Error fetching location name:', error);
    }
  };
  if (!location) {
    return <div className="loading-container">
      <img
        src={logo}
        alt="Loading"
        className="loading-image"
      />
      <p className="loading-message">Loading...</p>
    </div>;
  }
  const mapStyles = {
    height: '400px',
    width: '100%',
  };

  const center = {
    lat: location.latitude,
    lng: location.longitude
  };

  return (
    <div>
      <div>
        <Header2 />
        <SideNav />
        {/* <Home /> */}
      </div>
      <div className="content-wrapper">
        <div className="dashboard-heading">
          <button className="refresh-button" onClick={handleRefresh}>
            Refresh Page
          </button>
          <h1 className="chart-title2">Reported Disease Dashboard</h1>
          <div className="container-fluid charts-container">
            {/* Small boxes (Stat box) */}
            <div className="charts-container">
              <div className="row">
                <div className="col-lg-3 col-6">
                  <div className="small-box">
                    <div className="inner">
                      <p>Disease</p>
                      <h2>{location.disease}</h2>
                      <Link to="/diseases" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></Link>
                    </div>
                    <div className="icon">
                      <div className="image-wrapper1">
                        <img src={virus} alt="Image" className="small-box-image" />
                      </div>
                    </div>
                  </div>
                </div>
                {/* ./col */}
                <div className="col-lg-3 col-6">
                  {/* small box */}
                  <div className="small-box">
                    <div className="inner">
                      <h3></h3>
                      <p>Aquaculture Farm Name</p>
                      <h2>{location.name}</h2>
                      <Link to="#" className="small-box-footer"><i className="fas fa-arrow-circle-right" /></Link>
                    </div>
                    <div className="icon">
                      <div className="image-wrapper1">
                        <img src={farm} alt="Image" className="small-box-image" />
                      </div>
                      {/* <i className="ion ion-stats-bars" /> */}
                    </div>
                  </div>
                </div>
                {/* ./col */}
                <div className="col-lg-3 col-6">
                  {/* small box */}
                  <div className="small-box">
                    <div className="inner">
                      <h3></h3>
                      <p>Species</p>
                      <h2>{location.species}</h2>
                      <Link to="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></Link>
                    </div>
                    <div className="image-wrapper">
                      <img src={carp1} alt="Image" className="small-box-image" />

                    </div>


                  </div>
                </div>
                {/* ./col */}
                <div className="col-lg-3 col-6">
                  {/* small box */}
                  <div className="small-box">
                    <div className="inner">
                      <h3></h3>
                      <p>Mobile Number</p>
                      <h2>{location.mobileNo}</h2>
                      <Link to="#" className="small-box-footer"><i className="fas fa-arrow-circle-right" /></Link>
                    </div>
                    <div className="icon">
                      <div className="image-wrapper1">
                        <img src={phone} alt="Image" className="small-box-image" />
                      </div>
                      {/* <i className="ion ion-pie-graph" /> */}
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-6">
                  <div className="small-box1">
                    <div className="inner">
                      <p>Reported Date & Time</p>
                      <h3>{new Date(location.timestamp.seconds * 1000).toLocaleString()}</h3>
                      <Link to="#" className="small-box-footer"><i className="fas fa-arrow-circle-right" /></Link>
                    </div>
                    <div className="icon">
                      <div className="image-wrapper1">
                        <img src={time} alt="Image" className="small-box-image" />
                      </div>
                    </div>
                  </div>
                </div>
                {/* ./col */}
              </div>
            </div>
            <br></br>
            {/* <h1>Location Detail</h1>
      <p>Disease: {location.disease}</p>
      <p>Aquaculture Farm Name: {location.name}</p>
      <p>Mobile Number: {location.mobileNo}</p> */}
            {/* Display other location details here */}
            <div>
              {/* ... (your existing code) */}
              {/* <div className="chart-row1">
                <div className="chart-container1">
                  <h3 className="chart-title1">Disease Occurrence</h3>
                  {location && <DiseaseOccurrencePieChart data={[location]} />}
                </div>
                <div className="chart-container1">
                  <h3 className="chart-title1">Species Occurrence</h3>
                  {location && <SpeciesBar data={[location]} />}
                </div>
              </div> */}
            </div>
          </div>
          <div>
            <div className="chart-containe2">
              <div className="map-container">
                <LoadScript googleMapsApiKey="AIzaSyALjH_ptXKWD_lMyex2_nbGHdnvzK3Qsbc">
                  <GoogleMap mapContainerStyle={mapStyles} center={center} zoom={20}>
                    <Marker position={center} />
                  </GoogleMap>
                </LoadScript>
              </div>
            </div>
          </div>

          <div className="container-fluid">
            {/* Display weather data */}
            <div className="weather-forecast-wrapper">
              {weather && (
                <div className="weather-widget">
                  <h3>Weather Information</h3>
                  <p> {locationName}</p>
                  <h1> {weather.main.temp} °C</h1>
                  <h4> {weather.weather[0].description}</h4>
                  <div className="weather-icon">
                    <FontAwesomeIcon icon={currentWeatherIcon} size="2x" className="animated-weather" />
                  </div>
                </div>
              )}
              <div className="col-md-6">
                {forecast && (
                  <div className="forecast-widget fixed-size">
                    <h3>Disease Area Weather Forecast</h3>
                    <p> {locationName}</p>
                    <div className="row">
                      <div className="forecast-items-container">
                        {forecast.list.slice(0, 12).map((item, index) => (
                          <div key={index} className="col-md-2">
                            <div key={index} className="forecast-item">
                              <p> {new Date(item.dt * 1000).toLocaleString()}</p>
                              <p>Temperature: {item.main.temp} °C</p>
                              <FontAwesomeIcon
                                icon={faTemperatureHigh}
                                size="lg"
                                className="temperature-icon"
                              />
                              <p>Weather: {item.weather[0].description}</p>
                              <FontAwesomeIcon icon={weatherIcons[item.weather[0].icon]} size="2x" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  );
};

export default LocationDetail;