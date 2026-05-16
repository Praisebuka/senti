import { supabase } from '@/lib/supabase';

export interface PayrollRow {
  employee_name: string;
  account_number: string;
  bank_name: string;
  salary: number;
  department?: string;
}

export async function uploadPayrollCSV(
  file: File,
  orgId: string
): Promise<{ success: boolean; count: number; error?: string }> {
  const text = await file.text();
  const lines = text.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());

  // Validate required columns exist
  const required = ['employee_name', 'account_number', 'bank_name', 'salary'];
  const missing = required.filter(r => !headers.includes(r));
  if (missing.length > 0) {
    return { success: false, count: 0, error: `Missing columns: ${missing.join(', ')}` };
  }

  const rows: PayrollRow[] = lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim());
    const row: Record<string, string> = {};
    headers.forEach((h, i) => { row[h] = values[i] ?? ''; });
    return {
      employee_name: row.employee_name,
      account_number: row.account_number,
      bank_name: row.bank_name,
      salary: parseFloat(row.salary),
      department: row.department ?? null,
    };
  }).filter(r => r.employee_name && r.account_number);

  // Clear previous upload for this org before inserting fresh
  await supabase
    .from('payroll_records')
    .delete()
    .eq('org_id', orgId);

  const { error } = await supabase
    .from('payroll_records')
    .insert(rows.map(r => ({ ...r, org_id: orgId })));

  if (error) return { success: false, count: 0, error: error.message };
  return { success: true, count: rows.length };
}