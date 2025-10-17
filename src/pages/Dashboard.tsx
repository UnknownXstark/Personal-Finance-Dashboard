import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import StatCard from "@/components/StatCard";
import BalanceChart from "@/components/BalanceChart";
import TransactionsTable from "@/components/TransactionsTable";
import InvestmentsChart from "@/components/InvestmentsChart";
import { Wallet, PiggyBank, TrendingUp } from "lucide-react";
import { reportsAPI, accountsAPI } from "@/lib/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");
  const [userId, setUserId] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState({
    total_balance: 0,
    total_investments: 0,
    total_budget: 0,
  });
  const [accounts, setAccounts] = useState<any[]>([]);
  const [activeAccount, setActiveAccount] = useState<any>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
      return;
    }

    const userData = JSON.parse(user);
    setUserName(userData.name);
    setUserId(userData.id || 1);

    fetchDashboardData(userData.id || 1);
  }, [navigate]);

  const fetchDashboardData = async (uid: number) => {
    try {
      const [overviewRes, accountsRes] = await Promise.all([
        reportsAPI.getOverview(uid),
        accountsAPI.getAll(),
      ]);

      setOverview(overviewRes.data);
      setAccounts(accountsRes.data);

      // Set active account based on localStorage
      const activeAccountId = localStorage.getItem("activeAccountId");
      if (activeAccountId && accountsRes.data.length > 0) {
        const active = accountsRes.data.find(
          (acc: any) => acc.id === Number(activeAccountId)
        );
        setActiveAccount(active || accountsRes.data[0]);
      } else if (accountsRes.data.length > 0) {
        setActiveAccount(accountsRes.data[0]);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
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
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-muted-foreground">Loading dashboard...</p>
            </div>
          ) : (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard
                  title="Total Balance"
                  value={`$${overview.total_balance.toLocaleString()}`}
                  change={5.2}
                  icon={Wallet}
                  iconBg="bg-accent/10"
                />
                <StatCard
                  title={activeAccount?.name || "Active Account"}
                  value={`$${activeAccount?.balance.toLocaleString() || 0}`}
                  change={2.1}
                  icon={Wallet}
                  iconBg="bg-accent/10"
                />
                <StatCard
                  title="Total Investments"
                  value={`$${overview.total_investments.toLocaleString()}`}
                  change={10}
                  icon={TrendingUp}
                  iconBg="bg-success/10"
                />
              </div>

              {/* Chart and Investments */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2">
                  <BalanceChart />
                </div>
                <div>
                  <InvestmentsChart />
                </div>
              </div>

              {/* Transactions Table */}
              <TransactionsTable />
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
