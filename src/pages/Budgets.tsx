import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { budgetsAPI } from "@/lib/api";
import { BudgetForm } from "@/components/forms/BudgetForm";

const Budgets = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");
  const [userId, setUserId] = useState<number>(1);
  const [budgets, setBudgets] = useState<any[]>([]);
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
    setUserId(userData.id || 1);

    fetchBudgets(userData.id || 1);
  }, [navigate]);

  const fetchBudgets = async (uid: number) => {
    try {
      const response = await budgetsAPI.getByUser(uid);
      setBudgets(response.data);
    } catch (error) {
      console.error("Error fetching budgets:", error);
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
              <h1 className="text-3xl font-bold mb-2">Budgets</h1>
              <p className="text-muted-foreground">
                Manage your spending categories and limits
              </p>
            </div>
            <Button className="gap-2" onClick={() => setFormOpen(true)}>
              <Plus size={20} />
              New Budget
            </Button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-muted-foreground">Loading budgets...</p>
            </div>
          ) : budgets.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">
                  No budgets yet. Create your first budget to get started!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {budgets.map((budget) => {
                const percentage =
                  (budget.spent_amount / budget.limit_amount) * 100;
                const isNearLimit = percentage > 80;
                const isOverLimit = percentage > 100;

                return (
                  <Card key={budget.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                          {budget.category_id}
                        </CardTitle>
                        <span className="text-sm text-muted-foreground capitalize">
                          {budget.period}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Spent</span>
                          <span className="font-semibold">
                            ${budget.spent_amount} / ${budget.limit_amount}
                          </span>
                        </div>
                        <Progress
                          value={Math.min(percentage, 100)}
                          className={`h-2 ${
                            isOverLimit
                              ? "[&>div]:bg-destructive"
                              : isNearLimit
                              ? "[&>div]:bg-warning"
                              : ""
                          }`}
                        />
                        <div className="flex items-center justify-between text-sm">
                          <span
                            className={`font-medium ${
                              isOverLimit
                                ? "stat-negative"
                                : isNearLimit
                                ? "text-warning"
                                : "stat-positive"
                            }`}
                          >
                            {percentage.toFixed(1)}% used
                          </span>
                          <span className="text-muted-foreground">
                            $
                            {(
                              budget.limit_amount - budget.spent_amount
                            ).toFixed(2)}{" "}
                            remaining
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          <BudgetForm
            open={formOpen}
            onOpenChange={setFormOpen}
            onSuccess={() => fetchBudgets(userId)}
          />
        </main>
      </div>
    </div>
  );
};

export default Budgets;
