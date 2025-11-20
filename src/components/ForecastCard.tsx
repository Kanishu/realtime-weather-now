import { Card } from "@/components/ui/card";
import { Cloud, CloudRain, Sun } from "lucide-react";

interface ForecastCardProps {
  day: string;
  high: number;
  low: number;
  condition: string;
  unit: "C" | "F";
}

export const ForecastCard = ({ day, high, low, condition, unit }: ForecastCardProps) => {
  const getWeatherIcon = (condition: string) => {
    const lower = condition.toLowerCase();
    if (lower.includes("rain")) return <CloudRain className="h-8 w-8" />;
    if (lower.includes("cloud")) return <Cloud className="h-8 w-8" />;
    return <Sun className="h-8 w-8" />;
  };

  return (
    <Card className="bg-card/50 backdrop-blur-glass border-white/20 p-4 hover:scale-105 transition-transform duration-300 animate-slide-up">
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm font-medium text-foreground">{day}</p>
        <div className="text-primary">
          {getWeatherIcon(condition)}
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-foreground">{Math.round(high)}°</p>
          <p className="text-sm text-muted-foreground">{Math.round(low)}°</p>
        </div>
      </div>
    </Card>
  );
};
