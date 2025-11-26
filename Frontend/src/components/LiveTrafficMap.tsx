import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import api from '@/lib/api';
import socketLib from '@/lib/socket';

const LiveTrafficMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [tokenSaved, setTokenSaved] = useState(false);

  const [trafficPoints, setTrafficPoints] = useState<any[]>([]);

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
  }, [tokenSaved, mapboxToken, trafficPoints]);

  // Fetch initial points and listen for live updates
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const api = (await import('@/lib/api')).default;
        const intersections = await api.getIntersections();
        const lights = await api.getLights();
        // Build points from intersections and lights
        const pts = (intersections || []).map((i: any) => ({
          id: i._id,
          name: i.name,
          lng: i.coords?.lng || (i.coords && i.coords[0]) || -74.006,
          lat: i.coords?.lat || (i.coords && i.coords[1]) || 40.7128,
          congestion: i.congestionLevel || 0,
          status: i.congestionLevel > 80 ? 'critical' : i.congestionLevel > 60 ? 'high' : i.congestionLevel > 30 ? 'medium' : 'low'
        }));
        if (isMounted) setTrafficPoints(pts);
        const socket = socketLib.connectSocket();
        socket.on('traffic-update', (updates: any[]) => {
          // updates: [{ id: intersectionId, congestion }]
          setTrafficPoints(prev => prev.map(p => {
            const u = updates.find((x: any) => String(x.id) === String(p.id));
            if (u) {
              const c = u.congestion;
              return { ...p, congestion: c, status: c > 80 ? 'critical' : c > 60 ? 'high' : c > 30 ? 'medium' : 'low' };
            }
            return p;
          }));
        });
      } catch (err) {
        console.error('Failed to fetch traffic data', err);
      }
    }
    loadData();
    return () => { isMounted = false; };
  }, []);

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
