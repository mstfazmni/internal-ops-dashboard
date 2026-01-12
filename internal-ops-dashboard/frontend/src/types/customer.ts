export type CustomerStatus = "active" | "frozen";
export type RiskStatus = "normal" | "flagged";

export interface CustomerSummary {
  id: string;
  name: string;
  email: string;
  status: CustomerStatus;
  riskStatus: RiskStatus;
  flagsCount: number;
  notesCount: number;
  createdAt: string;
}