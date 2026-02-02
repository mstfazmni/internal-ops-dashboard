export type Account = {
    id: string;
    type: string;
    balance: number;
    status: "OPEN" | "CLOSED";
    createdAt: string;
};