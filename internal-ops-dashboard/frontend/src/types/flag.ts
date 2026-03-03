export type Flag = {
  id: string;
  reason: string;
  severity: "LOW" | "MEDIUM" | "HIGH";
  createdAt: string;
  customerId: string;
};