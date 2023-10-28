import React from "react";
import Header2 from "./Header2";
import SideNav from "./SideNav";
import WeatherWidget from "../charts/WeatherWidget";
import Forecastmap from "./Forecastmap";



export function WeatherMap() {
  return (
    <>
      <Header2 />
      <SideNav />
      <div className="content-wrapper">
        <Forecastmap />
        <div className="container-fluid"></div>
        <WeatherWidget/>
      </div>
    </>
  );
}

