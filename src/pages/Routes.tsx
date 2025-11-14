import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, TrendingUp, Navigation as NavIcon } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Routes = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (origin && destination) {
      setShowResults(true);
    }
  };

  const mockRoutes = [
    {
      id: 1,
      name: "Fastest Route",
      distance: "12.5 km",
      duration: "28 mins",
      traffic: "Light",
      trafficColor: "success",
      savings: "15 mins saved"
    },
    {
      id: 2,
      name: "Balanced Route",
      distance: "14.2 km",
      duration: "32 mins",
      traffic: "Moderate",
      trafficColor: "warning",
      savings: "11 mins saved"
    },
    {
      id: 3,
      name: "Shortest Distance",
      distance: "11.8 km",
      duration: "35 mins",
      traffic: "Heavy",
      trafficColor: "destructive",
      savings: "8 mins saved"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Find Your Optimal Route
            </h1>
            <p className="text-lg text-muted-foreground">
              Enter your starting point and destination to get intelligent route suggestions
            </p>
          </div>

          {/* Search Form */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Route Search</CardTitle>
              <CardDescription>
                Get real-time route recommendations based on current traffic conditions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    Starting Point
                  </label>
                  <Input
                    placeholder="e.g., Westlands, Nairobi"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <NavIcon className="h-4 w-4 text-primary" />
                    Destination
                  </label>
                  <Input
                    placeholder="e.g., CBD, Nairobi"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Find Routes
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Results */}
          {showResults && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Available Routes
              </h2>
              
              {mockRoutes.map((route) => (
                <Card key={route.id} className="hover:border-primary transition-colors cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {route.name}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant={route.trafficColor as any}>
                            {route.traffic} Traffic
                          </Badge>
                          <Badge variant="outline" className="text-accent">
                            {route.savings}
                          </Badge>
                        </div>
                      </div>
                      <Button>Select Route</Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <TrendingUp className="h-4 w-4" />
                        <span>{route.distance}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{route.duration}</span>
                      </div>
                    </div>

                    {/* Placeholder for map */}
                    <div className="mt-4 h-32 bg-muted rounded-lg flex items-center justify-center">
                      <p className="text-sm text-muted-foreground">Route visualization coming soon</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!showResults && (
            <Card className="bg-muted/30">
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">
                  Enter your origin and destination to see available routes
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Routes;
