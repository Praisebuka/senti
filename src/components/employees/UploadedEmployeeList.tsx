"use client";

import { useEffect, useState } from "react";
import { fetchPayrollEmployees, PayrollEmployee } from "@/utils/fetchPayroll";
import { verifyEmployee } from "@/utils/ruleEngine";
import { verifyBankAccount, getBankCode } from "@/utils/squadAPI";
import { colors } from "@/constants/colors";
import { Card } from "@/components/shared";
import { CheckCircle, AlertTriangle, Loader } from "lucide-react";

interface Result {
  verdict: "TRUSTED" | "FLAGGED";
  rule_triggered: number | null;
  reason: string | null;
  similarity_score?: number;
  matched_employee?: string;
}

interface EmployeeWithResult extends PayrollEmployee {
  result?: Result;
  loading?: boolean;
}

export function UploadedEmployeeList() {
  const [employees, setEmployees] = useState<EmployeeWithResult[]>([]);
  const [fetching, setFetching] = useState(true);
  const [runningAll, setRunningAll] = useState(false);

  useEffect(() => {
    fetchPayrollEmployees("demo-org").then((data) => {
      setEmployees(data);
      setFetching(false);
    });
  }, []);

  const verifyOne = async (emp: EmployeeWithResult, index: number) => {
    setEmployees((prev) =>
      prev.map((e, i) => (i === index ? { ...e, loading: true } : e))
    );

    const bankCode = getBankCode(emp.bank_name);
    const bankResult = await verifyBankAccount(emp.account_number, bankCode);
    const squadName =
      bankResult.success && bankResult.data?.account_name
        ? bankResult.data.account_name
        : emp.employee_name;

    const result = await verifyEmployee(
      "demo-org",
      emp.employee_name,
      emp.account_number,
      squadName
    );

    setEmployees((prev) =>
      prev.map((e, i) =>
        i === index ? { ...e, result, loading: false } : e
      )
    );
  };

  const verifyAll = async () => {
    setRunningAll(true);
    for (let i = 0; i < employees.length; i++) {
      await verifyOne(employees[i], i);
    }
    setRunningAll(false);
  };

  if (fetching) {
    return (
      <Card style={{ textAlign: "center", padding: 40 }}>
        <div style={{ color: colors.muted, fontSize: 13 }}>Loading payroll from database…</div>
      </Card>
    );
  }

  if (employees.length === 0) {
    return (
      <Card style={{ textAlign: "center", padding: 40 }}>
        <div style={{ color: colors.muted, fontSize: 13 }}>
          No payroll data found. Upload a CSV from the Dashboard first.
        </div>
      </Card>
    );
  }

  const flagged = employees.filter((e) => e.result?.verdict === "FLAGGED").length;
  const trusted = employees.filter((e) => e.result?.verdict === "TRUSTED").length;
  const pending = employees.filter((e) => !e.result && !e.loading).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

      {/* Summary bar */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px,1fr))", gap: 12 }}>
        {[
          { label: "Total Uploaded", value: employees.length, color: colors.text },
          { label: "Verified Clean", value: trusted, color: "#22c55e" },
          { label: "Flagged", value: flagged, color: "#ef4444" },
          { label: "Pending Check", value: pending, color: colors.muted },
        ].map((s) => (
          <Card key={s.label} style={{ textAlign: "center", padding: 16 }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 11, color: colors.muted, marginTop: 4 }}>{s.label}</div>
          </Card>
        ))}
      </div>

      {/* Run all button */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={verifyAll}
          disabled={runningAll}
          style={{
            background: runningAll ? colors.surface : colors.primary,
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "10px 20px",
            fontSize: 13,
            fontWeight: 600,
            cursor: runningAll ? "not-allowed" : "pointer",
          }}
        >
          {runningAll ? "Running verification…" : `Verify All ${employees.length} Employees`}
        </button>
      </div>

      {/* Employee rows */}
      {employees.map((emp, i) => (
        <Card key={emp.id} style={{ padding: 16 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>

            {/* Identity */}
            <div style={{ flex: 2, minWidth: 160 }}>
              <div style={{ color: colors.text, fontWeight: 600, fontSize: 14 }}>
                {emp.employee_name}
              </div>
              <div style={{ color: colors.muted, fontSize: 11, marginTop: 2 }}>
                {emp.department} · {emp.bank_name} · {emp.account_number}
              </div>
              <div style={{ color: colors.muted, fontSize: 11, marginTop: 2 }}>
                ₦{emp.salary.toLocaleString()}
              </div>
            </div>

            {/* Result */}
            <div style={{ flex: 3, minWidth: 200 }}>
              {emp.loading && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: colors.muted, fontSize: 12 }}>
                  <Loader size={14} /> Verifying…
                </div>
              )}
              {emp.result && !emp.loading && (
                <div
                  style={{
                    padding: 10,
                    borderRadius: 6,
                    background: emp.result.verdict === "TRUSTED" ? "#22c55e18" : "#ef444418",
                    border: `1px solid ${emp.result.verdict === "TRUSTED" ? "#22c55e" : "#ef4444"}40`,
                    fontSize: 12,
                  }}
                >
                  <div style={{ fontWeight: 700, color: emp.result.verdict === "TRUSTED" ? "#22c55e" : "#ef4444", marginBottom: 4 }}>
                    {emp.result.verdict === "TRUSTED"
                      ? "✓ TRUSTED"
                      : `⚠ FLAGGED — Rule ${emp.result.rule_triggered}`}
                  </div>
                  {emp.result.reason && (
                    <div style={{ color: colors.muted }}>{emp.result.reason}</div>
                  )}
                  {emp.result.similarity_score !== undefined && (
                    <div style={{ color: colors.muted, marginTop: 2 }}>
                      Name similarity: {(emp.result.similarity_score * 100).toFixed(0)}%
                    </div>
                  )}
                  {emp.result.matched_employee && (
                    <div style={{ color: "#ef4444", marginTop: 2 }}>
                      Matched: {emp.result.matched_employee}
                    </div>
                  )}
                </div>
              )}
              {!emp.result && !emp.loading && (
                <div style={{ color: colors.muted, fontSize: 12 }}>Not verified yet</div>
              )}
            </div>

            {/* Button */}
            <button
              onClick={() => verifyOne(emp, i)}
              disabled={emp.loading}
              style={{
                background: "transparent",
                border: `1px solid ${colors.primary}`,
                color: colors.primary,
                borderRadius: 6,
                padding: "6px 14px",
                fontSize: 12,
                cursor: emp.loading ? "not-allowed" : "pointer",
                flexShrink: 0,
              }}
            >
              {emp.loading ? "…" : "Verify"}
            </button>
          </div>
        </Card>
      ))}
    </div>
  );
}