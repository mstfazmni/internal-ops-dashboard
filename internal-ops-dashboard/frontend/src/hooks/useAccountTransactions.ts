import { useState, useEffect } from "react";
import type { Transaction } from "../types/transaction";
import { fetchAccountTransactions } from "../api/transactions.api";

export function useAccountTransactions (accountId: string) {
    // const [data, setData] = useState<Transaction[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    
    const limit = 5;

    useEffect(() => {
        async function load () {
            try {
                setLoading(true);
                const result = await fetchAccountTransactions(accountId, page, limit);
                // console.log(result)

                setTransactions(result.data);
                setTotalPages(result.totalPages);
            } catch (err) {
                setError("Could not load transactions.")
            } finally {
                setLoading(false);
            }
        }

        load();
    }, [accountId, page]);

    const canNext = page < totalPages;
    const canPrev = page > 1;

    const nextPage = () => {
        if (canNext) {
            setPage((p) => p + 1);
        }
    }

    const prevPage = () => {
        if (canPrev) {
            setPage((p) => p - 1)
        }
    }

    return { 
        transactions,
        page,
        totalPages,
        canNext,
        canPrev,
        nextPage,
        prevPage,
        loading,
        error,
    };
}