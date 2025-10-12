import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { mockTransactions } from "@/data/mockData";

const TransactionsTable = () => {
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
                  Status
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {mockTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-b border-border/50 hover:bg-muted/50 transition-smooth"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-muted">
                          {transaction.description.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">
                        {transaction.description}
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
                    <Badge
                      variant="secondary"
                      className={
                        transaction.status === "pending"
                          ? "badge-pending"
                          : "badge-completed"
                      }
                    >
                      {transaction.status.charAt(0).toUpperCase() +
                        transaction.status.slice(1)}
                    </Badge>
                  </td>
                  <td
                    className={`py-4 px-4 text-right font-semibold ${
                      transaction.amount < 0 ? "stat-negative" : "stat-positive"
                    }`}
                  >
                    {transaction.amount < 0 ? "-" : "+"}$
                    {Math.abs(transaction.amount).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionsTable;