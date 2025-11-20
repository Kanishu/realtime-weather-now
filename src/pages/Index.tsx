import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { WeatherSearch } from "@/components/WeatherSearch";
import { CurrentWeather } from "@/components/CurrentWeather";
import { ForecastCard } from "@/components/ForecastCard";
import { UnitToggle } from "@/components/UnitToggle";
import { fetchWeatherData, fetchForecastData } from "@/lib/weatherApi";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const Index = () => {
  const [city, setCity] = useState("London");
  const [unit, setUnit] = useState<"C" | "F">("C");
  const { toast } = useToast();

  const { data: weatherData, isLoading: weatherLoading, error: weatherError } = useQuery({
    queryKey: ["weather", city, unit],
    queryFn: () => fetchWeatherData(city, unit),
    refetchInterval: 300000, // Refetch every 5 minutes
  });

  const { data: forecastData, isLoading: forecastLoading } = useQuery({
    queryKey: ["forecast", city, unit],
    queryFn: () => fetchForecastData(city, unit),
    refetchInterval: 300000,
  });

  useEffect(() => {
    if (weatherError) {
      toast({
        title: "Error",
        description: "Failed to fetch weather data. Please try another city.",
        variant: "destructive",
      });
    }
  }, [weatherError, toast]);

  const handleSearch = (newCity: string) => {
    setCity(newCity);
  };

  const toggleUnit = () => {
    setUnit((prev) => (prev === "C" ? "F" : "C"));
  };

  const getBackgroundGradient = () => {
    if (!weatherData) return "bg-gradient-cloudy";
    
    const condition = weatherData.condition.toLowerCase();
    const hour = new Date().getHours();
    
    if (hour < 6 || hour > 20) return "bg-gradient-night";
    if (condition.includes("rain")) return "bg-gradient-rainy";
    if (condition.includes("cloud")) return "bg-gradient-cloudy";
    return "bg-gradient-sunny";
  };

  return (
    <div className={`min-h-screen ${getBackgroundGradient()} transition-all duration-1000`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground">Weather App</h1>
          <UnitToggle unit={unit} onToggle={toggleUnit} />
        </div>

        <div className="space-y-8">
          <WeatherSearch onSearch={handleSearch} />

          {weatherLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          ) : weatherData ? (
            <>
              <CurrentWeather data={weatherData} unit={unit} />

              {forecastLoading ? (
                <div className="flex justify-center items-center py-10">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : forecastData ? (
                <div className="animate-slide-up">
                  <h2 className="text-2xl font-bold text-foreground mb-4">5-Day Forecast</h2>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {forecastData.map((forecast, index) => (
                      <ForecastCard
                        key={index}
                        day={forecast.day}
                        high={forecast.high}
                        low={forecast.low}
                        condition={forecast.condition}
                        unit={unit}
                      />
                    ))}
                  </div>
                </div>
              ) : null}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Index;
