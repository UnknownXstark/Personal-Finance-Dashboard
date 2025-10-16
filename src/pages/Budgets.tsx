import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Edit } from "lucide-react";
import { budgetsAPI } from "@/lib/api";
import { BudgetForm } from "@/components/forms/BudgetForm";
import { BudgetEditForm } from "@/components/forms/BudgetEditorForm";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Budgets = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userName, setUserName] = useState("User");
  const [userId, setUserId] = useState<number>(1);
  const [budgets, setBudgets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<any>(null);

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

  const handleEditClick = (budget: any) => {
    setSelectedBudget(budget);
    setEditFormOpen(true);
  };

  const handleDeleteClick = (budget: any) => {
    setSelectedBudget(budget);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedBudget) return;

    try {
      await budgetsAPI.delete(selectedBudget.id);

      toast({
        title: "Success",
        description: "Budget deleted successfully",
      });

      fetchBudgets(userId);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.detail || "Failed to delete budget",
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setSelectedBudget(null);
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
                  <Card key={budget.id} className="relative">
                    <div className="absolute top-3 right-3 flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        onClick={() => handleEditClick(budget)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => handleDeleteClick(budget)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between pr-16">
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

          <BudgetEditForm
            open={editFormOpen}
            onOpenChange={setEditFormOpen}
            onSuccess={() => fetchBudgets(userId)}
            budget={selectedBudget}
          />

          <AlertDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this budget? This action
                  cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteConfirm}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </main>
      </div>
    </div>
  );
};

export default Budgets;
