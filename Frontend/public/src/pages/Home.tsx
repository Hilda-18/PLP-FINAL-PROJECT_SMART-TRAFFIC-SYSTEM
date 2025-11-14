import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, TrendingDown, MapPin, Shield, Zap, BarChart3 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Home = () => {
  const features = [
    {
      icon: Clock,
      title: "Save Time",
      description: "Reduce your travel time by up to 45% with intelligent route optimization"
    },
    {
      icon: TrendingDown,
      title: "Cut Costs",
      description: "Lower fuel consumption by 20-35% with efficient route planning"
    },
    {
      icon: MapPin,
      title: "Real-Time Updates",
      description: "Get live traffic conditions and alternative route suggestions"
    },
    {
      icon: Shield,
      title: "Reliable Navigation",
      description: "Trust our proven algorithms for consistent, accurate routing"
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Get multiple route options in seconds with traffic analysis"
    },
    {
      icon: BarChart3,
      title: "Track Progress",
      description: "Monitor your time savings and efficiency improvements"
    }
  ];

  const stats = [
    { value: "2-3 hrs", label: "Average Time Saved Daily" },
    { value: "35%", label: "Fuel Cost Reduction" },
    { value: "10k+", label: "Routes Optimized" },
    { value: "98%", label: "User Satisfaction" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10" />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Beat Nairobi Traffic with{" "}
              <span className="text-primary">Smart Routes</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Save hours every day with intelligent route optimization. Real-time traffic data, 
              multiple route alternatives, and personalized recommendations for your daily commute.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/routes">
                <Button size="lg" className="w-full sm:w-auto">
                  Find Your Route
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose SmartRoute?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Designed specifically for urban commuters in Kenya, helping you navigate traffic 
              efficiently and save valuable time every day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="border-border hover:border-primary transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Ready to Transform Your Commute?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Join thousands of Kenyans who are already saving time and money with SmartRoute.
            </p>
            <Link to="/auth">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Start Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
