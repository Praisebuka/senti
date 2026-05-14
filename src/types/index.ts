export interface Employee {
  id: string;
  name: string;
  dept: string;
  grade: number;
  salary: number;
  bvn: string;
  account: string;
  bank: string;
  sts: number;
  behavioural: number;
  document: number;
  network: number;
  verdict: Verdict;
  flags: string[];
  aiRiskScore?: number;
  verificationStatus?: "pending" | "verified" | "flagged" | "blocked";
}

export interface BVNVerificationResult {
  status: "verified" | "mismatch" | "error";
  verified_name?: string;
  confidence: number; // 0-100
  issues: string[];
  data?: {
    bvn: string;
    verified_name: string;
    date_of_birth?: string;
  };
}

export interface SanctionsCheckResult {
  status: "success" | "error";
  is_sanctioned: boolean;
  lists: string[]; // Which lists (OFAC, UN, etc.)
  match_confidence: number; // 0-100
  details: string;
  data?: {
    matched_names: string[];
    list_sources: string[];
  };
}

export interface ComprehensiveVerification {
  identityScore: number;
  financialScore: number;
  behavioralScore: number;
  networkScore: number;
  temporalScore: number;
  overallRiskScore: number;
  riskLevel: "low" | "medium" | "high" | "critical";
  recommendation: string;
  verifications: {
    bvn?: BVNVerificationResult | null;
    payroll?: any;
    settlement?: any;
    transaction?: any;
    duplicates?: any;
    sanctions?: SanctionsCheckResult | null;
  };
}

export type Verdict = "TRUSTED" | "VERIFIED" | "REVIEW" | "SUSPECT" | "FLAGGED";

export interface DepartmentRisk {
  dept: string;
  risk: number;
}

export interface CredentialResult {
  credential_trust: number;
  verdict: "VERIFIED" | "SUSPICIOUS" | "REJECTED";
  stages: {
    security_integrity: number;
    ocr_consistency: number;
    manipulation_prob: number;
    authority_match: boolean;
  };
  issues: string[];
}
