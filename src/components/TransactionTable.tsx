import { cn } from "@/lib/utils";

interface Transaction {
  id: string;
  name: string;
  avatar: string;
  date: string;
  time: string;
  status: "Pending" | "Completed";
  amount: string;
}

const transactions: Transaction[] = [
  {
    id: "1",
    name: "Daniel Cole",
    avatar: "👨‍💼",
    date: "Today",
    time: "21:09",
    status: "Pending",
    amount: "-$100.00",
  },
  {
    id: "2",
    name: "Tina Wallace",
    avatar: "👩‍💼",
    date: "11 Dec",
    time: "11:31",
    status: "Completed",
    amount: "-$25.00",
  },
  {
    id: "3",
    name: "Amazon",
    avatar: "🛒",
    date: "11 Dec",
    time: "09:16",
    status: "Completed",
    amount: "-$246.50",
  },
  {
    id: "4",
    name: "Netflix",
    avatar: "🎬",
    date: "10 Dec",
    time: "14:22",
    status: "Completed",
    amount: "-$15.99",
  },
  {
    id: "5",
    name: "Spotify",
    avatar: "🎵",
    date: "09 Dec",
    time: "08:45",
    status: "Completed",
    amount: "-$9.99",
  },
];

export const TransactionsTable = () => {
  return (
    <div className="bg-card rounded-xl p-6 shadow-sm border border-border col-span-2 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">Recent Transactions</h2>
        <button className="text-primary hover:text-primary-hover text-sm font-medium transition-colors">
          See all
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Time</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
              >
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xl">
                      {transaction.avatar}
                    </div>
                    <span className="font-medium text-foreground">{transaction.name}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-muted-foreground">{transaction.date}</td>
                <td className="py-4 px-4 text-sm text-muted-foreground">{transaction.time}</td>
                <td className="py-4 px-4">
                  <span
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium",
                      transaction.status === "Pending"
                        ? "bg-warning-light text-warning"
                        : "bg-success-light text-success"
                    )}
                  >
                    {transaction.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-right font-semibold text-foreground">
                  {transaction.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
