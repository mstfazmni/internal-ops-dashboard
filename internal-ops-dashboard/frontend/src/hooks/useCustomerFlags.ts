import { useState, useEffect } from "react";
import { fetchCustomerFlags } from "../api/flgas.api";
import type { Flag } from "../types/flag";

export function useCustomerFlags(customerId: string) {
    const [flags, setFlags] = useState<Flag[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);

    const limit = 5;

    useEffect(() => {
        setPage(1);
    }, [customerId]);

    useEffect(() => {
        async function load () {
            try {
                setLoading(true);
                setError(null);

                const result = await fetchCustomerFlags(customerId, page, limit);

                setFlags(result.data);
                setTotalPages(result.totalPages || 1);
            } catch (err) {
                setError("Could not load flags");
            } finally {
                setLoading(false);
            }
        }

        load();
    }, [customerId, page]);

    const canNext = page < totalPages;
    const canPrev = page > 1;

    const nextPage = () => {
        if (!loading && canNext) {
            setPage((p) => p + 1);
        }
    };

    const prevPage = () => {
        if (!loading && canPrev) {
            setPage((p) => p - 1);
        }
    };

    return {
        flags,
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