import React from "react";

import styled from "styled-components";
import WeatherDaysCard from "./WeatherDaysCard";
import { mediaQueries } from "../../styles/MediaStyle";
import {
  BREAKPOINT_TABLET,
  BREAKPOINT_PHONE,
  BREAKPOINT_DESKTOP,
} from "../../styles/MediaStyle";

const WeatherDays = (props) => {
  // console.log(props);

  return (
    <WeatherDaysBox>
      {props.forecastData &&
        props.forecastData.map((item) => <WeatherDaysCard {...item} />)}
    </WeatherDaysBox>
  );
};
export default WeatherDays;

const WeatherDaysBox = styled.div`
  width: 1050px;
  height: 250px;
  background-color: white;
  margin: auto;
  margin-top: 40px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 2px 4px 10px 0 #dcdbdb;
  display: flex;
  justify-content: space-around;
  text-align: center;
  align-items: center;
  font-size: 20px;
  p {
    margin: 10px;
    font-size: 1.4rem;
    color: #363535;
  }
  img {
    width: 100px;
    margin: 10px 0;
  }
  ${mediaQueries(BREAKPOINT_TABLET)} {
    width: 82%;
    display: flex;
    flex-wrap: nowrap;
    overflow-x: scroll;
    margin-bottom: 20px;
    justify-content: flex-start;
    margin-top: 20px;
  }
  ${mediaQueries(BREAKPOINT_DESKTOP)} {
    width: 95%;
    display: flex;
    flex-wrap: nowrap;
    overflow-x: scroll;
    margin-bottom: 20px;
    justify-content: flex-start;
    margin-top: 20px;
  }
`;
