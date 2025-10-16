import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import Setup from "./pages/Setup";
import Dashboard from "./pages/Dashboard";
import Accounts from "./pages/Accounts";
import Budgets from "./pages/Budgets";
import Expenses from "./pages/Expenses";
import Investments from "./pages/Investments";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/onboarding/create-account"
            element={<CreateAccount />}
          />
          <Route path="/setup" element={<Setup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/budgets" element={<Budgets />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/investments" element={<Investments />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
