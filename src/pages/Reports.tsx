import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, Calendar } from "lucide-react";

const Reports = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
      return;
    }
    const userData = JSON.parse(user);
    setUserName(userData.name);
  }, [navigate]);

  const reports = [
    {
      id: 1,
      title: "Monthly Financial Summary",
      date: "December 2024",
      description: "Complete overview of income, expenses, and savings",
    },
    {
      id: 2,
      title: "Investment Performance",
      date: "Q4 2024",
      description: "Quarterly investment returns and portfolio analysis",
    },
    {
      id: 3,
      title: "Budget Analysis",
      date: "December 2024",
      description: "Detailed breakdown of budget adherence by category",
    },
    {
      id: 4,
      title: "Tax Preparation Report",
      date: "Year 2024",
      description: "Annual summary for tax filing purposes",
    },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar userName={userName} />

      <div className="flex-1 flex flex-col">
        <DashboardHeader userName={userName} />

        <main className="flex-1 p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Reports</h1>
              <p className="text-muted-foreground">
                Generate and download financial reports
              </p>
            </div>
            <Button className="gap-2">
              <FileText size={20} />
              Generate Report
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reports.map((report) => (
              <Card key={report.id} className="card-hover">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                      <FileText className="text-accent" size={24} />
                    </div>
                    <Button variant="ghost" size="icon">
                      <Download size={20} />
                    </Button>
                  </div>
                  <CardTitle className="text-lg">{report.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar size={16} />
                      <span>{report.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {report.description}
                    </p>
                    <Button variant="outline" className="w-full mt-4">
                      View Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Reports;