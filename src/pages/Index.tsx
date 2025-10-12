import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TrendingUp, Shield, PieChart, ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            vwealty
          </h1>
          <p className="text-2xl text-muted-foreground mb-8">
            Take control of your financial future with intelligent insights and
            simple tools
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              className="gap-2 text-lg px-8"
              onClick={() => navigate("/register")}
            >
              Get Started <ArrowRight size={20} />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8"
              onClick={() => navigate("/login")}
            >
              Sign In
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-24 max-w-5xl mx-auto">
          <div className="text-center p-6">
            <div className="h-16 w-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="text-accent" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Smart Tracking</h3>
            <p className="text-muted-foreground">
              Monitor all your accounts, investments, and expenses in one
              beautiful dashboard
            </p>
          </div>

          <div className="text-center p-6">
            <div className="h-16 w-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <PieChart className="text-accent" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Budget Management</h3>
            <p className="text-muted-foreground">
              Set goals, create budgets, and stay on track with intelligent
              alerts
            </p>
          </div>

          <div className="text-center p-6">
            <div className="h-16 w-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="text-accent" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Secure & Private</h3>
            <p className="text-muted-foreground">
              Bank-level security ensures your financial data stays protected
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;