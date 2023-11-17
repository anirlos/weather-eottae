import React from "react";
import 구름 from "../../assets/main/흐림.png";
import styled from "styled-components";

const WeatherDays = () => {
  const now = new Date();
  const todayWeak = now.getDay();
  const today = now.getDate();
  const lastday = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

  const [daylist, setDaylist] = useState([]);
  const [weaklist, setWeaklist] = useState([]);

  const getAlldate = (today, lastday) => {
    let dates = [];

    dates[0] = today;
    for (let i = 1; i <= 6; i++) {
      today++;
      //마지막 날보다 날짜가 클경우 today를 1로 초기화.
      if (today > lastday) {
        today = 1;
        dates[i] = today;
      }
      //일반 경우 그냥 날짜 추가
      else {
        dates[i] = today;
      }
    }

    //요일 정상적으로 뜨는지 확인해보자
    //console.log(dates[1].getDay());

    return dates;
  };

  const getAllweak = (todayWeak) => {
    let strWeak = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let weaklist = [];

    //첫번째 오늘 날짜 적용

    weaklist[0] = strWeak[todayWeak];

    for (let i = 1; i <= 6; i++) {
      todayWeak++;
      if (todayWeak > 6) {
        todayWeak = 0;
        weaklist[i] = strWeak[todayWeak];
      } else {
        weaklist[i] = strWeak[todayWeak];
      }
    }

    return weaklist;
  };

  const CalendarDay = getAlldate(today, lastday);
  const CalendarWeak = getAllweak(todayWeak);

  /*⭐⭐날짜와 요일을 같이 표시하기위해서 만들어 놓은 객체
  날짜를 하나씩 출력해서 객체로 만들기위해서 함수를 실행시킨뒤
  분해로 하나씩 넣는 방법을 사용했음 ⭐⭐*/
  const CalendarObject = [
    { weak: CalendarWeak[0], day: CalendarDay[0] },
    { weak: CalendarWeak[1], day: CalendarDay[1] },

    { weak: CalendarWeak[2], day: CalendarDay[2] },
    { weak: CalendarWeak[3], day: CalendarDay[3] },
    { weak: CalendarWeak[4], day: CalendarDay[4] },
    { weak: CalendarWeak[5], day: CalendarDay[5] },
    { weak: CalendarWeak[6], day: CalendarDay[6] },
  ];

  //velog.io/@lifeisbeautiful/React-%EC%9D%BC%EC%A3%BC%EC%9D%BC-%EB%8B%AC%EB%A0%A5-%EB%A7%8C%EB%93%A4%EA%B8%B0

  https: useEffect(() => {
    return () => console.log("Clean up");
  });

  const Weak = useRef(null);

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
