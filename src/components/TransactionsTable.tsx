import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { transactionsAPI } from "@/lib/api";

interface Transaction {
  id: number;
  owner_id: number;
  account_id: number;
  amount: number;
  type: string;
  category_id: string;
  description: string;
  created_at: string;
}

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await transactionsAPI.getAll();
      setTransactions(response.data.slice(0, 10)); // Show last 10
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();

    if (isToday) return "Today";

    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Transactions</CardTitle>
          <button className="text-sm text-accent hover:text-accent/80 font-medium">
            See all
          </button>
        </div>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <p className="text-muted-foreground">Loading transactions...</p>
          </div>
        ) : transactions.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-muted-foreground">No transactions yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Time
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Category
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b border-border/50 hover:bg-muted/50 transition-smooth"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-muted">
                            {transaction.description?.charAt(0) ||
                              transaction.category_id?.charAt(0) ||
                              "T"}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">
                          {transaction.description || "Transaction"}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm">
                      {formatDate(transaction.created_at)}
                    </td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">
                      {formatTime(transaction.created_at)}
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="secondary">
                        {transaction.category_id || "General"}
                      </Badge>
                    </td>
                    <td
                      className={`py-4 px-4 text-right font-semibold ${
                        transaction.type === "debit"
                          ? "stat-negative"
                          : "stat-positive"
                      }`}
                    >
                      {transaction.type === "debit" ? "-" : "+"}₦
                      {Math.abs(transaction.amount).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionsTable;
