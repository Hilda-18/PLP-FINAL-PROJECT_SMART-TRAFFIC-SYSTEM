import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BarChart3, Map, Shield, Zap } from "lucide-react";
import heroImage from "@/assets/hero-traffic.jpg";
import dashboardPreview from "@/assets/dashboard-preview.jpg";
import smartRoads from "@/assets/smart-roads.jpg";

const Home = () => {
  const features = [
    {
      icon: BarChart3,
      title: "Real-Time Analytics",
      description: "Monitor traffic flow and patterns with advanced analytics and visualization tools.",
    },
    {
      icon: Map,
      title: "Interactive Maps",
      description: "View live traffic conditions, congestion levels, and optimal routes on interactive maps.",
    },
    {
      icon: Zap,
      title: "Smart Optimization",
      description: "AI-powered traffic signal optimization reduces congestion and improves flow efficiency.",
    },
    {
      icon: Shield,
      title: "Safety First",
      description: "Enhanced safety monitoring with incident detection and emergency response coordination.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src={heroImage} 
            alt="Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/95" />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-foreground">
                Smart Traffic{" "}
                <span className="text-primary">
                  Management System
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Revolutionize urban mobility with AI-powered traffic optimization, 
                real-time monitoring, and intelligent route management.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => (window.location.href = "/dashboard")}
                >
                  <Button size="lg" className="gradient-primary group">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </button>
                <button
                  type="button"
                  onClick={() => (window.location.href = "/analytics")}
                >
                  <Button size="lg" variant="outline">
                    View Analytics
                  </Button>
                </button>
              </div>
            </div>
            <div className="animate-slide-up">
              <img
                src={heroImage}
                alt="Smart Traffic Control Center"
                className="rounded-2xl shadow-2xl border border-border"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Why Choose SmartTraffic?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advanced features designed to optimize traffic flow and enhance urban mobility
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="animate-scale-in border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <img
                src={dashboardPreview}
                alt="Dashboard Preview"
                className="rounded-2xl shadow-2xl border border-border"
              />
            </div>
            <div className="animate-slide-up">
              <h2 className="text-4xl font-bold mb-6 text-foreground">
                Powerful Dashboard Analytics
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Access comprehensive traffic data and insights through our intuitive dashboard. 
                Monitor key metrics, analyze patterns, and make data-driven decisions to improve 
                traffic management.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Real-time traffic flow monitoring",
                  "Congestion prediction and alerts",
                  "Historical data analysis",
                  "Custom reports and exports",
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-success/20 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-success" />
                    </div>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <button type="button" onClick={() => (window.location.href = "/dashboard")}>
                <Button className="gradient-primary">
                  Explore Dashboard
                </Button>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Roads Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in order-2 lg:order-1">
              <h2 className="text-4xl font-bold mb-6 text-foreground">
                Intelligent Route Management
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Our advanced mapping system provides real-time visualization of traffic conditions, 
                enabling smart route planning and efficient traffic signal coordination.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-card p-4 rounded-lg border border-border">
                  <div className="text-3xl font-bold text-primary mb-1">
                    99.9%
                  </div>
                  <div className="text-sm text-muted-foreground">System Uptime</div>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <div className="text-3xl font-bold text-primary mb-1">
                    -35%
                  </div>
                  <div className="text-sm text-muted-foreground">Avg. Delay</div>
                </div>
              </div>
              <button type="button" onClick={() => (window.location.href = "/routes")}>
                <Button className="gradient-primary">
                  View Routes
                </Button>
              </button>
            </div>
            <div className="animate-slide-up order-1 lg:order-2">
              <img
                src={smartRoads}
                alt="Smart Roads"
                className="rounded-2xl shadow-2xl border border-border"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-br from-primary/90 to-secondary/90 border-none overflow-hidden">
            <CardContent className="p-12 text-center">
              <h2 className="text-4xl font-bold text-white mb-4">
                Ready to Transform Your City's Traffic?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join leading cities worldwide in implementing smart traffic management solutions
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button type="button" onClick={() => (window.location.href = "/auth")}>
                  <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                    Get Started Today
                  </Button>
                </button>
                <button type="button" onClick={() => (window.location.href = "/payments")}>
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                    View Pricing
                  </Button>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;
