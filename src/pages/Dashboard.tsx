import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, TrendingDown, MapPin, Calendar, Route } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Dashboard = () => {
  const stats = [
    {
      icon: Clock,
      title: "Time Saved",
      value: "42 hours",
      description: "This month",
      trend: "+12%",
      trendPositive: true
    },
    {
      icon: TrendingDown,
      title: "Fuel Saved",
      value: "KES 3,450",
      description: "Cost reduction",
      trend: "23%",
      trendPositive: true
    },
    {
      icon: Route,
      title: "Routes Taken",
      value: "127",
      description: "Total journeys",
      trend: "+8",
      trendPositive: true
    },
    {
      icon: MapPin,
      title: "Distance",
      value: "1,248 km",
      description: "Optimized distance",
      trend: "-15%",
      trendPositive: true
    }
  ];

  const recentRoutes = [
    {
      id: 1,
      from: "Westlands",
      to: "CBD",
      date: "Today, 8:30 AM",
      duration: "25 mins",
      saved: "12 mins",
      status: "completed"
    },
    {
      id: 2,
      from: "CBD",
      to: "Kilimani",
      date: "Yesterday, 6:45 PM",
      duration: "18 mins",
      saved: "8 mins",
      status: "completed"
    },
    {
      id: 3,
      from: "Kilimani",
      to: "Westlands",
      date: "Yesterday, 7:30 AM",
      duration: "22 mins",
      saved: "15 mins",
      status: "completed"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-lg text-muted-foreground">
            Track your route efficiency and time savings
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <stat.icon className="h-5 w-5 text-primary" />
                  <Badge variant={stat.trendPositive ? "default" : "secondary"}>
                    {stat.trend}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Routes */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Routes</CardTitle>
            <CardDescription>Your latest optimized journeys</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRoutes.map((route) => (
                <div
                  key={route.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="font-medium text-foreground">
                        {route.from} → {route.to}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {route.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {route.duration}
                      </span>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-accent">
                    Saved {route.saved}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Activity Chart Placeholder */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
            <CardDescription>Your route usage over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Chart visualization coming soon</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
