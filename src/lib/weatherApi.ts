const API_KEY = "895284fb2d2c50a520ea537456963d9c";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  icon: string;
}

export interface ForecastData {
  day: string;
  high: number;
  low: number;
  condition: string;
}

const kelvinToCelsius = (kelvin: number) => kelvin - 273.15;
const celsiusToFahrenheit = (celsius: number) => (celsius * 9) / 5 + 32;

export const fetchWeatherData = async (city: string, unit: "C" | "F"): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error("City not found");
    }
    
    const data = await response.json();
    
    let temp = kelvinToCelsius(data.main.temp);
    let feelsLike = kelvinToCelsius(data.main.feels_like);
    
    if (unit === "F") {
      temp = celsiusToFahrenheit(temp);
      feelsLike = celsiusToFahrenheit(feelsLike);
    }
    
    return {
      location: `${data.name}, ${data.sys.country}`,
      temperature: temp,
      condition: data.weather[0].main,
      feelsLike: feelsLike,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
      icon: data.weather[0].icon,
    };
  } catch (error) {
    throw new Error("Failed to fetch weather data");
  }
};

export const fetchForecastData = async (city: string, unit: "C" | "F"): Promise<ForecastData[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error("City not found");
    }
    
    const data = await response.json();
    
    // Group by day and get daily highs/lows
    const dailyData: { [key: string]: { temps: number[]; conditions: string[] } } = {};
    
    data.list.forEach((item: any) => {
      const date = new Date(item.dt * 1000);
      const dayKey = date.toLocaleDateString("en-US", { weekday: "short" });
      
      if (!dailyData[dayKey]) {
        dailyData[dayKey] = { temps: [], conditions: [] };
      }
      
      let temp = kelvinToCelsius(item.main.temp);
      if (unit === "F") {
        temp = celsiusToFahrenheit(temp);
      }
      
      dailyData[dayKey].temps.push(temp);
      dailyData[dayKey].conditions.push(item.weather[0].main);
    });
    
    return Object.entries(dailyData)
      .slice(0, 5)
      .map(([day, { temps, conditions }]) => ({
        day,
        high: Math.max(...temps),
        low: Math.min(...temps),
        condition: conditions[0],
      }));
  } catch (error) {
    throw new Error("Failed to fetch forecast data");
  }
};
