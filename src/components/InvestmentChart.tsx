import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const data = [
  { name: "VOO", value: 35, color: "hsl(var(--chart-1))" },
  { name: "YTI", value: 25, color: "hsl(var(--chart-2))" },
  { name: "IDLN", value: 20, color: "hsl(var(--chart-3))" },
  { name: "BTEK", value: 20, color: "hsl(var(--chart-4))" },
];

export const InvestmentChart = () => {
  return (
    <div className="bg-card rounded-xl p-6 shadow-sm border border-border animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Investments</p>
          <h3 className="text-2xl font-bold text-foreground">$4,436.64</h3>
          <span className="text-sm font-medium text-success">+27.24%</span>
        </div>
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 6C10.5523 6 11 5.55228 11 5C11 4.44772 10.5523 4 10 4C9.44772 4 9 4.44772 9 5C9 5.55228 9.44772 6 10 6Z" fill="currentColor"/>
            <path d="M10 11C10.5523 11 11 10.5523 11 10C11 9.44772 10.5523 9 10 9C9.44772 9 9 9.44772 9 10C9 10.5523 9.44772 11 10 11Z" fill="currentColor"/>
            <path d="M10 16C10.5523 16 11 15.5523 11 15C11 14.4477 10.5523 14 10 14C9.44772 14 9 14.4477 9 15C9 15.5523 9.44772 16 10 16Z" fill="currentColor"/>
          </svg>
        </button>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="text-center mb-4">
        <p className="text-sm text-muted-foreground">Return</p>
        <p className="text-xl font-bold text-success">+$1,208.64</p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs text-muted-foreground">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
