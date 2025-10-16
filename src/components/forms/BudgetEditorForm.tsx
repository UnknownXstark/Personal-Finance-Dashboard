import { useState, useEffect } from "react";
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
import { budgetsAPI } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface BudgetEditFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  budget: {
    id: number;
    category_id: string;
    limit_amount: number;
    period: string;
  } | null;
}

export const BudgetEditForm = ({
  open,
  onOpenChange,
  onSuccess,
  budget,
}: BudgetEditFormProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    limit_amount: "",
    period: "monthly",
  });

  useEffect(() => {
    if (budget) {
      setFormData({
        limit_amount: budget.limit_amount.toString(),
        period: budget.period,
      });
    }
  }, [budget]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!budget) return;

    setLoading(true);

    try {
      await budgetsAPI.update(budget.id, {
        limit_amount: parseFloat(formData.limit_amount),
        period: formData.period,
      });

      toast({
        title: "Success",
        description: "Budget updated successfully!",
      });

      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.detail || "Failed to update budget",
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
          <DialogTitle>Edit Budget - {budget?.category_id}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="limit">Limit Amount</Label>
            <Input
              id="limit"
              type="number"
              step="0.01"
              value={formData.limit_amount}
              onChange={(e) =>
                setFormData({ ...formData, limit_amount: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="period">Period</Label>
            <Select
              value={formData.period}
              onValueChange={(value) =>
                setFormData({ ...formData, period: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
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
              {loading ? "Updating..." : "Update Budget"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
