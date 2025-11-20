import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const Analytics = () => {
  const monthlyData = [
    { month: "Jan", vehicles: 125000, incidents: 45, efficiency: 89 },
    { month: "Feb", vehicles: 132000, incidents: 38, efficiency: 91 },
    { month: "Mar", vehicles: 145000, incidents: 52, efficiency: 87 },
    { month: "Apr", vehicles: 138000, incidents: 41, efficiency: 92 },
    { month: "May", vehicles: 152000, incidents: 48, efficiency: 90 },
    { month: "Jun", vehicles: 148000, incidents: 35, efficiency: 94 },
  ];

  const timeDistribution = [
    { hour: "0-4", percentage: 8 },
    { hour: "4-8", percentage: 22 },
    { hour: "8-12", percentage: 35 },
    { hour: "12-16", percentage: 28 },
    { hour: "16-20", percentage: 42 },
    { hour: "20-24", percentage: 15 },
  ];

  const vehicleTypes = [
    { name: "Cars", value: 65, color: "hsl(var(--primary))" },
    { name: "Trucks", value: 15, color: "hsl(var(--secondary))" },
    { name: "Buses", value: 8, color: "hsl(var(--accent))" },
    { name: "Motorcycles", value: 12, color: "hsl(var(--success))" },
  ];

  const routePerformance = [
    { route: "Route A", efficiency: 95, avgDelay: 2.3 },
    { route: "Route B", efficiency: 88, avgDelay: 4.1 },
    { route: "Route C", efficiency: 76, avgDelay: 8.5 },
    { route: "Route D", efficiency: 92, avgDelay: 3.2 },
    { route: "Route E", efficiency: 84, avgDelay: 5.7 },
  ];

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">Traffic Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive insights and performance metrics for data-driven decisions
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Monthly Traffic Chart */}
              <Card className="animate-slide-up border-border">
                <CardHeader>
                  <CardTitle>Monthly Traffic Volume</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={monthlyData}>
                      <defs>
                        <linearGradient id="colorVehicles" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="vehicles"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorVehicles)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Vehicle Type Distribution */}
              <Card className="animate-slide-up border-border" style={{ animationDelay: "0.1s" }}>
                <CardHeader>
                  <CardTitle>Vehicle Type Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={vehicleTypes}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {vehicleTypes.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Time Distribution */}
            <Card className="animate-slide-up border-border" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle>Peak Hour Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={timeDistribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="percentage" fill="hsl(var(--secondary))" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Route Efficiency */}
              <Card className="animate-slide-up border-border">
                <CardHeader>
                  <CardTitle>Route Efficiency</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={routePerformance} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                      <YAxis dataKey="route" type="category" stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="efficiency" fill="hsl(var(--success))" radius={[0, 8, 8, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Average Delays */}
              <Card className="animate-slide-up border-border" style={{ animationDelay: "0.1s" }}>
                <CardHeader>
                  <CardTitle>Average Delays (minutes)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={routePerformance}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="route" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="avgDelay" fill="hsl(var(--warning))" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Performance Metrics */}
            <Card className="animate-slide-up border-border" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle>Key Performance Indicators</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6">
                  {[
                    { label: "System Uptime", value: "99.9%", color: "text-success" },
                    { label: "Response Time", value: "1.2s", color: "text-primary" },
                    { label: "Data Accuracy", value: "98.5%", color: "text-secondary" },
                    { label: "User Satisfaction", value: "4.8/5", color: "text-accent" },
                  ].map((metric, index) => (
                    <div key={index} className="text-center">
                      <p className="text-sm text-muted-foreground mb-2">{metric.label}</p>
                      <p className={`text-3xl font-bold ${metric.color}`}>{metric.value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trends Tab */}
          <TabsContent value="trends" className="space-y-6">
            <Card className="animate-slide-up border-border">
              <CardHeader>
                <CardTitle>6-Month Traffic Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" />
                    <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="vehicles"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--primary))", r: 5 }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="efficiency"
                      stroke="hsl(var(--success))"
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--success))", r: 5 }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="incidents"
                      stroke="hsl(var(--danger))"
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--danger))", r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Analytics;
