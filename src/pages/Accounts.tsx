import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Wallet, Trash2, CheckCircle2 } from "lucide-react";
import { accountsAPI } from "@/lib/api";
import { AccountForm } from "@/components/forms/AccountForm";
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

interface Account {
  id: number;
  owner_id: number;
  name: string;
  account_type: string;
  balance: number;
  created_at: string;
}

const Accounts = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userName, setUserName] = useState("User");
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState<number | null>(
    null
  );
  const [activeAccountId, setActiveAccountId] = useState<number | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
      return;
    }
    const userData = JSON.parse(user);
    setUserName(userData.name);

    // Get active account from localStorage
    const savedActiveAccountId = localStorage.getItem("activeAccountId");
    if (savedActiveAccountId) {
      setActiveAccountId(Number(savedActiveAccountId));
    }

    fetchAccounts();
  }, [navigate]);

  const fetchAccounts = async () => {
    try {
      const response = await accountsAPI.getAll();
      // Remove duplicates by id
      const uniqueAccounts = Array.from(
        new Map(response.data.map((acc: Account) => [acc.id, acc])).values()
      ) as Account[];
      setAccounts(uniqueAccounts);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatAccountType = (type: string) => {
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleDeleteClick = (accountId: number) => {
    setSelectedAccountId(accountId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedAccountId) return;

    try {
      await accountsAPI.delete(selectedAccountId);

      // If deleted account was active, clear it
      if (activeAccountId === selectedAccountId) {
        localStorage.removeItem("activeAccountId");
        setActiveAccountId(null);
      }

      toast({
        title: "Success",
        description: "Account deleted successfully",
      });

      fetchAccounts();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.detail || "Failed to delete account",
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setSelectedAccountId(null);
    }
  };

  const handleSetActiveAccount = (accountId: number) => {
    localStorage.setItem("activeAccountId", accountId.toString());
    setActiveAccountId(accountId);

    toast({
      title: "Active Account Changed",
      description: "Dashboard will now show data for this account",
    });
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar userName={userName} />

      <div className="flex-1 flex flex-col ml-60 h-screen overflow-auto">
        <DashboardHeader userName={userName} />

        <main className="flex-1 p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Accounts</h1>
              <p className="text-muted-foreground">
                Manage your financial accounts
              </p>
            </div>
            <Button className="gap-2" onClick={() => setFormOpen(true)}>
              <Plus size={20} />
              New Account
            </Button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-muted-foreground">Loading accounts...</p>
            </div>
          ) : accounts.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">
                  No accounts yet. Create your first account to get started!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {accounts.map((account) => (
                <Card
                  key={account.id}
                  className={`hover:shadow-lg transition-smooth relative ${
                    activeAccountId === account.id ? "ring-2 ring-primary" : ""
                  }`}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 right-3 h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => handleDeleteClick(account.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                  <CardHeader>
                    <div className="flex items-center justify-between pr-8">
                      <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                        <Wallet className="text-accent" size={24} />
                      </div>
                      <span className="text-sm text-muted-foreground capitalize">
                        {formatAccountType(account.account_type)}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-xl mb-4 flex items-center gap-2">
                      {account.name}
                      {activeAccountId === account.id && (
                        <CheckCircle2 className="text-primary" size={20} />
                      )}
                    </CardTitle>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          Balance
                        </span>
                        <span className="text-2xl font-bold">
                          ₦{account.balance.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Created</span>
                        <span>
                          {new Date(account.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      {activeAccountId !== account.id && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full mt-2"
                          onClick={() => handleSetActiveAccount(account.id)}
                        >
                          Set as Active
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <AccountForm
            open={formOpen}
            onOpenChange={setFormOpen}
            onSuccess={fetchAccounts}
          />

          <AlertDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this account? This action
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

export default Accounts;
