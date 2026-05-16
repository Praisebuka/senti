import { supabase } from '@/lib/supabase';

const SIMILARITY_THRESHOLD = 0.75; // below this = Rule 1 fails

function similarity(a: string, b: string): number {
  const s1 = a.toLowerCase().trim();
  const s2 = b.toLowerCase().trim();
  if (s1 === s2) return 1;
  const longer = s1.length > s2.length ? s1 : s2;
  const shorter = s1.length > s2.length ? s2 : s1;
  let matches = 0;
  for (let i = 0; i < shorter.length; i++) {
    if (longer.includes(shorter[i])) matches++;
  }
  return matches / longer.length;
}

export interface VerificationResult {
  verdict: 'TRUSTED' | 'FLAGGED';
  rule_triggered: 1 | 2 | 3 | null;
  reason: string | null;
  similarity_score?: number;
  matched_employee?: string;
}

export async function verifyEmployee(
  orgId: string,
  payrollName: string,
  accountNumber: string,
  squadAccountName: string  // returned from Squad API call
): Promise<VerificationResult> {

  // RULE 1 — Name mismatch between Squad response and payroll
  const score = similarity(squadAccountName, payrollName);
  if (score < SIMILARITY_THRESHOLD) {
    return {
      verdict: 'FLAGGED',
      rule_triggered: 1,
      reason: `Account name "${squadAccountName}" does not match payroll name "${payrollName}"`,
      similarity_score: score,
    };
  }

  // RULE 2 — Duplicate name in same org payroll
  const { data: nameMatches } = await supabase
    .from('payroll_records')
    .select('employee_name, account_number')
    .eq('org_id', orgId)
    .ilike('employee_name', payrollName)
    .neq('account_number', accountNumber); // exclude self

  if (nameMatches && nameMatches.length > 0) {
    return {
      verdict: 'FLAGGED',
      rule_triggered: 2,
      reason: `Name "${payrollName}" appears on another payroll record`,
      matched_employee: nameMatches[0].employee_name,
    };
  }

  // RULE 3 — Duplicate account number in same org payroll
  const { data: accountMatches } = await supabase
    .from('payroll_records')
    .select('employee_name, account_number')
    .eq('org_id', orgId)
    .eq('account_number', accountNumber)
    .neq('employee_name', payrollName); // exclude self

  if (accountMatches && accountMatches.length > 0) {
    return {
      verdict: 'FLAGGED',
      rule_triggered: 3,
      reason: `Account number ${accountNumber} is linked to another employee: "${accountMatches[0].employee_name}"`,
      matched_employee: accountMatches[0].employee_name,
    };
  }

  // All rules passed
  return {
    verdict: 'TRUSTED',
    rule_triggered: null,
    reason: null,
    similarity_score: score,
  };
}