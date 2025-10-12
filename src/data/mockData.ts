// Mock data structures matching FastAPI backend models

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Account {
  id: string;
  owner_id: string;
  name: string;
  account_type: "checking" | "savings" | "credit_card" | "investment";
  balance: number;
  created_at: string;
}

export interface Transaction {
  id: string;
  owner_id: string;
  account_id: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  description: string;
  status: "pending" | "completed";
  created_at: string;
}

export interface Investment {
  id: string;
  owner_id: string;
  name: string;
  category: string;
  amount: number;
  percentage: number;
  created_at: string;
}

export interface Budget {
  id: string;
  owner_id: string;
  category: string;
  limit_amount: number;
  spent_amount: number;
  period: "weekly" | "monthly" | "yearly";
  created_at: string;
}

export interface DashboardOverview {
  total_balance: number;
  balance_change: number;
  monthly_spending: number;
  spending_change: number;
  total_investments: number;
  investment_change: number;
  monthly_income: number;
  income_change: number;
}

// Mock data
export const mockUser: User = {
  id: "1",
  name: "Ashley",
  email: "ashley@vwealty.com",
};

export const mockAccounts: Account[] = [
  {
    id: "1",
    owner_id: "1",
    name: "Main Account",
    account_type: "checking",
    balance: 3252.13,
    created_at: "2024-01-01",
  },
  {
    id: "2",
    owner_id: "1",
    name: "Savings",
    account_type: "savings",
    balance: 4000.0,
    created_at: "2024-01-01",
  },
  {
    id: "3",
    owner_id: "1",
    name: "Investments",
    account_type: "investment",
    balance: 4436.64,
    created_at: "2024-01-01",
  },
];

export const mockTransactions: Transaction[] = [
  {
    id: "1",
    owner_id: "1",
    account_id: "1",
    amount: -100.0,
    type: "expense",
    category: "Shopping",
    description: "Daniel Cole",
    status: "pending",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    owner_id: "1",
    account_id: "1",
    amount: -25.0,
    type: "expense",
    category: "Food",
    description: "Tina Wallace",
    status: "completed",
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "3",
    owner_id: "1",
    account_id: "1",
    amount: -246.5,
    type: "expense",
    category: "Shopping",
    description: "Amazon",
    status: "completed",
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "4",
    owner_id: "1",
    account_id: "1",
    amount: -85.0,
    type: "expense",
    category: "Entertainment",
    description: "Netflix Subscription",
    status: "completed",
    created_at: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: "5",
    owner_id: "1",
    account_id: "1",
    amount: 2500.0,
    type: "income",
    category: "Salary",
    description: "Monthly Salary",
    status: "completed",
    created_at: new Date(Date.now() - 259200000).toISOString(),
  },
];

export const mockInvestments: Investment[] = [
  {
    id: "1",
    owner_id: "1",
    name: "VOO",
    category: "ETF",
    amount: 1250.0,
    percentage: 28.2,
    created_at: "2024-01-01",
  },
  {
    id: "2",
    owner_id: "1",
    name: "YTI",
    category: "Stock",
    amount: 890.0,
    percentage: 20.1,
    created_at: "2024-01-01",
  },
  {
    id: "3",
    owner_id: "1",
    name: "ICLN",
    category: "ETF",
    amount: 1100.0,
    percentage: 24.8,
    created_at: "2024-01-01",
  },
  {
    id: "4",
    owner_id: "1",
    name: "BTEK",
    category: "Tech",
    amount: 1196.64,
    percentage: 26.9,
    created_at: "2024-01-01",
  },
];

export const mockBudgets: Budget[] = [
  {
    id: "1",
    owner_id: "1",
    category: "Food & Dining",
    limit_amount: 500,
    spent_amount: 320,
    period: "monthly",
    created_at: "2024-01-01",
  },
  {
    id: "2",
    owner_id: "1",
    category: "Shopping",
    limit_amount: 300,
    spent_amount: 280,
    period: "monthly",
    created_at: "2024-01-01",
  },
  {
    id: "3",
    owner_id: "1",
    category: "Transportation",
    limit_amount: 200,
    spent_amount: 150,
    period: "monthly",
    created_at: "2024-01-01",
  },
  {
    id: "4",
    owner_id: "1",
    category: "Entertainment",
    limit_amount: 150,
    spent_amount: 85,
    period: "monthly",
    created_at: "2024-01-01",
  },
];

export const mockDashboardOverview: DashboardOverview = {
  total_balance: 11716.77,
  balance_change: 4.4,
  monthly_spending: 456.5,
  spending_change: -2.3,
  total_investments: 4436.64,
  investment_change: 27.24,
  monthly_income: 2500.0,
  income_change: 0,
};

// Chart data
export const mockBalanceHistory = [
  { month: "Jan", balance: 2800 },
  { month: "Feb", balance: 3200 },
  { month: "Mar", balance: 3500 },
  { month: "Apr", balance: 3300 },
  { month: "May", balance: 3800 },
  { month: "Jun", balance: 1892 },
  { month: "Jul", balance: 2200 },
  { month: "Aug", balance: 3500 },
  { month: "Sep", balance: 4200 },
  { month: "Oct", balance: 3900 },
  { month: "Nov", balance: 4500 },
  { month: "Dec", balance: 3252 },
];

export const mockExpensesByCategory = [
  { category: "Food & Dining", amount: 320, percentage: 35 },
  { category: "Shopping", amount: 280, percentage: 30 },
  { category: "Transportation", amount: 150, percentage: 16 },
  { category: "Entertainment", amount: 85, percentage: 9 },
  { category: "Bills & Utilities", amount: 91.5, percentage: 10 },
];