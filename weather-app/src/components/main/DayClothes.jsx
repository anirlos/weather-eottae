import React, { useState, useEffect } from "react";
import styled from "styled-components";
import 기온표 from "../../assets/img/main/기온표.png";
import weatherImg from "../../assets/img/main/iconindex";
import { mediaQueries } from "../../styles/MediaStyle";
import {
  BREAKPOINT_TABLET,
  BREAKPOINT_PHONE,
  BREAKPOINT_DESKTOP,
} from "../../styles/MediaStyle";
import {
  postViewerMaxWidth430px,
  postViewerMaxWidth768px,
} from "../../styles/GlobalMadia";

const DayClothes = ({ weatherData }) => {
  const isCurrentTempValid =
    weatherData.currentTemp !== null && !isNaN(weatherData.currentTemp);
  const currentTemp = isCurrentTempValid
    ? weatherData.currentTemp.toFixed()
    : "N/A";

  let winter,
    earlyWinter,
    beginWinter,
    fall,
    earlyFall,
    earlySummer,
    beginSummer,
    summer;
  if (isCurrentTempValid) {
    const temp = parseFloat(currentTemp);
    winter = temp <= 4;
    earlyWinter = temp >= 5 && temp < 9;
    beginWinter = temp >= 9 && temp < 12;
    fall = temp >= 12 && temp < 17;
    earlyFall = temp >= 17 && temp < 19;
    earlySummer = temp >= 20 && temp < 23;
    beginSummer = temp >= 23 && temp < 27;
    summer = temp >= 28;
  }

  function todayClothes() {
    if (winter) {
      return <p>겨울 옷, 패딩, 방한용품</p>;
    } else if (earlyWinter) {
      return <p>울 코트, 가죽자켓, 히트텍, 기모</p>;
    } else if (beginWinter) {
      return <p>트렌치코트, 야상, 점퍼</p>;
    } else if (fall) {
      return <p>자켓, 가디건, 맨투맨, 후드, 긴 바지</p>;
    } else if (earlyFall) {
      return <p>얇은 가디건, 니트, 맨투맨, 긴바지</p>;
    } else if (earlySummer) {
      return <p>블라우스, 긴팔 티, 면바지, 슬랙스</p>;
    } else if (beginSummer) {
      return <p>반팔, 얇은 셔츠, 반바지, 면바지</p>;
    } else {
      return <p>민소매, 반팔, 반바지, 린넨 옷</p>;
    }
  }

  function clothesImg() {
    if (winter) {
      return <img src={weatherImg.Winter} />;
    } else if (earlyWinter) {
      return <img src={weatherImg.EarlyWin} />;
    } else if (beginWinter) {
      return <img src={weatherImg.BeginWin} />;
    } else if (fall) {
      return <img src={weatherImg.Fall} />;
    } else if (earlyFall) {
      return <img src={weatherImg.EarlyFall} />;
    } else if (earlySummer) {
      return <img src={weatherImg.EarlySum} />;
    } else if (beginSummer) {
      return <img src={weatherImg.BeginSum} />;
    } else {
      return <img src={weatherImg.Summer} />;
    }
  }

  return (
    <DayClothesWrap>
      <h2 className="title">오늘의 추천 옷차림</h2>
      <div className="clothes__info">
        <img className="temp-icon" src={기온표} />
        <div>
          <p className="weather-info">현재 기온은 {currentTemp}°C 입니다</p>
          <div className="clothes">
            <h2>추천의상</h2>
            <div className="clothes-img">{clothesImg()}</div>
            <div>▼{todayClothes()}</div>
          </div>
        </div>
      </div>
    </DayClothesWrap>
  );
};

export default DayClothes;

const DayClothesWrap = styled.div`
  width: 470px;
  height: 500px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 2px 4px 10px 0 #dcdbdb;
  text-align: center;
  ${mediaQueries(BREAKPOINT_PHONE)} {
    width: 90%;
    height: 400px;
  }
  ${mediaQueries(BREAKPOINT_DESKTOP)} {
    width: 390px;
    height: 430px;
  }
  .title {
    text-align: center;
    font-size: 24px;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .clothes__info {
    display: flex;
    gap: 30px;
    justify-content: center;
    ${mediaQueries(BREAKPOINT_PHONE)} {
      gap: 20px;
    }
    img {
      ${mediaQueries(BREAKPOINT_PHONE)} {
        width: 60px;
      }
      ${mediaQueries(BREAKPOINT_DESKTOP)} {
        width: 70px;
      }
    }
    .temp-icon {
      ${mediaQueries(BREAKPOINT_DESKTOP)} {
        padding-left: 10px;
        margin-top: 10px;
      }
    }
  }
  .clothes {
    text-align: center;
    border-radius: 10px;
    width: 300px;

    box-shadow: 2px 4px 10px 0 #dcdbdb;
    ${mediaQueries(BREAKPOINT_PHONE)} {
      width: 210px;
    }
    ${mediaQueries(BREAKPOINT_DESKTOP)} {
      width: 230px;
    }

    h2 {
      font-size: 24px;
      padding-top: 30px;
      padding-bottom: 10px;
    }
    p {
      font-size: 20px;
      padding-bottom: 30px;
      padding-top: 20px;
    }

    ${postViewerMaxWidth430px}
    ${postViewerMaxWidth768px}
  }
  .weather-info {
    font-size: 20px;
    padding: 20px;
    ${mediaQueries(BREAKPOINT_PHONE)} {
      font-size: 17px;
    }
  }
  .clothes-img {
    img {
      width: 300px;
      ${mediaQueries(BREAKPOINT_PHONE)} {
        width: 200px;
      }
      ${mediaQueries(BREAKPOINT_DESKTOP)} {
        width: 220px;
      }
    }
  }
`;
