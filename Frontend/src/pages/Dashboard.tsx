import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import RealtimeStats from "@/components/RealtimeStats";
import LiveTrafficMap from "@/components/LiveTrafficMap";

const Dashboard = () => {

  const trafficFlowData = [
    { time: "00:00", flow: 120, incidents: 2 },
    { time: "04:00", flow: 80, incidents: 1 },
    { time: "08:00", flow: 450, incidents: 5 },
    { time: "12:00", flow: 380, incidents: 3 },
    { time: "16:00", flow: 520, incidents: 8 },
    { time: "20:00", flow: 340, incidents: 4 },
  ];

  const congestionData = [
    { route: "Route A", level: 85, status: "High" },
    { route: "Route B", level: 45, status: "Low" },
    { route: "Route C", level: 92, status: "Critical" },
    { route: "Route D", level: 65, status: "Medium" },
    { route: "Route E", level: 38, status: "Low" },
    { route: "Route F", level: 78, status: "High" },
  ];

  const weeklyTrends = [
    { day: "Mon", vehicles: 12500, avgSpeed: 45 },
    { day: "Tue", vehicles: 13200, avgSpeed: 42 },
    { day: "Wed", vehicles: 14100, avgSpeed: 38 },
    { day: "Thu", vehicles: 13800, avgSpeed: 40 },
    { day: "Fri", vehicles: 15200, avgSpeed: 35 },
    { day: "Sat", vehicles: 11000, avgSpeed: 52 },
    { day: "Sun", vehicles: 9500, avgSpeed: 58 },
  ];

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">Traffic Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time monitoring and analytics for smart traffic management
          </p>
        </div>

        {/* Stats Grid with Real-time Updates */}
        <div className="mb-8">
          <RealtimeStats />
        </div>

        {/* Live Traffic Map */}
        <Card className="animate-slide-up border-border mb-8">
          <CardHeader>
            <CardTitle>Live Traffic Map</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <LiveTrafficMap />
          </CardContent>
        </Card>

        {/* Charts Row 1 */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Traffic Flow Chart */}
          <Card className="animate-slide-up border-border">
            <CardHeader>
              <CardTitle>Traffic Flow (24h)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={trafficFlowData}>
                  <defs>
                    <linearGradient id="colorFlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="flow"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorFlow)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Congestion Levels Chart */}
          <Card className="animate-slide-up border-border" style={{ animationDelay: "0.1s" }}>
            <CardHeader>
              <CardTitle>Congestion Levels by Route</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={congestionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="route" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Bar 
                    dataKey="level" 
                    fill="hsl(var(--secondary))"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Trends Chart */}
        <Card className="animate-slide-up border-border mb-8" style={{ animationDelay: "0.2s" }}>
          <CardHeader>
            <CardTitle>Weekly Traffic Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={weeklyTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" />
                <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="vehicles"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="avgSpeed"
                  stroke="hsl(var(--secondary))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--secondary))", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card className="animate-slide-up border-border" style={{ animationDelay: "0.3s" }}>
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: "Critical", route: "Highway A-12", issue: "Major congestion detected", time: "5 min ago", color: "danger" },
                { type: "Warning", route: "Main Street", issue: "Traffic signal malfunction", time: "12 min ago", color: "warning" },
                { type: "Info", route: "Route B-8", issue: "Planned maintenance ahead", time: "1 hour ago", color: "primary" },
              ].map((alert, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-${alert.color}/10`}>
                    <AlertTriangle className={`h-5 w-5 text-${alert.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold">{alert.route}</span>
                      <span className="text-xs text-muted-foreground">{alert.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{alert.issue}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
