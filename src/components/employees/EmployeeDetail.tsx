"use client";

import { useState, useEffect } from "react";
import {
  AlertTriangle,
  Activity,
  FileText,
  Network,
  Zap,
} from "lucide-react";
import { colors } from "@/constants/colors";
import { Card, ScoreRing } from "@/components/shared";
import { Employee } from "@/types";
import { verdictColor, squadAction, getComponentColor } from "@/utils/helpers";
import { getVerdictIcon } from "@/utils/icons";
import { verifyBankAccount } from "@/utils/squadAPI";
import { AdvancedVerification } from "@/components/employees/AdvancedVerification";
import { runComprehensiveVerification, VerificationReport } from "@/utils/verificationOrchestrator";

interface EmployeeDetailProps {
  emp: Employee;
  onBack: () => void;
}

export function EmployeeDetail({ emp, onBack }: EmployeeDetailProps) {
  const [tab, setTab] = useState<"overview" | "advanced">("overview");
  const [running, setRunning] = useState(false);
  const [ran, setRan] = useState(false);
  const [comprehensiveLoading, setComprehensiveLoading] = useState(false);
  const [comprehensiveReport, setComprehensiveReport] = useState<VerificationReport | null>(null);

  useEffect(() => {
    // Auto-verify bank account when component loads
    runBankVerification();
  }, [emp.account, emp.bank]);

  const runBankVerification = async () => {
    try {
      await verifyBankAccount(emp.account, emp.bank);
    } catch (error) {
      console.error("Bank account verification error:", error);
    }
  };

  const runComprehensive = async () => {
    setComprehensiveLoading(true);
    try {
      const report = await runComprehensiveVerification(emp);
      setComprehensiveReport(report);
    } catch (error) {
      console.error("Comprehensive verification error:", error);
    } finally {
      setComprehensiveLoading(false);
    }
  };

  const simulate = () => {
    setRunning(true);
    setTimeout(() => {
      setRunning(false);
      setRan(true);
    }, 2200);
  };

  const breakdown = [
    {
      label: "Behavioural Signals",
      val: emp.behavioural,
      icon: <Activity size={14} />,
      desc: "Salary withdrawal velocity, attendance patterns, transaction regularity",
    },
    {
      label: "Document Verification",
      val: emp.document,
      icon: <FileText size={14} />,
      desc: "Certificate forensics, OCR consistency, authority cross-reference",
    },
    {
      label: "Network Analysis",
      val: emp.network,
      icon: <Network size={14} />,
      desc: "Shared account/device/editor graph — ring detection via GNN",
    },
  ]; 

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      <button
        onClick={onBack}
        style={{
          background: "none",
          border: "none",
          color: colors.muted,
          cursor: "pointer",
          fontSize: 13,
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: 0,
        }}
      >
        ← Back to employees
      </button>

      {/* Tab Navigation */}
      <div style={{ display: "flex", gap: 12, borderBottom: `1px solid ${colors.border}`, paddingBottom: 12 }}>
        <button
          onClick={() => setTab("overview")}
          style={{
            background: "none",
            border: "none",
            color: tab === "overview" ? colors.primary : colors.muted,
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 600,
            paddingBottom: 12,
            borderBottom: tab === "overview" ? `2px solid ${colors.primary}` : "none",
          }}
        >
          Overview
        </button>
        <button
          onClick={() => setTab("advanced")}
          style={{
            background: "none",
            border: "none",
            color: tab === "advanced" ? colors.primary : colors.muted,
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 600,
            paddingBottom: 12,
            borderBottom: tab === "advanced" ? `2px solid ${colors.primary}` : "none",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <Zap size={14} />
          Advanced Verification
        </button>
      </div>

      {/* Tab Content */}
      {tab === "overview" && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
        <Card style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <ScoreRing score={emp.sts} />
          <div>
            <div
              style={{
                color: colors.muted,
                fontSize: 11,
                marginBottom: 4,
              }}
            >
              Core-Connect TRUST SCORE
            </div>
            <div
              style={{
                color: colors.text,
                fontSize: 18,
                fontWeight: 700,
                marginBottom: 2,
              }}
            >
              {emp.name}
            </div>
            <div
              style={{
                color: colors.muted,
                fontSize: 12,
                marginBottom: 10,
              }}
            >
              {emp.id} · {emp.dept} · Grade {emp.grade}
            </div>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                color: verdictColor(emp.verdict),
                fontSize: 13,
                fontWeight: 700,
                padding: "4px 12px",
                background: `${verdictColor(emp.verdict)}18`,
                borderRadius: 20,
                border: `1px solid ${verdictColor(emp.verdict)}40`,
              }}
            >
              {getVerdictIcon(emp.verdict)} {emp.verdict}
            </span>
          </div>
        </Card>

        <Card>
          <div
            style={{
              color: colors.muted,
              fontSize: 11,
              marginBottom: 12,
            }}
          >
            SQUAD PAYMENT DECISION
          </div>
          <div
            style={{
              color: ["TRUSTED", "VERIFIED"].includes(emp.verdict) ? colors.success : colors.error,
              fontSize: 16,
              fontWeight: 700,
              marginBottom: 8,
            }}
          >
            {squadAction(emp.verdict)}
          </div>
          <div
            style={{
              color: colors.muted,
              fontSize: 12,
              marginBottom: 12,
            }}
          >
            Salary:{" "}
            <span style={{ color: colors.text, fontWeight: 600 }}>
              ₦{emp.salary.toLocaleString()}
            </span>
          </div>
          <div
            style={{
              color: colors.muted,
              fontSize: 11,
              fontFamily: "monospace",
              background: colors.surface,
              padding: 8,
              borderRadius: 6,
              lineHeight: 1.6,
            }}
          >
            POST /payout/transfer
            <br />
            account: {emp.account}
            <br />
            bank: {emp.bank}
            <br />
            amount: {emp.salary * 100} (kobo)
            <br />
            ref: Core-Connect-{emp.verdict}|{emp.sts}|{emp.id}
            <br />
            status:{" "}
            <span
              style={{
                color: ["TRUSTED", "VERIFIED"].includes(emp.verdict)
                  ? colors.success
                  : colors.error,
              }}
            >
              {["TRUSTED", "VERIFIED"].includes(emp.verdict)
                ? "200 OK"
                : "BLOCKED"}
            </span>
          </div>
        </Card>
      </div>

      <Card>
        <div
          style={{
            color: colors.muted,
            fontSize: 11,
            marginBottom: 12,
            display: "flex",
            alignItems: "center",
            gap: 6,
            justifyContent: "space-between",
          }}
        >
          <span>SQUAD BANK ACCOUNT VERIFICATION</span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
            marginBottom: 12,
          }}
        >
          <div>
            <div style={{ color: colors.muted, fontSize: 10, marginBottom: 4 }}>
              Account Number
            </div>
            <div style={{ color: colors.text, fontWeight: 600, fontSize: 13 }}>
              {emp.account}
            </div>
          </div>
          <div>
            <div style={{ color: colors.muted, fontSize: 10, marginBottom: 4 }}>
              Bank Code
            </div>
            <div style={{ color: colors.text, fontSize: 12 }}>
              {emp.bank}
            </div>
          </div>
        </div>

        <div
          style={{
            padding: 12,
            background: colors.warning + "20",
            borderRadius: 6,
            border: `1px solid ${colors.warning}40`,
            fontSize: 12,
            color: colors.text,
          }}
        >
          Real bank verification is pending account upload and Squad API setup
        </div>

        <button
          onClick={runBankVerification}
          style={{
            background: colors.info,
            color: "#fff",
            fontWeight: 600,
            fontSize: 12,
            padding: "8px 16px",
            borderRadius: 6,
            border: "none",
            cursor: "pointer",
            width: "100%",
            marginTop: 12,
          }}
        >
          Verify Bank Account
        </button>
      </Card>

      <Card>
        <div
          style={{
            color: colors.muted,
            fontSize: 11,
            marginBottom: 14,
          }}
        >
          SCORE BREAKDOWN
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {breakdown.map((b) => {
            const col = getComponentColor(b.val);
            return (
              <div key={b.label}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 6,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 7,
                      color: colors.text,
                      fontSize: 13,
                    }}
                  >
                    <span style={{ color: col }}>{b.icon}</span>
                    {b.label}
                  </div>
                  <span
                    style={{
                      color: col,
                      fontWeight: 700,
                      fontSize: 13,
                    }}
                  >
                    {b.val}/100
                  </span>
                </div>
                <div
                  style={{
                    height: 6,
                    borderRadius: 3,
                    background: colors.border,
                  }}
                >
                  <div
                    style={{
                      width: `${b.val}%`,
                      height: "100%",
                      borderRadius: 3,
                      background: col,
                      transition: "width .6s",
                    }}
                  />
                </div>
                <div
                  style={{
                    color: colors.muted,
                    fontSize: 11,
                    marginTop: 4,
                  }}
                >
                  {b.desc}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {emp.flags.length > 0 && (
        <Card
          style={{
            border: `1px solid ${colors.error}40`,
          }}
        >
          <div
            style={{
              color: colors.error,
              fontSize: 11,
              marginBottom: 12,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <AlertTriangle size={12} /> ACTIVE RISK FLAGS
          </div>
          {emp.flags.map((f, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 10,
                alignItems: "flex-start",
                padding: "8px 0",
                borderBottom:
                  i < emp.flags.length - 1 ? `1px solid ${colors.border}` : "none",
              }}
            >
              <span style={{ color: colors.error, marginTop: 1 }}>•</span>
              <span style={{ color: colors.text, fontSize: 13 }}>{f}</span>
            </div>
          ))}
        </Card>
      )}

      <Card>
        <div
          style={{
            color: colors.muted,
            fontSize: 11,
            marginBottom: 12,
          }}
        >
          RE-RUN VERIFICATION ENGINE
        </div>
        <button
          onClick={simulate}
          disabled={running}
          style={{
            background: colors.success,
            color: "#000",
            fontWeight: 700,
            fontSize: 13,
            padding: "10px 24px",
            borderRadius: 8,
            border: "none",
            cursor: running ? "not-allowed" : "pointer",
            opacity: running ? 0.7 : 1,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          {running ? "Running Core-Connect AI…" : ran ? "✓ Verification Complete — Rerun" : "Run Full Verification"}
        </button>
        {running && (
          <div
            style={{
              marginTop: 12,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {[
              "Module A: Payroll anomaly detection…",
              "Module B: Document forensics pipeline…",
              "Module C: Fusing signals into STS…",
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  color: colors.muted,
                  fontSize: 12,
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: colors.success,
                    animation: "pulse 1s infinite",
                  }}
                />
                {s}
              </div>
            ))}
          </div>
        )}
        {ran && !running && (
          <div
            style={{
              marginTop: 12,
              color: colors.success,
              fontSize: 12,
            }}
          >
            ✓ STS recomputed: {emp.sts} · Verdict unchanged: {emp.verdict}
          </div>
        )}
      </Card>
        </>
      )}

      {tab === "advanced" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Advanced Verification Tab */}
          {!comprehensiveReport ? (
            <Card style={{ textAlign: "center", padding: 24 }}>
              <Zap size={32} color={colors.primary} style={{ margin: "0 auto 12px" }} />
              <div style={{ fontSize: 14, fontWeight: 600, color: colors.text, marginBottom: 8 }}>
                Run Comprehensive Verification
              </div>
              <div style={{ fontSize: 12, color: colors.muted, marginBottom: 16 }}>
                Analyze all 5 verification methods (BVN, Payroll, Settlement, Transactions, Duplicates) for complete risk assessment
              </div>
              <button
                onClick={runComprehensive}
                disabled={comprehensiveLoading}
                style={{
                  background: colors.primary,
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: 13,
                  padding: "12px 24px",
                  borderRadius: 8,
                  border: "none",
                  cursor: comprehensiveLoading ? "not-allowed" : "pointer",
                  opacity: comprehensiveLoading ? 0.7 : 1,
                }}
              >
                {comprehensiveLoading ? "Running Verification..." : "Start Comprehensive Analysis"}
              </button>
            </Card>
          ) : (
            <>
              <button
                onClick={() => setComprehensiveReport(null)}
                style={{
                  background: "none",
                  border: "none",
                  color: colors.muted,
                  cursor: "pointer",
                  fontSize: 12,
                  padding: 0,
                }}
              >
                ← Run another verification
              </button>
              {comprehensiveReport && <AdvancedVerification verification={comprehensiveReport.summary} />}
            </>
          )}
        </div>
      )}
    </div>
  );
}
