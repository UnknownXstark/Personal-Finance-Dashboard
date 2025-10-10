import { LayoutDashboard, Wallet, TrendingUp, FileText, Settings, LogOut, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "budgets", label: "Budgets", icon: DollarSign },
  { id: "expenses", label: "Expenses", icon: Wallet },
  { id: "investments", label: "Investments", icon: TrendingUp },
  { id: "reports", label: "Reports", icon: FileText },
  { id: "settings", label: "Settings", icon: Settings },
];

export const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  return (
    <aside className="bg-sidebar text-sidebar-foreground w-64 min-h-screen p-6 flex flex-col transition-all duration-300">
      <div className="mb-12">
        <h1 className="text-2xl font-bold text-sidebar-primary-foreground flex items-center gap-2">
          <span className="text-sidebar-primary">v</span>wealty
        </h1>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                activeTab === item.id
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-sidebar-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto space-y-4">
        <div className="bg-sidebar-accent rounded-lg p-4">
          <h3 className="font-semibold text-sidebar-accent-foreground mb-2">Have a question?</h3>
          <p className="text-sm text-sidebar-foreground/80 mb-3">
            Send us a message and we will get back to you in no time.
          </p>
          <button className="w-full bg-sidebar-primary text-sidebar-primary-foreground py-2 rounded-lg hover:opacity-90 transition-opacity">
            Contact us
          </button>
        </div>

        <button className="w-full flex items-center gap-3 px-4 py-3 text-sidebar-foreground hover:text-sidebar-accent-foreground transition-colors">
          <LogOut className="w-5 h-5" />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
};
