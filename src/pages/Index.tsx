import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { BalanceCard } from "@/components/BalanceCard";
import { AccountBalanceChart } from "@/components/AccountBalanceChart";
import { TransactionsTable } from "@/components/TransactionsTable";
import { InvestmentChart } from "@/components/InvestmentChart";
import { Wallet, PiggyBank, TrendingUp, Search, Bell, Menu, X } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 transform transition-transform duration-300 lg:transform-none ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-card border-b border-border px-6 py-4 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Welcome back, Ashley</h1>
                <p className="text-sm text-muted-foreground">Here's an overview of all of your balances.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-muted rounded-lg transition-colors relative">
                <Search className="w-5 h-5 text-muted-foreground" />
              </button>
              <button className="p-2 hover:bg-muted rounded-lg transition-colors relative">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
              </button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white font-semibold">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <BalanceCard
              title="Total Balance"
              amount="$11,716.77"
              change="+4%"
              icon={Wallet}
              iconColor="bg-primary/10 text-primary"
            />
            <BalanceCard
              title="Main Account"
              amount="$3,252.13"
              change="+2.5%"
              icon={Wallet}
              iconColor="bg-accent/10 text-accent"
            />
            <BalanceCard
              title="Savings"
              amount="$4,000.00"
              change="+10%"
              icon={PiggyBank}
              iconColor="bg-success/10 text-success"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <AccountBalanceChart />
            <InvestmentChart />
          </div>

          <div className="grid grid-cols-1 gap-6">
            <TransactionsTable />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
