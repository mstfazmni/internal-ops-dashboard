export type RiskStatus = "NORMAL" | "REVIEW" | "HIGH_RISK";

export function calculateRiskStatus(flagsCount: number): RiskStatus {
    if (flagsCount === 0) return "NORMAL";
    if (flagsCount < 3) return "REVIEW";
    return "HIGH_RISK";
}