import { useEffect } from "react";
import { accountsAPI } from "@/lib/api";

function TestAccounts() {
  useEffect(() => {
    accountsAPI.getAll()
      .then(res => console.log("Accounts:", res.data))
      .catch(err => console.error("Error fetching accounts:", err));
  }, []);

  return <div>Check your console for account data</div>;
}

export default TestAccounts;
