import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface WeatherSearchProps {
  onSearch: (city: string) => void;
}

export const WeatherSearch = ({ onSearch }: WeatherSearchProps) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      onSearch(searchValue.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative max-w-md w-full mx-auto">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
      <Input
        type="text"
        placeholder="Search for a city..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="pl-10 bg-card/50 backdrop-blur-glass border-white/20 focus:border-primary transition-all"
      />
    </form>
  );
};
