import React from "react";
import 구름 from "../../assets/img/main/흐림.png";
import styled from "styled-components";

const WeatherDays = () => {
  return (
    <WeatherDaysWrap>
      <div>
        <p>일</p>
        <img src={구름} />
        <DaysTemperatures>
          <div className="high">20°</div>
          <div className="low">12°</div>
        </DaysTemperatures>
      </div>
      <div>
        <p>수</p>
        <img src={구름} />
        <DaysTemperatures>
          <div className="high">20°</div>
          <div className="low">12°</div>
        </DaysTemperatures>
      </div>

      <div>
        <p>목</p>
        <img src={구름} />
        <DaysTemperatures>
          <div className="high">20°</div>
          <div className="low">12°</div>
        </DaysTemperatures>
      </div>

      <div>
        <p>금</p>
        <img src={구름} />
        <DaysTemperatures>
          <div className="high">20°</div>
          <div className="low">12°</div>
        </DaysTemperatures>
      </div>

      <div>
        <p>토</p>
        <img src={구름} />
        <DaysTemperatures>
          <div className="high">20°</div>
          <div className="low">12°</div>
        </DaysTemperatures>
      </div>

      <div>
        <p>일</p>
        <img src={구름} />
        <DaysTemperatures>
          <div className="high">20°</div>
          <div className="low">12°</div>
        </DaysTemperatures>
      </div>
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
    margin: 10px;
  }

  img {
    width: 150px;
  }
`;

const DaysTemperatures = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  font-weight: 600;
  .high {
    color: #000000;
  }
  .low {
    color: #6d6d6d;
  }
`;
