import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Activity, 
  AlertTriangle, 
  Car, 
  Clock, 
  TrendingDown, 
  TrendingUp 
} from "lucide-react";

interface Stat {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: typeof Car;
  color: string;
}

const RealtimeStats = () => {
  const [stats, setStats] = useState<Stat[]>([
    {
      title: "Active Routes",
      value: "1,247",
      change: "+12.5%",
      trend: "up",
      icon: Car,
      color: "text-primary",
    },
    {
      title: "Avg. Travel Time",
      value: "18.3 min",
      change: "-8.2%",
      trend: "down",
      icon: Clock,
      color: "text-success",
    },
    {
      title: "Traffic Incidents",
      value: "23",
      change: "+5.1%",
      trend: "up",
      icon: AlertTriangle,
      color: "text-warning",
    },
    {
      title: "System Efficiency",
      value: "94.7%",
      change: "+2.3%",
      trend: "up",
      icon: Activity,
      color: "text-secondary",
    },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prevStats => prevStats.map(stat => {
        const randomChange = (Math.random() * 2 - 1).toFixed(1);
        const changeValue = parseFloat(randomChange);
        const newChange = `${changeValue > 0 ? '+' : ''}${randomChange}%`;
        
        return {
          ...stat,
          change: newChange,
          trend: changeValue > 0 ? "up" as const : "down" as const,
        };
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="animate-scale-in border-border hover:shadow-lg transition-all cursor-pointer"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className={`flex items-center space-x-1 text-sm font-medium transition-colors ${
                stat.trend === "up" 
                  ? stat.title === "Traffic Incidents" 
                    ? "text-danger" 
                    : "text-success"
                  : "text-success"
              }`}>
                {stat.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 animate-pulse" />
                ) : (
                  <TrendingDown className="h-4 w-4 animate-pulse" />
                )}
                <span>{stat.change}</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RealtimeStats;
