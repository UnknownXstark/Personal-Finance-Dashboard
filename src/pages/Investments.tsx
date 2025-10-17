import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, TrendingUp } from "lucide-react";
import { investmentsAPI } from "@/lib/api";
import { InvestmentForm } from "@/components/forms/InvestmentForm";

const Investments = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");
  const [investments, setInvestments] = useState<any[]>([]);
  const [summary, setSummary] = useState({
    total_amount: 0,
    average_percentage: 0,
  });
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
      return;
    }
    const userData = JSON.parse(user);
    setUserName(userData.name);

    fetchInvestments();
  }, [navigate]);

  const fetchInvestments = async () => {
    try {
      const [investmentsRes, summaryRes] = await Promise.all([
        investmentsAPI.getAll(),
        investmentsAPI.getSummary(),
      ]);

      setInvestments(investmentsRes.data);
      setSummary(summaryRes.data);
    } catch (error) {
      console.error("Error fetching investments:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar userName={userName} />

      <div className="flex-1 flex flex-col ml-60 h-screen overflow-auto">
        <DashboardHeader userName={userName} />

        <main className="flex-1 p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Investments</h1>
              <p className="text-muted-foreground">
                Track and manage your investment portfolio
              </p>
            </div>
            <Button className="gap-2" onClick={() => setFormOpen(true)}>
              <Plus size={20} />
              Add Investment
            </Button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-muted-foreground">Loading investments...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground mb-1">
                      Total Value
                    </p>
                    <h3 className="text-3xl font-bold mb-2">
                      ₦{summary.total_amount.toLocaleString()}
                    </h3>
                    <p className="text-sm stat-positive">
                      +{summary.average_percentage.toFixed(1)}%
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground mb-1">
                      Average Return
                    </p>
                    <h3 className="text-3xl font-bold mb-2 stat-positive">
                      +{summary.average_percentage.toFixed(1)}%
                    </h3>
                    <p className="text-sm stat-positive">Portfolio average</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground mb-1">
                      Active Investments
                    </p>
                    <h3 className="text-3xl font-bold mb-2">
                      {investments.length}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Across{" "}
                      {new Set(investments.map((i) => i.category_id)).size}{" "}
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
                  {investments.length === 0 ? (
                    <div className="p-12 text-center">
                      <p className="text-muted-foreground">
                        No investments yet. Add your first investment to get
                        started!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {investments.map((investment) => (
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
                                {investment.category_id}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg">
                              ₦{investment.amount.toFixed(2)}
                            </p>
                            <p className="text-sm stat-positive">
                              +{investment.percentage}%
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}

          <InvestmentForm
            open={formOpen}
            onOpenChange={setFormOpen}
            onSuccess={fetchInvestments}
          />
        </main>
      </div>
    </div>
  );
};

export default Investments;
