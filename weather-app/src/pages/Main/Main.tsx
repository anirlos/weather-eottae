import React from "react";

import styled from "styled-components";
import DayWaether from "../../components/main/DayWeather";
import DayClothes from "../../components/main/DayClothes";
import WeatherDays from "../../components/main/WeatherDays";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";

const Main = () => {
  return (
    <>
      <Header />
      <StMain>
        <div className="daywaether">
          <DayWaether />
          <DayClothes />
        </div>
        <WeatherDays />
        <footer>
          <Footer />
        </footer>
      </StMain>
    </>
  );
};

export default Main;

const StMain = styled.div`
  margin: auto;
  height: 830px;

  .daywaether {
    display: flex;
    justify-content: center;
    gap: 55px;
  }
`;
