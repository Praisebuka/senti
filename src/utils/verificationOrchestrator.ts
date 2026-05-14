import {
  verifyBVN,
  verifyPayroll,
  verifySettlement,
  getTransactionStream,
  calculateRiskScore,
  detectDuplicateIdentity,
  BVNVerificationResult,
  PayrollVerificationResult,
  SettlementVerificationResult,
  TransactionStreamResult,
  RiskScoringResult,
  DuplicateIdentityResult,
} from "./squadAPI";
import { Employee, ComprehensiveVerification } from "@/types";

/**
 * Orchestrator for running all 5 verification methods on an employee
 * Combines: BVN, Payroll, Settlement, Transaction Stream, Duplicate Identity, Risk Score
 */

export interface VerificationReport {
  employeeId: string;
  timestamp: string;
  verifications: {
    bvn: BVNVerificationResult | null;
    payroll: PayrollVerificationResult | null;
    settlement: SettlementVerificationResult | null;
    transactions: TransactionStreamResult[] | null;
    duplicates: DuplicateIdentityResult | null;
    riskScore: RiskScoringResult | null;
  };
  summary: ComprehensiveVerification;
}

export async function runComprehensiveVerification(
  employee: Employee
): Promise<VerificationReport> {
  const timestamp = new Date().toISOString();

  try {
    // Run all verifications in parallel
    const [bvnResult, payrollResult, settlementResult, transactionResult, duplicateResult, riskScoreResult] =
      await Promise.all([
        verifyBVN(employee.bvn, employee.name),
        verifyPayroll(employee.id, employee.salary, employee.account, employee.bank),
        verifySettlement(employee.account, employee.bank, employee.name),
        getTransactionStream(employee.id, 10),
        detectDuplicateIdentity(employee.bvn, employee.name),
        calculateRiskScore({
          bvn: employee.bvn,
          name: employee.name,
          salary: employee.salary,
          account: employee.account,
          bank: employee.bank,
          employeeId: employee.id,
        }),
      ]);

    // Extract component scores from risk score API
    const componentScores = riskScoreResult.data?.component_scores || {
      identity_score: extractIdentityScore(bvnResult),
      financial_score: extractFinancialScore(payrollResult, settlementResult),
      behavioral_score: extractBehavioralScore(transactionResult),
      network_score: extractNetworkScore(duplicateResult),
      temporal_score: extractTemporalScore(transactionResult),
    };

    // Calculate overall risk
    const overallRisk = calculateOverallRisk(componentScores);

    // Generate recommendation
    const recommendation = generateRecommendation(overallRisk, {
      bvn: bvnResult,
      settlement: settlementResult,
      duplicates: duplicateResult,
    });

    const summary: ComprehensiveVerification = {
      identityScore: Math.round(componentScores.identity_score),
      financialScore: Math.round(componentScores.financial_score),
      behavioralScore: Math.round(componentScores.behavioral_score),
      networkScore: Math.round(componentScores.network_score),
      temporalScore: Math.round(componentScores.temporal_score),
      overallRiskScore: Math.round(overallRisk),
      riskLevel: getRiskLevel(overallRisk),
      recommendation,
      verifications: {
        bvn: bvnResult,
        payroll: payrollResult,
        settlement: settlementResult,
        transaction: transactionResult,
        duplicates: duplicateResult,
      },
    };

    return {
      employeeId: employee.id,
      timestamp,
      verifications: {
        bvn: bvnResult,
        payroll: payrollResult,
        settlement: settlementResult,
        transactions: transactionResult,
        duplicates: duplicateResult,
        riskScore: riskScoreResult,
      },
      summary,
    };
  } catch (error) {
    console.error("Comprehensive verification failed:", error);
    throw error;
  }
}

// ============ SCORE EXTRACTION FUNCTIONS ============

function extractIdentityScore(bvnResult: BVNVerificationResult): number {
  if (bvnResult.status === "error") return 20;
  return Math.min(100, bvnResult.confidence_score || 85);
}

function extractFinancialScore(
  payrollResult: PayrollVerificationResult,
  settlementResult: SettlementVerificationResult
): number {
  if (payrollResult.status === "error" || settlementResult.status === "error") return 30;
  
  const payrollScore = payrollResult.data?.salary_verified ? 80 : 40;
  const settlementScore = settlementResult.data?.settlement_pattern_score || 50;
  
  return (payrollScore + settlementScore) / 2;
}

function extractBehavioralScore(transactions: TransactionStreamResult[] | null): number {
  if (!transactions || transactions.length === 0) return 60;
  
  const anomalousTransactions = transactions.filter(
    (t) => t.data?.anomaly_flags && t.data.anomaly_flags.length > 0
  ).length;
  
  const anomalyRate = anomalousTransactions / transactions.length;
  return Math.max(20, 100 - anomalyRate * 100);
}

function extractNetworkScore(duplicateResult: DuplicateIdentityResult | null): number {
  if (!duplicateResult || duplicateResult.status === "error") return 75;
  if (duplicateResult.data?.is_duplicate) return Math.max(20, 100 - duplicateResult.data.network_risk_score);
  return 90;
}

function extractTemporalScore(transactions: TransactionStreamResult[] | null): number {
  if (!transactions || transactions.length === 0) return 70;
  
  const avgTemporalRisk =
    transactions.reduce((sum, t) => sum + (t.data?.temporal_pattern_risk || 0), 0) / transactions.length;
  
  return Math.max(20, 100 - avgTemporalRisk);
}

function calculateOverallRisk(componentScores: Record<string, number>): number {
  // Weights: Identity 20%, Financial 25%, Behavioral 20%, Network 15%, Temporal 20%
  const riskScores = {
    identity: 100 - componentScores.identity_score,
    financial: 100 - componentScores.financial_score,
    behavioral: 100 - componentScores.behavioral_score,
    network: 100 - componentScores.network_score,
    temporal: 100 - componentScores.temporal_score,
  };

  return (
    riskScores.identity * 0.2 +
    riskScores.financial * 0.25 +
    riskScores.behavioral * 0.2 +
    riskScores.network * 0.15 +
    riskScores.temporal * 0.2
  );
}

function getRiskLevel(riskScore: number): "low" | "medium" | "high" | "critical" {
  if (riskScore < 25) return "low";
  if (riskScore < 50) return "medium";
  if (riskScore < 75) return "high";
  return "critical";
}

interface VerificationFlags {
  bvn: BVNVerificationResult | null;
  settlement: SettlementVerificationResult | null;
  duplicates: DuplicateIdentityResult | null;
}

function generateRecommendation(riskScore: number, flags: VerificationFlags): string {
  const riskLevel = getRiskLevel(riskScore);
  const criticalFlags: string[] = [];

  if (flags.bvn?.status === "error") {
    criticalFlags.push("BVN verification failed");
  }

  if (flags.settlement?.data?.account_status === "restricted") {
    criticalFlags.push("Settlement account restricted");
  }

  if (flags.duplicates?.data?.is_duplicate) {
    criticalFlags.push(`Duplicate identity detected (${flags.duplicates.data.duplicate_count} links)`);
  }

  if (criticalFlags.length > 0) {
    return `BLOCK: ${criticalFlags.join(" | ")}`;
  }

  switch (riskLevel) {
    case "critical":
      return "Squad Transfer: BLOCK + FREEZE - Critical fraud risk";
    case "high":
      return "Squad Transfer: BLOCK - High fraud risk detected";
    case "medium":
      return "Squad Transfer: HOLD - Manual review recommended";
    case "low":
      return "Squad Transfer: EXECUTE - All verifications passed";
    default:
      return "Unknown risk level";
  }
}

export function formatVerificationReport(report: VerificationReport): string {
  return `
=== COMPREHENSIVE VERIFICATION REPORT ===
Employee ID: ${report.employeeId}
Timestamp: ${report.timestamp}

--- COMPONENT SCORES ---
Identity Score: ${report.summary.identityScore}/100
Financial Score: ${report.summary.financialScore}/100
Behavioral Score: ${report.summary.behavioralScore}/100
Network Score: ${report.summary.networkScore}/100
Temporal Score: ${report.summary.temporalScore}/100

--- OVERALL ASSESSMENT ---
Risk Score: ${report.summary.overallRiskScore}/100
Risk Level: ${report.summary.riskLevel.toUpperCase()}
Recommendation: ${report.summary.recommendation}

--- DETAILED VERIFICATIONS ---
BVN: ${report.verifications.bvn?.status}
Payroll: ${report.verifications.payroll?.status}
Settlement: ${report.verifications.settlement?.status}
Transactions: ${report.verifications.transactions?.length || 0} records
Duplicates: ${report.verifications.duplicates?.data?.is_duplicate ? "FOUND" : "None"}
  `;
}
