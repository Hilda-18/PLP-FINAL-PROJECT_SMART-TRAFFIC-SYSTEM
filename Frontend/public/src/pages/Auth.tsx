import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navigation as NavIcon } from "lucide-react";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, type: "login" | "signup") => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // In production, this would navigate to dashboard
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-gradient-hero p-2 rounded-lg">
              <NavIcon className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-foreground">SmartRoute</span>
          </Link>
        </div>
      </div>

      {/* Auth Forms */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome to SmartRoute
            </h1>
            <p className="text-muted-foreground">
              Start optimizing your routes today
            </p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Login</CardTitle>
                  <CardDescription>
                    Enter your credentials to access your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={(e) => handleSubmit(e, "login")} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="login-email" className="text-sm font-medium text-foreground">
                        Email
                      </label>
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="you@example.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="login-password" className="text-sm font-medium text-foreground">
                        Password
                      </label>
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="••••••••"
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Logging in..." : "Login"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="signup">
              <Card>
                <CardHeader>
                  <CardTitle>Create Account</CardTitle>
                  <CardDescription>
                    Sign up to start saving time on your commute
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={(e) => handleSubmit(e, "signup")} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="signup-name" className="text-sm font-medium text-foreground">
                        Full Name
                      </label>
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="signup-email" className="text-sm font-medium text-foreground">
                        Email
                      </label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="you@example.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="signup-password" className="text-sm font-medium text-foreground">
                        Password
                      </label>
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="••••••••"
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Creating account..." : "Sign Up"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <p className="text-center text-sm text-muted-foreground mt-6">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
