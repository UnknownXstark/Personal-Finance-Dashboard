import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { investmentsAPI } from '@/lib/api';
import { MoreVertical } from 'lucide-react';

const COLORS = ['#4FD1C5', '#63B3ED', '#F6E05E', '#9F7AEA'];

interface Investment {
  id: number;
  owner_id: number;
  name: string;
  category_id: string;
  amount: number;
  percentage: number;
  created_at: string;
}

const InvestmentsChart = () => {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvestments();
  }, []);

  const fetchInvestments = async () => {
    try {
      const response = await investmentsAPI.getAll();
      setInvestments(response.data.slice(0, 4)); // Show top 4
    } catch (error) {
      console.error('Error fetching investments:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalReturn = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const avgPercentage = investments.length > 0 
    ? investments.reduce((sum, inv) => sum + inv.percentage, 0) / investments.length 
    : 0;

  const chartData = investments.map(inv => ({
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
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        ) : investments.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-muted-foreground">No investments yet.</p>
          </div>
        ) : (
          <>
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
              <p className="text-sm stat-positive mt-1">+{avgPercentage.toFixed(2)}%</p>
            </div>
            
            <div className="mt-6 space-y-3">
              {investments.map((investment, index) => (
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
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default InvestmentsChart;
