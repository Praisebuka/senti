import { supabase } from "@/lib/supabase";

export interface PayrollEmployee {
  id: string;
  employee_name: string;
  account_number: string;
  bank_name: string;
  salary: number;
  department: string;
  org_id: string;
}

export async function fetchPayrollEmployees(orgId: string): Promise<PayrollEmployee[]> {
  const { data, error } = await supabase
    .from("payroll_records")
    .select("*")
    .eq("org_id", orgId)
    .order("employee_name");

  if (error) {
    console.error("Failed to fetch payroll:", error);
    return [];
  }

  return data ?? [];
}