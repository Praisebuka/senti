"use client";

import { useState } from "react";
import { colors } from "@/constants/colors";
import { Card, ScoreRing } from "@/components/shared";
import { CredentialResult, Verdict } from "@/types";

export function CredentialVerifier() {
  const [step, setStep] = useState(0);
  const [docType, setDocType] = useState("WAEC");
  const [candNo, setCandNo] = useState("");
  const [name, setName] = useState("");
  const [year, setYear] = useState("2018");
  const [result, setResult] = useState<CredentialResult | null>(null);
  const [loading, setLoading] = useState(false);

  const STAGES = ["Classify", "Security Features", "OCR Check", "Forensics", "Authority Lookup"];

  const verdictColor = (verdict: Verdict | string) => {
    if (verdict === "VERIFIED") return colors.success;
    if (verdict === "SUSPICIOUS") return "#FF8C00";
    return colors.error;
  };

  const run = () => {
    if (!candNo || !name) return;
    setLoading(true);
    setStep(0);
    setResult(null);
    const tick = (i: number) => {
      if (i >= STAGES.length) {
        const score = Math.random() * 0.4 + (candNo.length > 8 ? 0.55 : 0.3);
        setResult({
          credential_trust: parseFloat(score.toFixed(3)),
          verdict: score >= 0.75 ? "VERIFIED" : score >= 0.5 ? "SUSPICIOUS" : "REJECTED",
          stages: {
            security_integrity: parseFloat((Math.random() * 0.3 + 0.6).toFixed(2)),
            ocr_consistency: parseFloat((Math.random() * 0.3 + 0.55).toFixed(2)),
            manipulation_prob: parseFloat((Math.random() * 0.2).toFixed(2)),
            authority_match: score >= 0.75,
          },
          issues:
            score < 0.75
              ? [
                  "Name similarity below threshold (0.61)",
                  "Authority cross-reference: record not confirmed",
                ]
              : [],
        });
        setLoading(false);
        return;
      }
      setStep(i + 1);
      setTimeout(() => tick(i + 1), 800);
    };
    tick(0);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Card>
        <div
          style={{
            color: colors.muted,
            fontSize: 11,
            marginBottom: 14,
          }}
        >
          DOCUMENT SUBMISSION
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 12,
            marginBottom: 14,
          }}
        >
          <div>
            <div
              style={{
                color: colors.muted,
                fontSize: 11,
                marginBottom: 6,
              }}
            >
              Document Type
            </div>
            <select
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
              style={{
                width: "100%",
                background: colors.surface,
                border: `1px solid ${colors.border}`,
                borderRadius: 6,
                padding: "8px 10px",
                color: colors.text,
                fontSize: 13,
              }}
            >
              {["WAEC", "NECO", "Degree", "NYSC", "HND", "OND"].map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </div>
          <div>
            <div
              style={{
                color: colors.muted,
                fontSize: 11,
                marginBottom: 6,
              }}
            >
              Year
            </div>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              style={{
                width: "100%",
                background: colors.surface,
                border: `1px solid ${colors.border}`,
                borderRadius: 6,
                padding: "8px 10px",
                color: colors.text,
                fontSize: 13,
              }}
            >
              {Array.from({ length: 20 }, (_, i) => 2024 - i).map((y) => (
                <option key={y}>{y}</option>
              ))}
            </select>
          </div>
          <div>
            <div
              style={{
                color: colors.muted,
                fontSize: 11,
                marginBottom: 6,
              }}
            >
              Candidate / Reg Number
            </div>
            <input
              value={candNo}
              onChange={(e) => setCandNo(e.target.value)}
              placeholder="e.g. 4123456789"
              style={{
                width: "100%",
                background: colors.surface,
                border: `1px solid ${colors.border}`,
                borderRadius: 6,
                padding: "8px 10px",
                color: colors.text,
                fontSize: 13,
                boxSizing: "border-box",
              }}
            />
          </div>
          <div>
            <div
              style={{
                color: colors.muted,
                fontSize: 11,
                marginBottom: 6,
              }}
            >
              Name on Certificate
            </div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              style={{
                width: "100%",
                background: colors.surface,
                border: `1px solid ${colors.border}`,
                borderRadius: 6,
                padding: "8px 10px",
                color: colors.text,
                fontSize: 13,
                boxSizing: "border-box",
              }}
            />
          </div>
        </div>

        <div
          style={{
            border: `2px dashed ${colors.border}`,
            borderRadius: 8,
            padding: 24,
            textAlign: "center",
            color: colors.muted,
            fontSize: 13,
            marginBottom: 14,
          }}
        >
          📎 Drop certificate image / PDF here (v0.1 — OCR simulation active)
        </div>

        <button
          onClick={run}
          disabled={loading || !candNo || !name}
          style={{
            background: colors.success,
            color: "#000",
            fontWeight: 700,
            fontSize: 13,
            padding: "10px 24px",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            opacity: loading || !candNo || !name ? 0.6 : 1,
          }}
        >
          {loading ? "Verifying…" : "Run Credential Verification"}
        </button>
      </Card>

      {(loading || result) && (
        <Card>
          <div
            style={{
              color: colors.muted,
              fontSize: 11,
              marginBottom: 14,
            }}
          >
            PIPELINE PROGRESS
          </div>
          <div
            style={{
              display: "flex",
              gap: 0,
              marginBottom: 20,
            }}
          >
            {STAGES.map((s, i) => (
              <div
                key={s}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: 700,
                    background:
                      i < step ? colors.success : i === step && loading ? colors.warning : colors.border,
                    color: i < step || (i === step && loading) ? "#000" : colors.muted,
                    transition: "background .4s",
                  }}
                >
                  {i < step ? "✓" : i + 1}
                </div>
                <div
                  style={{
                    color:
                      i < step ? colors.success : i === step && loading ? colors.warning : colors.muted,
                    fontSize: 10,
                    textAlign: "center",
                  }}
                >
                  {s}
                </div>
              </div>
            ))}
          </div>

          {result && (
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  marginBottom: 14,
                }}
              >
                <ScoreRing score={Math.round(result.credential_trust * 1000)} />
                <div>
                  <div
                    style={{
                      color: colors.muted,
                      fontSize: 11,
                    }}
                  >
                    CREDENTIAL TRUST SCORE
                  </div>
                  <div
                    style={{
                      color: verdictColor(result.verdict),
                      fontSize: 20,
                      fontWeight: 800,
                      marginBottom: 4,
                    }}
                  >
                    {result.verdict}
                  </div>
                  <div
                    style={{
                      color: colors.muted,
                      fontSize: 12,
                    }}
                  >
                    {docType} · {name} · {year}
                  </div>
                </div>
              </div>
              {[
                ["Security Integrity", result.stages.security_integrity, true],
                ["OCR Consistency", result.stages.ocr_consistency, true],
                ["Manipulation Prob.", result.stages.manipulation_prob, false],
                ["Authority Confirmed", result.stages.authority_match ? 1 : 0, true],
              ].map(([l, v, higher], idx) => {
                const numValue = typeof v === "number" ? v : 0;
                const score = (higher ? numValue : 1 - numValue);
                const col = score >= 0.7 ? colors.success : score >= 0.5 ? colors.warning : colors.error;
                return (
                  <div
                    key={`stage-${idx}`}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "6px 0",
                      borderBottom: `1px solid ${colors.border}`,
                    }}
                  >
                    <span
                      style={{
                        color: colors.muted,
                        fontSize: 12,
                      }}
                    >
                      {l}
                    </span>
                    <span
                      style={{
                        color: col,
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      {typeof v === "boolean"
                        ? v
                          ? "✓ YES"
                          : "✗ NO"
                        : ((numValue) * 100).toFixed(0) + "%"}
                    </span>
                  </div>
                );
              })}
              {result.issues.length > 0 && (
                <div
                  style={{
                    marginTop: 12,
                    padding: 10,
                    background: `${colors.error}12`,
                    borderRadius: 6,
                    border: `1px solid ${colors.error}30`,
                  }}
                >
                  {result.issues.map((iss, i) => (
                    <div
                      key={i}
                      style={{
                        color: colors.error,
                        fontSize: 12,
                      }}
                    >
                      • {iss}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
