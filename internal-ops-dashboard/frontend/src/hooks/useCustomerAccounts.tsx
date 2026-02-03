import { useState, useEffect } from "react";
import { fetchCustomerAccounts } from "../api/account.api";
import type { Account } from "../types/account";

export function useCustomerAccounts (customerId: string) {
    const [data, setData] = useState<Account[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function load () {
            try {
                setLoading(true);
                const result = await fetchCustomerAccounts(customerId);
                setData(result);

            } catch (err) {
                setError("Could not load accounts")
            } finally {
                setLoading(false);
            }
        }

        load();
    }, [customerId]);

    return { data, loading, error };
}