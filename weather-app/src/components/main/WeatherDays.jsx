import React from "react";
import 구름 from "../../assets/img/main/weatherIcon/흐림icon.png";
import 눈 from "../../assets/img/main/weatherIcon/눈icon.png";
import 해 from "../../assets/img/main/weatherIcon/해icon.png";
import styled from "styled-components";

const WeatherDays = (props) => {
  console.log(props);
  return (
    <WeatherDaysWrap>
      {props.forecastData &&
        props.forecastData.map((item) => (
          <div className="forecast-data">
            {item.date && <p>{item.date.substr(5, 6)}</p>}
            <img src={구름} />
            <DaysTemperatures>
              <div className="high">{item.minTemp.toFixed()}°C </div>
              <div className="low">{item.maxTemp.toFixed()}°C</div>
            </DaysTemperatures>
          </div>
        ))}
    </WeatherDaysWrap>
  );
};
export default WeatherDays;

const WeatherDaysWrap = styled.div`
  width: 1000px;
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
  }
  img {
    width: 140px;
  }
  .forecast-data {
  }
`;
const DaysTemperatures = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;

  .high {
    color: #ff0000;
    padding-right: 5px;
    /* border-right: 1px solid #d3d3d3; */
  }
  .low {
    color: #5d6dbe;
    padding-left: 5px;
  }
`;
