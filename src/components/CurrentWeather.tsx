import { Cloud, CloudRain, Sun, Wind, Droplets } from "lucide-react";
import { Card } from "@/components/ui/card";

interface CurrentWeatherProps {
  data: {
    location: string;
    temperature: number;
    condition: string;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    icon: string;
  };
  unit: "C" | "F";
}

export const CurrentWeather = ({ data, unit }: CurrentWeatherProps) => {
  const getWeatherIcon = (condition: string) => {
    const lower = condition.toLowerCase();
    if (lower.includes("rain")) return <CloudRain className="h-24 w-24 animate-float" />;
    if (lower.includes("cloud")) return <Cloud className="h-24 w-24 animate-float" />;
    return <Sun className="h-24 w-24 animate-float" />;
  };

  return (
    <Card className="bg-card/50 backdrop-blur-glass border-white/20 p-8 animate-fade-in">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="text-primary">
            {getWeatherIcon(data.condition)}
          </div>
          <div>
            <h2 className="text-5xl font-bold text-foreground">
              {Math.round(data.temperature)}°{unit}
            </h2>
            <p className="text-2xl text-muted-foreground mt-2">{data.condition}</p>
            <p className="text-xl text-foreground font-medium mt-1">{data.location}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-6">
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Wind className="h-6 w-6 text-accent" />
            </div>
            <p className="text-sm text-muted-foreground">Wind</p>
            <p className="text-lg font-semibold text-foreground">{data.windSpeed} km/h</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Droplets className="h-6 w-6 text-accent" />
            </div>
            <p className="text-sm text-muted-foreground">Humidity</p>
            <p className="text-lg font-semibold text-foreground">{data.humidity}%</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Cloud className="h-6 w-6 text-accent" />
            </div>
            <p className="text-sm text-muted-foreground">Feels Like</p>
            <p className="text-lg font-semibold text-foreground">{Math.round(data.feelsLike)}°{unit}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
