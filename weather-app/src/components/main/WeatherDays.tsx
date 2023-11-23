import React from "react";
import 구름 from "../../assets/img/main/흐림icon.png";
import 눈 from "../../assets/img/main/눈icon.png";
import 해 from "../../assets/img/main/해icon.png";
import styled from "styled-components";

const WeatherDays = () => {
  return (
    <WeatherDaysWrap>
      <DayWrap>
        <div>
          <p>내일</p>
          <img src={구름} />
        </div>
        <DaysTemperatures>
          <div className="high"> 최고: 20°</div>
          <div className="low">최저: 12°</div>
        </DaysTemperatures>
      </DayWrap>
      <DayWrap>
        <div>
          <p>모레</p>
          <img src={눈} />
        </div>
        <DaysTemperatures>
          <div className="high"> 최고: 20°</div>
          <div className="low">최저: 12°</div>
        </DaysTemperatures>
      </DayWrap>

      <DayWrap>
        <div>
          <p>글피</p>
          <img src={해} />
        </div>
        <DaysTemperatures>
          <div className="high"> 최고: 20°</div>
          <div className="low">최저: 12°</div>
        </DaysTemperatures>
      </DayWrap>
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
  box-shadow: 2px 4px 10px 0 #dcdbdb;
  display: flex;
  justify-content: space-around;
  text-align: center;
  align-items: center;
  font-size: 20px;

  p {
    margin: 15px;
  }

  img {
    width: 150px;
  }
`;

const DaysTemperatures = styled.div`
  padding-top: 30%;
  margin-right: 50px;

  .high {
    color: #da3939;
    margin-bottom: 10px;
  }
  .low {
    color: #2d8fcc;
  }
`;

const DayWrap = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  margin-left: 20px;
  &::after {
    content: "";
    width: 1px;
    height: 150px;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    background-color: #cdcccc8a;
  }
  &:last-child::after {
    display: none;
  }
`;
