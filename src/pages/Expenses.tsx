import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { transactionsAPI } from '@/lib/api';
import { TransactionForm } from '@/components/forms/TransactionForm';

const COLORS = ['#4FD1C5', '#63B3ED', '#F6E05E', '#9F7AEA', '#FC8181'];

const Expenses = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('User');
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
      return;
    }
    const userData = JSON.parse(user);
    setUserName(userData.name);
    
    fetchTransactions();
  }, [navigate]);

  const fetchTransactions = async () => {
    try {
      const response = await transactionsAPI.getAll();
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const expenseTransactions = transactions.filter(t => t.type === 'debit');
  const totalExpenses = expenseTransactions.reduce((sum, t) => sum + Math.abs(t.amount), 0);

  // Group by category for charts
  const expensesByCategory = expenseTransactions.reduce((acc: any, t: any) => {
    const category = t.category_id || 'Other';
    if (!acc[category]) {
      acc[category] = { category, amount: 0, percentage: 0 };
    }
    acc[category].amount += Math.abs(t.amount);
    return acc;
  }, {});

  const chartData = Object.values(expensesByCategory).map((item: any) => ({
    ...item,
    percentage: ((item.amount / totalExpenses) * 100).toFixed(0)
  }));

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar userName={userName} />
      
      <div className="flex-1 flex flex-col ml-60 h-screen overflow-auto">
        <DashboardHeader userName={userName} />
        
        <main className="flex-1 p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Expenses</h1>
              <p className="text-muted-foreground">Track and analyze your spending patterns</p>
            </div>
            <Button className="gap-2" onClick={() => setFormOpen(true)}>
              <Plus size={20} />
              New Transaction
            </Button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-muted-foreground">Loading expenses...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground mb-1">Total Expenses</p>
                    <h3 className="text-3xl font-bold mb-2">₦{totalExpenses.toFixed(2)}</h3>
                    <p className="text-sm text-muted-foreground">{expenseTransactions.length} transactions</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground mb-1">Average Per Transaction</p>
                    <h3 className="text-3xl font-bold mb-2">₦{expenseTransactions.length > 0 ? (totalExpenses / expenseTransactions.length).toFixed(2) : '0.00'}</h3>
                    <p className="text-sm text-muted-foreground">Based on all expenses</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground mb-1">Top Category</p>
                    <h3 className="text-3xl font-bold mb-2">{chartData[0]?.category || 'N/A'}</h3>
                    <p className="text-sm text-muted-foreground">₦{chartData[0]?.amount.toFixed(2) || '0.00'}</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Expenses by Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {chartData.length === 0 ? (
                      <div className="flex items-center justify-center h-[300px]">
                        <p className="text-muted-foreground">No expense data available</p>
                      </div>
                    ) : (
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis 
                            dataKey="category" 
                            stroke="hsl(var(--muted-foreground))"
                            tick={{ fontSize: 12 }}
                            angle={-45}
                            textAnchor="end"
                            height={100}
                          />
                          <YAxis 
                            stroke="hsl(var(--muted-foreground))"
                            tick={{ fontSize: 12 }}
                          />
                          <Tooltip 
                            contentStyle={{
                              backgroundColor: 'hsl(var(--card))',
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px'
                            }}
                          />
                          <Bar dataKey="amount" fill="hsl(var(--accent))" radius={[8, 8, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Category Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {chartData.length === 0 ? (
                      <div className="flex items-center justify-center h-[300px]">
                        <p className="text-muted-foreground">No expense data available</p>
                      </div>
                    ) : (
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ percentage }) => `${percentage}%`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="amount"
                          >
                            {chartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    )}
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          <TransactionForm 
            open={formOpen} 
            onOpenChange={setFormOpen}
            onSuccess={fetchTransactions}
          />
        </main>
      </div>
    </div>
  );
};

export default Expenses;
