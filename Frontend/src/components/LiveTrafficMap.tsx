import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const LiveTrafficMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [tokenSaved, setTokenSaved] = useState(false);

  // Sample traffic data points
  const trafficPoints = [
    { name: "Route A - Main St", lng: -74.006, lat: 40.7128, status: "high", congestion: 85 },
    { name: "Route B - Broadway", lng: -73.996, lat: 40.7228, status: "medium", congestion: 55 },
    { name: "Route C - 5th Ave", lng: -73.986, lat: 40.7428, status: "low", congestion: 25 },
    { name: "Route D - Park Ave", lng: -73.976, lat: 40.7528, status: "critical", congestion: 95 },
    { name: "Route E - Madison", lng: -73.966, lat: 40.7628, status: "medium", congestion: 60 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical": return "#ef4444";
      case "high": return "#f97316";
      case "medium": return "#eab308";
      case "low": return "#22c55e";
      default: return "#6b7280";
    }
  };

  const handleSaveToken = () => {
    if (!mapboxToken.trim()) {
      toast.error("Please enter a valid Mapbox token");
      return;
    }
    setTokenSaved(true);
    toast.success("Token saved! Loading map...");
  };

  useEffect(() => {
    if (!mapContainer.current || !tokenSaved || !mapboxToken) return;

    try {
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [-73.986, 40.7428],
        zoom: 12,
        pitch: 45,
      });

      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      map.current.on('load', () => {
        // Add traffic layer (if available with token)
        if (map.current) {
          try {
            map.current.addSource('mapbox-traffic', {
              type: 'vector',
              url: 'mapbox://mapbox.mapbox-traffic-v1'
            });

            map.current.addLayer({
              id: 'traffic',
              type: 'line',
              source: 'mapbox-traffic',
              'source-layer': 'traffic',
              paint: {
                'line-width': 3,
                'line-color': [
                  'case',
                  ['==', 'low', ['get', 'congestion']],
                  '#22c55e',
                  ['==', 'moderate', ['get', 'congestion']],
                  '#eab308',
                  ['==', 'heavy', ['get', 'congestion']],
                  '#f97316',
                  ['==', 'severe', ['get', 'congestion']],
                  '#ef4444',
                  '#6b7280'
                ]
              }
            });
          } catch (error) {
            console.log('Traffic layer not available with current token');
          }
        }

        // Add custom markers for traffic points
        trafficPoints.forEach((point) => {
          const el = document.createElement('div');
          el.className = 'traffic-marker';
          el.style.width = '30px';
          el.style.height = '30px';
          el.style.borderRadius = '50%';
          el.style.backgroundColor = getStatusColor(point.status);
          el.style.border = '3px solid white';
          el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
          el.style.cursor = 'pointer';
          el.style.animation = 'pulse 2s infinite';

          const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<div style="padding: 8px;">
              <h3 style="font-weight: bold; margin-bottom: 4px;">${point.name}</h3>
              <p style="margin: 2px 0;">Status: <strong>${point.status.toUpperCase()}</strong></p>
              <p style="margin: 2px 0;">Congestion: <strong>${point.congestion}%</strong></p>
            </div>`
          );

          new mapboxgl.Marker(el)
            .setLngLat([point.lng, point.lat])
            .setPopup(popup)
            .addTo(map.current!);
        });
      });

      return () => {
        map.current?.remove();
      };
    } catch (error) {
      toast.error("Failed to initialize map. Please check your token.");
      setTokenSaved(false);
    }
  }, [tokenSaved, mapboxToken]);

  if (!tokenSaved) {
    return (
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Live Traffic Map Setup</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="mapbox-token">Mapbox Access Token</Label>
            <Input
              id="mapbox-token"
              type="password"
              placeholder="Enter your Mapbox public token"
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              Get your free token at{' '}
              <a 
                href="https://account.mapbox.com/access-tokens/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                mapbox.com
              </a>
            </p>
          </div>
          <Button onClick={handleSaveToken} className="w-full gradient-primary">
            Load Map
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[500px]">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg shadow-lg" />
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};

export default LiveTrafficMap;
