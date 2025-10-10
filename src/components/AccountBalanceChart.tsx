import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

const data = [
  { month: "Jan", value: 2800 },
  { month: "Feb", value: 3200 },
  { month: "Mar", value: 3600 },
  { month: "Apr", value: 3400 },
  { month: "May", value: 2900 },
  { month: "Jun", value: 1892 },
  { month: "Jul", value: 2400 },
  { month: "Aug", value: 3800 },
  { month: "Sep", value: 4200 },
  { month: "Oct", value: 3900 },
  { month: "Nov", value: 4100 },
  { month: "Dec", value: 3700 },
];

const timeFilters = ["Day", "Week", "Month", "Year"];

export const AccountBalanceChart = () => {
  const [activeFilter, setActiveFilter] = useState("Year");

  return (
    <div className="bg-card rounded-xl p-6 shadow-sm border border-border col-span-2 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">Account Balance</h2>
        <div className="flex gap-2 bg-muted rounded-lg p-1">
          {timeFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
                activeFilter === filter
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
          <XAxis 
            dataKey="month" 
            stroke="hsl(var(--muted-foreground))"
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `$${value / 1000}k`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              padding: "8px 12px",
            }}
            labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 600 }}
            itemStyle={{ color: "hsl(var(--primary))" }}
            formatter={(value: number) => [`$${value.toLocaleString()}`, "Balance"]}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="hsl(var(--primary))"
            strokeWidth={3}
            dot={{ fill: "hsl(var(--primary))", r: 4 }}
            activeDot={{ r: 6, fill: "hsl(var(--accent))" }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-4 text-center">
        <p className="text-sm text-muted-foreground">28 Jun</p>
        <p className="text-2xl font-bold text-foreground mt-1">$1,892</p>
      </div>
    </div>
  );
};