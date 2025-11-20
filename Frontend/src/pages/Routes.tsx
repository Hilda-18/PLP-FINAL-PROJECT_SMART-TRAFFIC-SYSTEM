import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const Routes = () => {
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  const routes = [
    {
      id: "1",
      name: "Route A - Downtown",
      position: [37.7749, -122.4194] as [number, number],
      status: "optimal",
      congestion: "Low",
      avgSpeed: 45,
      trafficLights: 8,
      incidents: 0,
    },
    {
      id: "2",
      name: "Route B - Highway",
      position: [37.7849, -122.4094] as [number, number],
      status: "moderate",
      congestion: "Medium",
      avgSpeed: 35,
      trafficLights: 3,
      incidents: 1,
    },
    {
      id: "3",
      name: "Route C - City Center",
      position: [37.7649, -122.4294] as [number, number],
      status: "congested",
      congestion: "High",
      avgSpeed: 18,
      trafficLights: 12,
      incidents: 3,
    },
    {
      id: "4",
      name: "Route D - Suburbs",
      position: [37.7549, -122.4394] as [number, number],
      status: "optimal",
      congestion: "Low",
      avgSpeed: 52,
      trafficLights: 5,
      incidents: 0,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimal":
        return { badge: "bg-success text-white", circle: "#10b981" };
      case "moderate":
        return { badge: "bg-warning text-white", circle: "#f59e0b" };
      case "congested":
        return { badge: "bg-danger text-white", circle: "#ef4444" };
      default:
        return { badge: "bg-muted", circle: "#6b7280" };
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">Route Management</h1>
          <p className="text-muted-foreground">
            Monitor and manage traffic routes with real-time data and interactive maps
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <Card className="lg:col-span-2 animate-slide-up border-border">
            <CardHeader>
              <CardTitle>Live Traffic Map</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[600px] rounded-lg overflow-hidden border border-border">
                <MapContainer
                  center={[37.7749, -122.4194]}
                  zoom={13}
                  style={{ height: "100%", width: "100%" }}
                  scrollWheelZoom={true}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {routes.map((route) => (
                    <div key={route.id}>
                      <Marker
                        position={route.position}
                        eventHandlers={{
                          click: () => setSelectedRoute(route.id),
                        }}
                      >
                        <Popup>
                          <div className="p-2">
                            <h3 className="font-semibold mb-1">{route.name}</h3>
                            <p className="text-sm">Congestion: {route.congestion}</p>
                            <p className="text-sm">Avg Speed: {route.avgSpeed} mph</p>
                            <p className="text-sm">Incidents: {route.incidents}</p>
                          </div>
                        </Popup>
                      </Marker>
                      <Circle
                        center={route.position}
                        radius={800}
                        pathOptions={{
                          color: getStatusColor(route.status).circle,
                          fillColor: getStatusColor(route.status).circle,
                          fillOpacity: 0.2,
                        }}
                      />
                    </div>
                  ))}
                </MapContainer>
              </div>
            </CardContent>
          </Card>

          {/* Routes List */}
          <Card className="animate-slide-up border-border" style={{ animationDelay: "0.1s" }}>
            <CardHeader>
              <CardTitle>Active Routes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {routes.map((route) => (
                  <div
                    key={route.id}
                    className={`p-4 rounded-lg border transition-all cursor-pointer hover:shadow-md ${
                      selectedRoute === route.id
                        ? "border-primary bg-primary/5"
                        : "border-border bg-card"
                    }`}
                    onClick={() => setSelectedRoute(route.id)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold">{route.name}</h3>
                      <Badge className={getStatusColor(route.status).badge}>
                        {route.congestion}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Avg Speed</p>
                        <p className="font-semibold">{route.avgSpeed} mph</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Traffic Lights</p>
                        <p className="font-semibold">{route.trafficLights}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Incidents</p>
                        <p className="font-semibold">{route.incidents}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Status</p>
                        <p className="font-semibold capitalize">{route.status}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Legend */}
        <Card className="mt-6 animate-fade-in border-border">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-6 items-center justify-center">
              <div className="flex items-center space-x-2">
                <div className="h-4 w-4 rounded-full bg-success" />
                <span className="text-sm">Optimal Flow</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-4 w-4 rounded-full bg-warning" />
                <span className="text-sm">Moderate Congestion</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-4 w-4 rounded-full bg-danger" />
                <span className="text-sm">High Congestion</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Routes;
