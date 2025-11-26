import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, CreditCard, Zap, Building, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import api from '@/lib/api';

const Payments = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: "$299",
      period: "/month",
      description: "Perfect for small cities",
      icon: Zap,
      features: [
        "Up to 50 traffic routes",
        "Real-time monitoring",
        "Basic analytics",
        "Email support",
        "Monthly reports",
      ],
      color: "border-muted",
      popular: false,
    },
    {
      id: "pro",
      name: "Professional",
      price: "$799",
      period: "/month",
      description: "Best for growing municipalities",
      icon: Building,
      features: [
        "Up to 200 traffic routes",
        "Advanced AI optimization",
        "Comprehensive analytics",
        "Priority support",
        "Custom integrations",
        "Incident management",
        "Weekly reports",
      ],
      color: "border-primary",
      popular: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large-scale deployments",
      icon: Star,
      features: [
        "Unlimited traffic routes",
        "Full AI suite",
        "Advanced predictive analytics",
        "24/7 dedicated support",
        "White-label solutions",
        "Custom development",
        "SLA guarantees",
        "On-premise deployment",
      ],
      color: "border-secondary",
      popular: false,
    },
  ];

  const paymentHistory = [
    {
      date: "2024-11-01",
      plan: "Professional",
      amount: "$799.00",
      status: "Paid",
      invoice: "INV-2024-001",
    },
    {
      date: "2024-10-01",
      plan: "Professional",
      amount: "$799.00",
      status: "Paid",
      invoice: "INV-2024-002",
    },
    {
      date: "2024-09-01",
      plan: "Professional",
      amount: "$799.00",
      status: "Paid",
      invoice: "INV-2024-003",
    },
  ];

  const handleSelectPlan = async (planId: string) => {
    setSelectedPlan(planId);
    // For demo we will call backend to initiate a payment (Daraja STK push) with a mocked payload.
    try {
      const phone = prompt('Enter phone number for MPesa payment', '254712345678') || '254700000000';
      const amount = planId === 'basic' ? 299 : planId === 'pro' ? 799 : 9999;
      const res = await api.initiateStkPush({ amount, phone, accountRef: 'plan-' + planId, description: `Purchase ${planId}`, orderId: 'order-' + Date.now() });
      toast.success('Payment initiated');
    } catch (err: any) {
      toast.error(err.message || 'Payment initiation failed');
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select the perfect plan for your city's traffic management needs
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card
              key={plan.id}
              className={`animate-scale-in relative ${plan.color} ${
                plan.popular ? "shadow-xl scale-105" : ""
              } hover:shadow-2xl transition-all duration-300`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="gradient-primary px-4 py-1">Most Popular</Badge>
                </div>
              )}
              <CardHeader className="text-center pb-8">
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <plan.icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
                <div className="mt-4">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-success/20 flex items-center justify-center mt-0.5">
                        <Check className="h-3 w-3 text-success" />
                      </div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${plan.popular ? "gradient-primary" : ""}`}
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => handleSelectPlan(plan.id)}
                >
                  {plan.id === "enterprise" ? "Contact Sales" : "Get Started"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Payment Methods */}
        <Card className="mb-8 animate-slide-up border-border">
          <CardHeader>
            <CardTitle>Accepted Payment Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-6 items-center justify-center">
              {[
                { name: "Credit Card", icon: CreditCard },
                { name: "M-Pesa", icon: CreditCard },
                { name: "Stripe", icon: CreditCard },
                { name: "PayPal", icon: CreditCard },
              ].map((method, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 px-6 py-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <method.icon className="h-5 w-5 text-primary" />
                  <span className="font-medium">{method.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment History */}
        <Card className="animate-slide-up border-border" style={{ animationDelay: "0.1s" }}>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold">Date</th>
                    <th className="text-left py-3 px-4 font-semibold">Plan</th>
                    <th className="text-left py-3 px-4 font-semibold">Amount</th>
                    <th className="text-left py-3 px-4 font-semibold">Status</th>
                    <th className="text-left py-3 px-4 font-semibold">Invoice</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map((payment, index) => (
                    <tr key={index} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4">{payment.date}</td>
                      <td className="py-3 px-4">{payment.plan}</td>
                      <td className="py-3 px-4 font-semibold">{payment.amount}</td>
                      <td className="py-3 px-4">
                        <Badge className="bg-success/10 text-success hover:bg-success/20">
                          {payment.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Button variant="link" size="sm" className="p-0 h-auto">
                          {payment.invoice}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Payments;
