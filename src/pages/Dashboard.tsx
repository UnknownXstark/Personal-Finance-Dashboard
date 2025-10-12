import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import StatCard from "@/components/StatCard";
import BalanceChart from "@/components/BalanceChart";
import TransactionsTable from "@/components/TransactionsTable";
import InvestmentsChart from "@/components/InvestmentsChart";
import { Wallet, PiggyBank, TrendingUp } from "lucide-react";
import { mockDashboardOverview, mockAccounts } from "@/data/mockData";

const Dashboard = () => {
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
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
              title="Total Balance"
              value={`$${mockDashboardOverview.total_balance.toLocaleString()}`}
              change={mockDashboardOverview.balance_change}
              icon={Wallet}
              iconBg="bg-accent/10"
            />
            <StatCard
              title="Main Account"
              value={`$${mockAccounts[0].balance.toLocaleString()}`}
              change={2.1}
              icon={Wallet}
              iconBg="bg-accent/10"
            />
            <StatCard
              title="Savings"
              value={`$${mockAccounts[1].balance.toLocaleString()}`}
              change={10}
              icon={PiggyBank}
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
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
