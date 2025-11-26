import { useState } from "react";
import { Button } from "@/components/ui/button";
import ThemeToggle from './ThemeToggle';
import BackendStatus from './BackendStatus';
import { 
  Home, 
  LayoutDashboard, 
  Route, 
  BarChart3, 
  CreditCard, 
  LogIn, 
  LogOut, 
  Menu, 
  X, 
  Github
} from "lucide-react";

interface NavigationProps {
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

const Navigation = ({ isAuthenticated = false, onLogout }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home", icon: Home },
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/routes", label: "Routes", icon: Route },
    { to: "/analytics", label: "Analytics", icon: BarChart3 },
    { to: "/payments", label: "Payments", icon: CreditCard },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => window.location.href = "/"} 
            className="flex items-center space-x-3 hover:opacity-90 transition-opacity"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-primary to-secondary shadow-lg">
              <Route className="h-7 w-7 text-white" />
            </div>
            <span className="text-2xl font-extrabold text-foreground">
              SmartTraffic
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <button
                key={link.to}
                onClick={() => window.location.href = link.to}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-foreground/70 transition-all hover:text-foreground hover:bg-muted"
              >
                <link.icon className="h-4 w-4" />
                <span>{link.label}</span>
              </button>
            ))}
          </div>

          {/* Auth Button */}
          <div className="hidden md:flex items-center space-x-2">
            <ThemeToggle />
            <BackendStatus />
            <a href="https://github.com/Hilda-18/PLP-FINAL-PROJECT_SMART-TRAFFIC-SYSTEM/tree/main/backend" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-muted transition-colors">
              <Github className="h-5 w-5" />
            </a>
            {isAuthenticated ? (
              <Button
                variant="outline"
                size="sm"
                onClick={onLogout}
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            ) : (
              <button type="button" onClick={() => window.location.href = "/auth"}>
                <Button
                  size="sm"
                  className="flex items-center space-x-2 gradient-primary"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Button>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 animate-slide-up">
            <div className="px-4 pb-4">
              <ThemeToggle />
            </div>
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.to}
                  onClick={() => {
                    window.location.href = link.to;
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground transition-all hover:text-foreground hover:bg-muted"
                >
                  <link.icon className="h-5 w-5" />
                  <span>{link.label}</span>
                </button>
              ))}
              <div className="pt-2 border-t border-border">
                {isAuthenticated ? (
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center space-x-2"
                    onClick={() => {
                      onLogout?.();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </Button>
                ) : (
                  <button 
                    type="button" 
                    onClick={() => {
                      window.location.href = "/auth";
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full"
                  >
                    <Button className="w-full flex items-center justify-center space-x-2 gradient-primary">
                      <LogIn className="h-4 w-4" />
                      <span>Login</span>
                    </Button>
                  </button>
                )}
              </div>
              <div className="pt-2 border-t border-border mt-2">
                <a href="https://github.com/Hilda-18/PLP-FINAL-PROJECT_SMART-TRAFFIC-SYSTEM" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center space-x-2 p-3 rounded-lg hover:bg-muted">
                  <Github className="h-4 w-4" />
                  <span>View on GitHub</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
