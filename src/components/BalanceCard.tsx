import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface BalanceCardProps {
  title: string;
  amount: string;
  change: string;
  icon: LucideIcon;
  iconColor: string;
}

export const BalanceCard = ({ title, amount, change, icon: Icon, iconColor }: BalanceCardProps) => {
  const isPositive = change.startsWith("+");
  
  return (
    <div className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-all duration-300 animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div className={cn("p-3 rounded-lg", iconColor)}>
          <Icon className="w-6 h-6" />
        </div>
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 6C10.5523 6 11 5.55228 11 5C11 4.44772 10.5523 4 10 4C9.44772 4 9 4.44772 9 5C9 5.55228 9.44772 6 10 6Z" fill="currentColor"/>
            <path d="M10 11C10.5523 11 11 10.5523 11 10C11 9.44772 10.5523 9 10 9C9.44772 9 9 9.44772 9 10C9 10.5523 9.44772 11 10 11Z" fill="currentColor"/>
            <path d="M10 16C10.5523 16 11 15.5523 11 15C11 14.4477 10.5523 14 10 14C9.44772 14 9 14.4477 9 15C9 15.5523 9.44772 16 10 16Z" fill="currentColor"/>
          </svg>
        </button>
      </div>
      
      <div>
        <p className="text-sm text-muted-foreground mb-1">{title}</p>
        <div className="flex items-end justify-between">
          <h3 className="text-2xl font-bold text-foreground">{amount}</h3>
          <span className={cn(
            "text-sm font-medium px-2 py-1 rounded",
            isPositive ? "text-success bg-success-light" : "text-destructive"
          )}>
            {change}
          </span>
        </div>
      </div>
    </div>
  );
};
