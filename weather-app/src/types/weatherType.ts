export interface weatherType {
  weatherData: {
    locationName: string;
    currentTemp: number;
    weatherDescription: string;
    minTemp: number;
    maxTemp: number;
    precipitation: number;
    uvIndex: number;
  };
}

export interface forecastType {
  forecastData: {
    date: string; // 날짜
    weatherDescription: string;
    minTemp: number; // 최저 기온
    maxTemp: number; // 최고 기온
  };
}
