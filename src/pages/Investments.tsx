import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, TrendingUp, TrendingDown } from "lucide-react";
import { mockInvestments, mockDashboardOverview } from "@/data/mockData";

const Investments = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
      return;
    }
    const userData = JSON.parse(user);
    setUserName(userData.name);
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar userName={userName} />

      <div className="flex-1 flex flex-col">
        <DashboardHeader userName={userName} />

        <main className="flex-1 p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Investments</h1>
              <p className="text-muted-foreground">
                Track and manage your investment portfolio
              </p>
            </div>
            <Button className="gap-2">
              <Plus size={20} />
              Add Investment
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-1">
                  Total Value
                </p>
                <h3 className="text-3xl font-bold mb-2">
                  ${mockDashboardOverview.total_investments.toLocaleString()}
                </h3>
                <p className="text-sm stat-positive">
                  +{mockDashboardOverview.investment_change}%
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-1">
                  Total Return
                </p>
                <h3 className="text-3xl font-bold mb-2 stat-positive">
                  +$1,208.64
                </h3>
                <p className="text-sm stat-positive">+37.4% all time</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-1">
                  Active Investments
                </p>
                <h3 className="text-3xl font-bold mb-2">
                  {mockInvestments.length}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Across {new Set(mockInvestments.map((i) => i.category)).size}{" "}
                  categories
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Investment Portfolio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockInvestments.map((investment) => (
                  <div
                    key={investment.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-smooth"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                        <TrendingUp className="text-accent" size={24} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">
                          {investment.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {investment.category}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">
                        ${investment.amount.toFixed(2)}
                      </p>
                      <p className="text-sm stat-positive">
                        +{investment.percentage}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Investments;