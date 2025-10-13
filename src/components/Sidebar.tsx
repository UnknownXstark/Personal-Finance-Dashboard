import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Wallet,
  TrendingDown,
  TrendingUp,
  FileText,
  Settings,
  LogOut,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  userName?: string;
}

const Sidebar = ({ userName }: SidebarProps) => {
  const navigate = useNavigate();

  const navItems = [
    { path: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { path: "/accounts", label: "Accounts", icon: Wallet },
    { path: "/budgets", label: "Budgets", icon: Wallet },
    { path: "/expenses", label: "Expenses", icon: TrendingDown },
    { path: "/investments", label: "Investments", icon: TrendingUp },
    { path: "/reports", label: "Reports", icon: FileText },
    { path: "/settings", label: "Settings", icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside className="w-60 h-screen bg-sidebar-background text-sidebar-foreground flex flex-col fixed left-0 top-0 z-10">
      {/* Logo */}
      <div className="p-6">
        <h1 className="text-2xl font-bold tracking-tight">vwealty</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth ${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  }`
                }
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Help Section */}
      <div className="p-4 mx-4 mb-6 bg-sidebar-accent rounded-xl">
        <div className="flex items-start gap-3 mb-3">
          <MessageCircle size={20} className="mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-sm mb-1">Have a question?</h3>
            <p className="text-xs text-sidebar-foreground/70">
              Send us a message and we will get back to you in no time.
            </p>
          </div>
        </div>
        <Button
          size="sm"
          className="w-full bg-sidebar-foreground/10 hover:bg-sidebar-foreground/20 text-sidebar-foreground"
        >
          Contact us
        </Button>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sidebar-foreground/80 hover:bg-sidebar-accent/50 transition-smooth"
        >
          <LogOut size={20} />
          <span className="font-medium">Log out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
