import React, { useState, useEffect } from "react";
import styled from "styled-components";
import 기온표 from "../../assets/img/main/기온표.png";
import 패딩 from "../../assets/img/main/패딩.jpg";
import 코트 from "../../assets/img/main/코트.jpg";
import axios from "axios";
import Winter from "../../assets/img/main/clothes/winter.png";
import Summer from "../../assets/img/main/clothes/summer.png";
import EarlyWin from "../../assets/img/main/clothes/earlywinter.png";
import BeginWin from "../../assets/img/main/clothes/beginWinter.png";
import Fall from "../../assets/img/main/clothes/fall.png";
import EarlySum from "../../assets/img/main/clothes/earlySummer.png";
import BeginSum from "../../assets/img/main/clothes/beginSummer.png";
import EarlyFall from "../../assets/img/main/clothes/earlyFall.png";

const DayClothes = () => {
  const [clothesPtag, setClothesPtag] = useState("");
  const [img, setImg] = useState("");

  let currentTemp = 20;

  let winter = currentTemp <= 4;
  let earlyWinter = currentTemp >= 5 && currentTemp < 9;
  let beginWinter = currentTemp >= 10 && currentTemp < 9;
  let fall = currentTemp >= 5 && currentTemp < 9;
  let earlyFall = currentTemp >= 5 && currentTemp < 9;
  let earlySummer = currentTemp >= 5 && currentTemp < 9;
  let beginSummer = currentTemp >= 5 && currentTemp < 9;
  let summer = currentTemp >= 28;

  function todayClothes() {
    if (winter) {
      setClothesPtag("겨울 옷, 방한용품");
    } else if (earlyWinter) {
      setClothesPtag("울 코트, 가죽자켓, 히트텍, 기모");
    } else if (beginWinter) {
      setClothesPtag("트렌치코트, 야상, 점퍼");
    } else if (fall) {
      setClothesPtag("자켓, 가디건, 맨투맨, 후드, 긴 바지");
    } else if (earlyFall) {
      setClothesPtag("얇은 가디건, 니트, 맨투맨, 긴바지");
    } else if (earlySummer) {
      setClothesPtag("블라우스, 긴팔 티, 면바지, 슬랙스");
    } else if (beginSummer) {
      setClothesPtag("반팔, 얇은 셔츠, 반바지, 면바지");
    } else {
      setClothesPtag("민소매, 반팔, 반바지, 린넨 옷");
      <p></p>;
    }
  }

  function clothesImg() {
    if (winter) {
      setImg(`${Winter}`);
    } else if (earlyWinter) {
      setImg(`${EarlyWin}`);
    } else if (beginWinter) {
      setImg(`${BeginWin}`);
    } else if (fall) {
      setImg(`${Fall}`);
    } else if (earlyFall) {
      setImg(`${EarlyFall}`);
    } else if (earlySummer) {
      setImg(`${EarlySum}`);
    } else if (beginSummer) {
      setImg(`${BeginSum}`);
    } else {
      setImg(`${Summer}`);
    }
  }

  return (
    <DayClothesWrap>
      <h2 className="title">오늘의 추천 옷차림</h2>
      <div className="clothes__info">
        <img src={기온표} />
        <div>
          <p className="weather-info">현재 기온은 14°C 입니다</p>
          <div className="clothes">
            <h2>추천의상</h2>

            <img className="clothes__img" src={코트} />
            <img className="clothes__img" src={패딩} />

            <p>자켓, 가디건, 야상, 스타킹</p>
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
  }
  .clothes {
    text-align: center;
    border-radius: 10px;
    width: 300px;

    box-shadow: 2px 4px 10px 0 #dcdbdb;
    h2 {
      font-size: 24px;
      padding-top: 30px;
      padding-bottom: 30px;
    }
    p {
      font-size: 20px;
      padding-bottom: 50px;
      padding-top: 50px;
    }
  }
  .weather-info {
    font-size: 20px;
    padding: 20px;
  }
  .clothes__img {
    width: 100px;
  }
`;
