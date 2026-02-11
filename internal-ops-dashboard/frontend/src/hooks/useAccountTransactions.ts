import { useState, useEffect } from "react";
import type { Transaction } from "../types/transaction";
import { fetchAccountTransactions } from "../api/transactions.api";

export function useAccountTransactions (accountId: string) {
    
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    
    const limit = 5;

    // Reeset page to 1 when accountId changes, so that we don't end up on a page that doesn't exist for the new account
    useEffect(() => {
        setPage(1);
    }, [accountId]);

    useEffect(() => {
        async function load () {
            try {
                setLoading(true);
                setError(null);

                const result = await fetchAccountTransactions(accountId, page, limit);
                // console.log(result)

                setTransactions(result.data);
                setTotalPages(result.totalPages || 1);
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

    // !loading is to prevent multiple clicks while data is loading, which could cause multiple requests to the server
    const nextPage = () => {
        if (!loading && canNext) {
            setPage((p) => p + 1);
        }
    }

    // !loading is to prevent multiple clicks while data is loading, which could cause multiple requests to the server
    const prevPage = () => {
        if (!loading && canPrev) {
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