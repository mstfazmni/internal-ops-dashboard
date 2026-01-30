import { useState, useEffect } from "react";
import { fetchCustomerSummary } from "../api/customer.api";

export function useCustomerSummary(customerId: string) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {   
        async function load () {
            try {
                setLoading(true);
                const result = await fetchCustomerSummary(customerId);
                setData(result);
            } catch (err) {
                setError("Failed to load customer summary");
            } finally {
                setLoading(false);
            }
        }

        load();
    }, [customerId]);

    return { data, loading, error };
}