import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, Calendar, Eye } from 'lucide-react';
import { reportsAPI } from '@/lib/api';

const Reports = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('User');
  const [userId, setUserId] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState<any>(null);
  const [monthlySummary, setMonthlySummary] = useState<any>(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
      return;
    }
    const userData = JSON.parse(user);
    setUserName(userData.name);
    setUserId(userData.id || 1);
    
    fetchReports(userData.id || 1);
  }, [navigate]);

  const fetchReports = async (uid: number) => {
    try {
      const [overviewRes, summaryRes] = await Promise.all([
        reportsAPI.getOverview(uid),
        reportsAPI.getMonthlySummary(uid)
      ]);
      
      setOverview(overviewRes.data);
      setMonthlySummary(summaryRes.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const reports = [
    {
      id: 1,
      title: 'Monthly Financial Summary',
      date: 'December 2024',
      description: 'Complete overview of income, expenses, and savings'
    },
    {
      id: 2,
      title: 'Investment Performance',
      date: 'Q4 2024',
      description: 'Quarterly investment returns and portfolio analysis'
    },
    {
      id: 3,
      title: 'Budget Analysis',
      date: 'December 2024',
      description: 'Detailed breakdown of budget adherence by category'
    },
    {
      id: 4,
      title: 'Tax Preparation Report',
      date: 'Year 2024',
      description: 'Annual summary for tax filing purposes'
    }
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar userName={userName} />
      
      <div className="flex-1 flex flex-col ml-60 h-screen overflow-auto">
        <DashboardHeader userName={userName} />
        
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Reports</h1>
            <p className="text-muted-foreground">View and download your financial reports</p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-muted-foreground">Loading reports...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground mb-1">Total Balance</p>
                    <h3 className="text-3xl font-bold">${overview?.total_balance.toFixed(2) || '0.00'}</h3>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground mb-1">Total Investments</p>
                    <h3 className="text-3xl font-bold">${overview?.total_investments.toFixed(2) || '0.00'}</h3>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground mb-1">Total Budget</p>
                    <h3 className="text-3xl font-bold">${overview?.total_budget.toFixed(2) || '0.00'}</h3>
                  </CardContent>
                </Card>
              </div>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Monthly Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Monthly Income</p>
                      <p className="text-2xl font-bold stat-positive">${monthlySummary?.monthly_income.toFixed(2) || '0.00'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Monthly Expenses</p>
                      <p className="text-2xl font-bold stat-negative">${monthlySummary?.monthly_expenses.toFixed(2) || '0.00'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Net Savings</p>
                      <p className="text-2xl font-bold">${monthlySummary?.net_savings.toFixed(2) || '0.00'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                {reports.map((report) => (
                  <Card key={report.id} className="card-hover">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                            <FileText className="text-accent" size={24} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg mb-1">{report.title}</h3>
                            <p className="text-sm text-muted-foreground">{report.description}</p>
                            <p className="text-xs text-muted-foreground mt-1">Generated: {report.date}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="gap-2">
                            <Eye size={16} />
                            View
                          </Button>
                          <Button size="sm" className="gap-2">
                            <Download size={16} />
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Reports;
