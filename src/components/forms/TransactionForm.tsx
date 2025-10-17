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
import { transactionsAPI, categoriesAPI } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";

interface TransactionFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

interface Category {
  id: number;
  name: string;
}

const DEFAULT_CATEGORIES = [
  "Food",
  "Transport",
  "Bills",
  "Shopping",
  "Entertainment",
  "Salary",
  "Health",
  "Investment",
];

export const TransactionForm = ({
  open,
  onOpenChange,
  onSuccess,
}: TransactionFormProps) => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [addingCategory, setAddingCategory] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    account_id: "1",
    transaction_type: "debit",
    category_id: "",
    description: "",
  });

  useEffect(() => {
    if (open) {
      fetchCategories();
    }
  }, [open]);

  const fetchCategories = async () => {
    setLoadingCategories(true);
    try {
      const response = await categoriesAPI.getAll();
      const fetchedCategories = response.data;

      if (fetchedCategories.length === 0) {
        // Create default categories if none exist
        const defaultCats: Category[] = [];
        for (const catName of DEFAULT_CATEGORIES) {
          try {
            const res = await categoriesAPI.create({ name: catName });
            defaultCats.push(res.data);
          } catch (err) {
            console.error(`Failed to create category ${catName}`);
          }
        }
        setCategories(defaultCats);
      } else {
        setCategories(fetchedCategories);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      toast({
        title: "Error",
        description: "Failed to load categories",
        variant: "destructive",
      });
    } finally {
      setLoadingCategories(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;

    setAddingCategory(true);
    try {
      const response = await categoriesAPI.create({
        name: newCategoryName.trim(),
      });
      const newCategory = response.data;

      setCategories([...categories, newCategory]);
      setFormData({ ...formData, category_id: newCategory.id.toString() });
      setNewCategoryName("");
      setShowAddCategory(false);

      toast({
        title: "Success",
        description: "Category added successfully!",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.detail || "Failed to add category",
        variant: "destructive",
      });
    } finally {
      setAddingCategory(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await transactionsAPI.create({
        name: formData.name,
        amount: parseFloat(formData.amount),
        account_id: parseInt(formData.account_id),
        transaction_type: formData.transaction_type,
        category_id: parseInt(formData.category_id),
        description: formData.description,
        transaction_date: new Date().toISOString(),
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
        category_id: "",
        description: "",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error.response?.data?.detail || "Failed to create transaction",
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
            {loadingCategories ? (
              <div className="text-sm text-muted-foreground py-2">
                Loading categories...
              </div>
            ) : (
              <>
                <Select
                  value={formData.category_id}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category_id: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.length === 0 ? (
                      <div className="p-2 text-sm text-muted-foreground">
                        No categories available — add one below
                      </div>
                    ) : (
                      categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id.toString()}>
                          {cat.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>

                {!showAddCategory ? (
                  <button
                    type="button"
                    onClick={() => setShowAddCategory(true)}
                    className="flex items-center gap-1 text-sm text-primary hover:underline mt-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Category
                  </button>
                ) : (
                  <div className="mt-3 p-3 border rounded-lg bg-muted/50 space-y-2 animate-fade-in">
                    <Label htmlFor="newCategory" className="text-sm">
                      New Category Name
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="newCategory"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        placeholder="Enter category name"
                        className="flex-1"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddCategory();
                          }
                        }}
                      />
                      <Button
                        type="button"
                        size="sm"
                        onClick={handleAddCategory}
                        disabled={addingCategory || !newCategoryName.trim()}
                      >
                        {addingCategory ? "Adding..." : "Add"}
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setShowAddCategory(false);
                          setNewCategoryName("");
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
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
