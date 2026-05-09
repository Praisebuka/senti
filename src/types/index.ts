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
