import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { transactionsAPI } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface TransactionFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export const TransactionForm = ({
  open,
  onOpenChange,
  onSuccess,
}: TransactionFormProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    account_id: "1",
    transaction_type: "debit",
    category: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ get owner_id from localStorage
      const user = localStorage.getItem("user");
      const owner_id = user ? JSON.parse(user).id : null;

      if (!owner_id) {
        toast({
          title: "Error",
          description: "User not found. Please log in again.",
          variant: "destructive",
        });
        return;
      }

      await transactionsAPI.create({
        name: formData.name,
        amount: parseFloat(formData.amount),
        account_id: parseInt(formData.account_id),
        transaction_type: formData.transaction_type,
        category: formData.category,
        description: formData.description,
        transaction_date: new Date().toISOString(),
        owner_id, // ✅ added
      });

      toast({
        title: "Success",
        description: "Transaction created successfully!",
      });

      onSuccess();
      onOpenChange(false);

      setFormData({
        name: "",
        amount: "",
        account_id: "1",
        transaction_type: "debit",
        category: "",
        description: "",
      });
    } catch (error: any) {
      // ✅ handle 422 or other validation errors safely
      const detail = error.response?.data?.detail;
      let message = "Failed to create transaction";

      if (Array.isArray(detail)) {
        message = detail.map((err: any) => err.msg).join(", ");
      } else if (typeof detail === "string") {
        message = detail;
      }

      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Transaction</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Transaction Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="type">Type</Label>
            <Select
              value={formData.transaction_type}
              onValueChange={(value) =>
                setFormData({ ...formData, transaction_type: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="debit">Debit (Expense)</SelectItem>
                <SelectItem value="credit">Credit (Income)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Transaction"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
