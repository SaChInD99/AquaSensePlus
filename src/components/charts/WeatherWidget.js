import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WeatherWidget.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThermometerHalf } from '@fortawesome/free-solid-svg-icons';
import ForecastItem from './ForecastItem';

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [cityName, setCityName] = useState('Colombo');
  const [units, setUnits] = useState('metric'); // Change to 'imperial' for Fahrenheit
  const API_KEY = 'db63784ca22e2ee8ed904af656c366c3';

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&appid=${API_KEY}`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    const fetchForecastData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=${units}&appid=${API_KEY}`
        );
        setForecastData(response.data.list);
      } catch (error) {
        console.error('Error fetching forecast data:', error);
      }
    };

    fetchWeatherData();
    fetchForecastData();
  }, [cityName, units]);

  return (
    <div className="weather-widget">
      <h2>Weather Information</h2>
      <div className="location-input">
        {/* Input field for city name and unit selection */}
        <input
          type="text"
          placeholder="Enter city name"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
        <select value={units} onChange={(e) => setUnits(e.target.value)}>
          <option value="metric">Celsius</option>
          <option value="imperial">Fahrenheit</option>
        </select>
      </div>
      {weatherData && (
        <>
          <p className="city">City- {weatherData.name}</p>
          <div className="weather-info">
            <h1 className="temperature">
              <FontAwesomeIcon icon={faThermometerHalf} className="icon" />
               {weatherData.main.temp}&deg;{units === 'metric' ? 'C' : 'F'}
            </h1>
            <br></br>
            <h2 className="weather-description">
              <img
                className="weather-icon"
                src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                alt="Weather Icon"
                sizes='4x'
              />
               {weatherData.weather[0].description}
            </h2>
          </div>
        </>
      )}

      <div className="forecast">
        <h3>Forecast for the Upcoming Days</h3>
        <div className="forecast-list">
          {forecastData.slice(2, 30).map((forecast, index) => (
            <ForecastItem key={index} forecast={forecast} units={units} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;


