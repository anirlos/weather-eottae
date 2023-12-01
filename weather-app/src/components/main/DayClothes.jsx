import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import 기온표 from '../../assets/img/main/기온표.png';
import Winter from '../../assets/img/main/clothes/winter.png';
import Summer from '../../assets/img/main/clothes/summer.png';
import EarlyWin from '../../assets/img/main/clothes/earlywinter.png';
import BeginWin from '../../assets/img/main/clothes/beginWinter.png';
import Fall from '../../assets/img/main/clothes/fall.png';
import EarlySum from '../../assets/img/main/clothes/earlySummer.png';
import BeginSum from '../../assets/img/main/clothes/beginSummer.png';
import EarlyFall from '../../assets/img/main/clothes/earlyFall.png';

const DayClothes = (props) => {
	const roundTemperature = (temp) => {
		return typeof temp === 'number' ? Math.round(temp) : 'N/A';
	};

	const currentTemp = roundTemperature(props.weatherData.currentTemp);

	let winter = currentTemp <= 4;
	let earlyWinter = currentTemp >= 5 && currentTemp < 9;
	let beginWinter = currentTemp >= 9 && currentTemp < 12;
	let fall = currentTemp >= 12 && currentTemp < 17;
	let earlyFall = currentTemp >= 17 && currentTemp < 19;
	let earlySummer = currentTemp >= 20 && currentTemp < 23;
	let beginSummer = currentTemp >= 23 && currentTemp < 27;
	let summer = currentTemp >= 28;

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
			return <img src={Winter} />;
		} else if (earlyWinter) {
			return <img src={EarlyWin} />;
		} else if (beginWinter) {
			return <img src={BeginWin} />;
		} else if (fall) {
			return <img src={Fall} />;
		} else if (earlyFall) {
			return <img src={EarlyFall} />;
		} else if (earlySummer) {
			return <img src={EarlySum} />;
		} else if (beginSummer) {
			return <img src={BeginSum} />;
		} else {
			return <img src={Summer} />;
		}
	}

	return (
		<DayClothesWrap>
			<h2 className="title">오늘의 추천 옷차림</h2>
			<div className="clothes__info">
				<img id="temp-icon" src={기온표} />
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
			padding-bottom: 10px;
		}
		p {
			font-size: 20px;
			padding-bottom: 30px;
			padding-top: 20px;
		}
	}
	.weather-info {
		font-size: 20px;
		padding: 20px;
	}
	.clothes-img {
		width: 100px;
		img {
			width: 300px;
		}
	}
	#temp-icon {
		width: 90px;
	}
`;
