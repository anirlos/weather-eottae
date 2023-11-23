import React from "react";
import styled from "styled-components";
import 비 from "../../assets/img/main/비.png";
import 평균기온 from "../../assets/img/main/온도.png";
import 자외선 from "../../assets/img/main/자외선.png";
import 강수확률 from "../../assets/img/main/강수.png";

const DayWaether = () => {
  //   let currentTemp = '';

  //   let winter = currentTemp <=4;
  //   let earlyWinter = currentTemp >= 5 && currentTemp < 9;
  //   let beginWinter = currentTemp >= 10 && currentTemp < 9;
  //   let fall = currentTemp >= 5 && currentTemp < 9;
  //   let earlyFall = currentTemp >= 5 && currentTemp < 9;
  //   let earlySummer = currentTemp >= 5 && currentTemp < 9;
  //   let beginSummer = currentTemp >= 5 && currentTemp < 9;
  //   let summer = currentTemp >=28;

  //   function todayClothes() {

  //     if(winter) {
  // return <p>겨울 옷, 방한용품</p>;
  //     } else if(earlyWinter) {
  //       return <p>울 코트, 가죽자켓, 히트텍, 기모</p>;
  //     } else if (beginWinter){
  //       return <p>트렌치코트, 야상, 점퍼</p>;
  //     }else if(fall) {
  //       return <p>자켓, 가디건, 맨투맨, 후드, 긴 바지</p>;
  //     }else if(earlyFall){
  //       return <p>얇은 가디건, 니트, 맨투맨, 긴바지</p>;
  //     }else if (earlySummer){
  //       return <p>블라우스, 긴팔 티, 면바지, 슬랙스</p>
  //     }else if (beginSummer){
  //       return <p>반팔, 얇은 셔츠, 반바지, 면바지</p>
  //     }else{
  //       return <p>민소매, 반팔, 반바지, 린넨 옷</p>
  //     }

  //     }

  //     function clothesImg() {
  //   if(winter) {
  //     return <img />;
  //         } else if(earlyWinter) {
  //           return <p>패딩, 겨울 코트, 방한용품</p>;
  //         } else if (beginWinter){
  //           return <p>울 코트, 히트텍, 가죽 자켓</p>;
  //         }else if(fall) {
  //           return <p>자켓, 트렌치 코트, 점퍼, 후드, 긴 바지</p>;
  //         }else if(earlyFall){
  //           return <p>얇은 가디건, 니트, 맨투맨, 긴바지</p>;
  //         }else if (earlySummer){
  //           return <p>블라우스, 긴팔 티, 면바지, 슬랙스</p>
  //         }else if (beginSummer){
  //           return <p>반팔, 얇은 셔츠, 반바지, 면바지</p>
  //         }else{
  //           return <p>민소매, 반팔, 반바지, 린넨 옷</p>
  //         }
  // }

  return (
    <DayWaetherWarp>
      <h2 className="title">오늘의 날씨</h2>

      <TodayWrap>
        <img src={비} />
        <HighLowTemperatures>
          <div id="high">16</div>
          <div>--</div>
          <div id="low">12</div>
        </HighLowTemperatures>

        <div className="today-weather">14°C</div>
      </TodayWrap>
      <div className="weather__infos">
        <div className="weather__info--box">
          <p className="weather__info--title">평균기온</p>
          <img src={평균기온} />
          <p className="weather__info--value">14°C</p>
        </div>
        <div className="weather__info--box">
          <p className="weather__info--title">강수확률</p>
          <img src={자외선} />
          <p className="weather__info--value">20%</p>
        </div>
        <div className="weather__info--box">
          <p className="weather__info--title">강수확률</p>
          <img src={강수확률} />
          <p className="weather__info--value">높음</p>
        </div>
      </div>
    </DayWaetherWarp>
  );
};

export default DayWaether;

const DayWaetherWarp = styled.div`
  width: 470px;
  height: 500px;
  border-radius: 10px;
  box-shadow: 2px 4px 10px 0 #dcdbdb;
  background-color: white;
  text-align: center;
  .weather__info--title {
    font-size: large;

    margin: 10px 0 5px 0;
  }
  .weather__infos {
    display: flex;
    justify-content: space-around;
    align-items: center;
    img {
      width: 4.6rem;
      height: 4.6rem;
    }
  }
  .title {
    text-align: center;
    font-size: 24px;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .weather__info--box {
    width: 115px;
    height: 160px;
    box-shadow: 2px 4px 10px 0 #dcdbdb;
    border-radius: 10px;
  }
  .weather__info--value {
    margin: 5px;
  }
`;

const TodayWrap = styled.div`
  display: flex;

  height: 230px;
  img {
    margin-left: 20px;
    width: 240px;
    height: 170px;
  }
  .today-weather {
    line-height: 150px;
    font-size: 64px;
    margin-left: 20px;
  }
`;

const HighLowTemperatures = styled.div`
  height: 230px;
  padding-top: 10%;
  font-size: 10px;

  #high {
    color: #ff0000;
    font-size: 20px;
  }
  #low {
    color: #5d6dbe;
    font-size: 20px;
  }
`;
