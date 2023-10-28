import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud } from '@fortawesome/free-solid-svg-icons';
import './ForecastItem.css'; // Import the CSS file for styling

const ForecastItem = ({ forecast, units }) => {
  return (
    <div className="forecast-item">
      <p className="forecast-date">{forecast.dt_txt}</p>
      <div className="forecast-info">
        <p className="forecast-temperature">
          {forecast.main.temp}&deg;{units === 'metric' ? 'C' : 'F'}
        </p>
        <p className="forecast-description">{forecast.weather[0].description}</p>
        <img
          className="forecast-icon"
          src={`http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`}
          alt="Weather Icon"
        />
      </div>
    </div>
  );
};

export default ForecastItem;



