"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Activity,
  FileText,
  Network,
} from "lucide-react";
import { colors } from "@/constants/colors";
import { Card, ScoreRing } from "@/components/shared";
import { Employee } from "@/types";
import { verdictColor, squadAction, getComponentColor } from "@/utils/helpers";
import { getVerdictIcon } from "@/utils/icons";

interface EmployeeDetailProps {
  emp: Employee;
  onBack: () => void;
}

export function EmployeeDetail({ emp, onBack }: EmployeeDetailProps) {
  const [running, setRunning] = useState(false);
  const [ran, setRan] = useState(false);

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

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
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
    </div>
  );
}
