import { Button } from "@/components/ui/button";

interface UnitToggleProps {
  unit: "C" | "F";
  onToggle: () => void;
}

export const UnitToggle = ({ unit, onToggle }: UnitToggleProps) => {
  return (
    <Button
      onClick={onToggle}
      variant="outline"
      size="sm"
      className="bg-card/50 backdrop-blur-glass border-white/20 hover:bg-primary hover:text-primary-foreground transition-all"
    >
      °{unit}
    </Button>
  );
};
