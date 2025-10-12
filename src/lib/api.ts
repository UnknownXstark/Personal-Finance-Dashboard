import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth API
export const authAPI = {
  register: (data: { name: string; email: string; password: string }) =>
    api.post(`${API_BASE_URL}/auth/register`, data),
  
  login: (data: { email: string; password: string }) =>
    api.post(`${API_BASE_URL}/auth/login`, data),
};

// Accounts API
export const accountsAPI = {
  create: (data: { owner_id: number; name: string; account_type: string; currency?: string; balance: number }) =>
    api.post(`${API_BASE_URL}/accounts/new`, data),
  
  getAll: () =>
    api.get(`${API_BASE_URL}/accounts/all`),
  
  getById: (id: number) =>
    api.get(`${API_BASE_URL}/accounts/${id}`),
};

// Transactions API
export const transactionsAPI = {
  create: (data: { 
    name: string;
    amount: number;
    account_id: number;
    transaction_type: string;
    category?: string;
    description?: string;
    transaction_date: string;
  }) =>
    api.post(`${API_BASE_URL}/transactions/new`, data),
  
  getAll: () =>
    api.get(`${API_BASE_URL}/transactions/all`),
  
  getByAccount: (accountId: number) =>
    api.get(`${API_BASE_URL}/transactions/account/${accountId}`),
  
  delete: (id: number) =>
    api.delete(`${API_BASE_URL}/transactions/${id}`),
};

// Budgets API
export const budgetsAPI = {
  create: (data: { category: string; limit_amount: number; period?: string }) =>
    api.post(`${API_BASE_URL}/budgets/new`, data),
  
  getByUser: (userId: number) =>
    api.get(`${API_BASE_URL}/budgets/user/${userId}`),
};

// Investments API
export const investmentsAPI = {
  create: (data: { name: string; category: string; amount: number; created_at: string }) =>
    api.post(`${API_BASE_URL}/investments/new`, data),
  
  getAll: () =>
    api.get(`${API_BASE_URL}/investments/all`),
  
  getSummary: () =>
    api.get(`${API_BASE_URL}/investments/summary`),
};

// Reports API
export const reportsAPI = {
  getOverview: (userId: number) =>
    api.get(`${API_BASE_URL}/reports/overview?user_id=${userId}`),
  
  getMonthlySummary: (userId: number) =>
    api.get(`${API_BASE_URL}/reports/monthly-summary?user_id=${userId}`),
};
