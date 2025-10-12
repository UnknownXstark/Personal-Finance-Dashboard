import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { mockInvestments } from '@/data/mockData';
import { MoreVertical } from 'lucide-react';

const COLORS = ['#4FD1C5', '#63B3ED', '#F6E05E', '#9F7AEA'];

const InvestmentsChart = () => {
  const totalReturn = mockInvestments.reduce((sum, inv) => sum + inv.amount, 0);
  const returnPercentage = 27.24;

  const chartData = mockInvestments.map(inv => ({
    name: inv.name,
    value: inv.amount
  }));

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Investments</CardTitle>
          <button className="p-1 hover:bg-muted rounded transition-smooth">
            <MoreVertical size={18} className="text-muted-foreground" />
          </button>
        </div>
      </CardHeader>
      
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        <div className="text-center mt-4">
          <p className="text-sm text-muted-foreground">Return</p>
          <p className="text-2xl font-bold mt-1 stat-positive">
            +${totalReturn.toFixed(2)}
          </p>
          <p className="text-sm stat-positive mt-1">+{returnPercentage}%</p>
        </div>
        
        <div className="mt-6 space-y-3">
          {mockInvestments.map((investment, index) => (
            <div key={investment.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-sm font-medium">{investment.name}</span>
              </div>
              <span className="text-sm text-muted-foreground">{investment.percentage}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestmentsChart;