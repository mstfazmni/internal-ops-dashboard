import { useState, useEffect } from "react";
import type { Transaction } from "../types/transaction";
import { fetchAccountTransactions } from "../api/transactions.api";

export function useAccountTransactions (accountId: string) {
    const [data, setData] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function load () {
            try {
                setLoading(true);
                const result = await fetchAccountTransactions(accountId);
                setData(result.data);
            } catch (err) {
                setError("Could not load transactions.")
            } finally {
                setLoading(false);
            }
        }

        load();
    }, [accountId]);

    return { data, loading, error };
}