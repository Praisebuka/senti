"use client";

import { useState } from "react";
import { colors } from "@/constants/colors";
import { Card } from "@/components/shared";
import { ComprehensiveVerification } from "@/types";
import { AlertCircle, CheckCircle } from "lucide-react";

interface AdvancedVerificationProps {
  verification: ComprehensiveVerification;
  loading?: boolean;
}

export function AdvancedVerification({ verification, loading }: AdvancedVerificationProps) {
  const [expandedScore, setExpandedScore] = useState<string | null>(null);

  const scoreBreakdown = [
    {
      name: "Identity Score",
      value: verification.identityScore,
      desc: "BVN verification & name matching",
      icon: "🆔",
    },
    {
      name: "Financial Score",
      value: verification.financialScore,
      desc: "Payroll & settlement verification",
      icon: "💰",
    },
    {
      name: "Behavioral Score",
      value: verification.behavioralScore,
      desc: "Transaction patterns & anomalies",
      icon: "📊",
    },
    {
      name: "Network Score",
      value: verification.networkScore,
      desc: "Duplicate identity detection",
      icon: "🔗",
    },
    {
      name: "Temporal Score",
      value: verification.temporalScore,
      desc: "Payment timing patterns",
      icon: "⏰",
    },
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
      case "low":
        return colors.success;
      case "medium":
        return colors.warning;
      case "high":
        return "#FF8C00";
      case "critical":
        return colors.error;
      default:
        return colors.muted;
    }
  };

  if (loading) {
    return (
      <Card style={{ padding: 24, textAlign: "center" }}>
        <div style={{ color: colors.muted, fontSize: 14 }}>Running comprehensive verification...</div>
      </Card>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Overall Risk Card */}
      <Card>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            <div style={{ color: colors.muted, fontSize: 11, marginBottom: 8 }}>
              OVERALL RISK ASSESSMENT
            </div>
            <div
              style={{
                fontSize: 32,
                fontWeight: 800,
                color: getRiskColor(verification.riskLevel),
              }}
            >
              {verification.overallRiskScore}
              <span style={{ fontSize: 14, color: colors.muted, marginLeft: 8 }}>/ 100</span>
            </div>
            <div style={{ marginTop: 8, fontSize: 13, color: colors.text }}>
              Risk Level:{" "}
              <span style={{ color: getRiskColor(verification.riskLevel), fontWeight: 600 }}>
                {verification.riskLevel.toUpperCase()}
              </span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {verification.riskLevel === "low" ? (
              <CheckCircle size={48} color={colors.success} />
            ) : (
              <AlertCircle size={48} color={getRiskColor(verification.riskLevel)} />
            )}
          </div>
        </div>

        {/* Recommendation */}
        <div
          style={{
            background: `${getRiskColor(verification.riskLevel)}15`,
            border: `1px solid ${getRiskColor(verification.riskLevel)}40`,
            borderRadius: 8,
            padding: 12,
            marginTop: 16,
          }}
        >
          <div style={{ fontSize: 11, color: colors.muted, marginBottom: 4 }}>SQUAD ACTION</div>
          <div style={{ color: getRiskColor(verification.riskLevel), fontSize: 13, fontWeight: 600 }}>
            {verification.recommendation}
          </div>
        </div>
      </Card>

      {/* Component Scores Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
        {scoreBreakdown.map((score) => (
          <div
            key={score.name}
            onClick={() => setExpandedScore(expandedScore === score.name ? null : score.name)}
            style={{
              padding: 16,
              cursor: "pointer",
              border: expandedScore === score.name ? `2px solid ${colors.primary}` : `1px solid ${colors.border}`,
              transition: "all 0.2s ease",
              borderRadius: 8,
              background: colors.card,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <div style={{ fontSize: 20 }}>{score.icon}</div>
              <div>
                <div style={{ fontSize: 11, color: colors.muted, fontWeight: 500 }}>{score.name}</div>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color:
                      score.value >= 75
                        ? colors.success
                        : score.value >= 50
                          ? colors.warning
                          : colors.error,
                  }}
                >
                  {score.value}
                </div>
              </div>
            </div>

            {expandedScore === score.name && (
              <div style={{ fontSize: 11, color: colors.muted, paddingTop: 12, borderTop: `1px solid ${colors.border}` }}>
                {score.desc}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Risk Gauge */}
      <Card style={{ padding: 16 }}>
        <div style={{ fontSize: 11, color: colors.muted, marginBottom: 12, fontWeight: 600 }}>
          RISK DISTRIBUTION
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, height: 6, borderRadius: 4, overflow: "hidden", background: colors.card }}>
          <div
            style={{
              flex: verification.overallRiskScore / 100,
              background: getRiskColor(verification.riskLevel),
              height: "100%",
              borderRadius: 4,
            }}
          />
          <div style={{ flex: 1 - verification.overallRiskScore / 100, background: colors.success, height: "100%", borderRadius: 4 }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 10, color: colors.muted }}>
          <span>High Risk</span>
          <span>Low Risk</span>
        </div>
      </Card>

      {/* Detailed Breakdown */}
      <Card>
        <div style={{ fontSize: 11, color: colors.muted, marginBottom: 16, fontWeight: 600 }}>
          VERIFICATION METHODS
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {verification.verifications && (
            <>
              {verification.verifications.bvn && (
                <VerificationMethod
                  name="BVN Verification"
                  status={verification.verifications.bvn.status}
                  confidence={verification.verifications.bvn.data?.verified_name ? 95 : 0}
                  details={verification.verifications.bvn.data?.verified_name}
                />
              )}
              {verification.verifications.payroll && (
                <VerificationMethod
                  name="Payroll Verification"
                  status={verification.verifications.payroll.status}
                  confidence={verification.verifications.payroll.data?.salary_verified ? 90 : 40}
                  details={
                    verification.verifications.payroll.data?.anomalies?.join(", ") || "Salary verified"
                  }
                />
              )}
              {verification.verifications.settlement && (
                <VerificationMethod
                  name="Settlement Account"
                  status={verification.verifications.settlement.status}
                  confidence={verification.verifications.settlement.data?.settlement_pattern_score}
                  details={verification.verifications.settlement.data?.account_status}
                />
              )}
              {verification.verifications.duplicates && (
                <VerificationMethod
                  name="Duplicate Detection"
                  status={verification.verifications.duplicates.status}
                  confidence={verification.verifications.duplicates.data?.is_duplicate ? 0 : 95}
                  details={
                    verification.verifications.duplicates.data?.is_duplicate
                      ? `${verification.verifications.duplicates.data.duplicate_count} duplicates found`
                      : "No duplicates detected"
                  }
                />
              )}
            </>
          )}
        </div>
      </Card>
    </div>
  );
}

interface VerificationMethodProps {
  name: string;
  status: string;
  confidence?: number;
  details?: string;
}

function VerificationMethod({ name, status, confidence = 0, details }: VerificationMethodProps) {
  const isSuccess = status === "success" && confidence > 50;

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 12, borderBottom: `1px solid ${colors.border}` }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: colors.text }}>{name}</div>
        <div style={{ fontSize: 11, color: colors.muted, marginTop: 2 }}>{details || "N/A"}</div>
      </div>
      <div style={{ textAlign: "right", marginLeft: 12 }}>
        <div
          style={{
            fontSize: 11,
            color: isSuccess ? colors.success : status === "error" ? colors.error : colors.warning,
            fontWeight: 600,
          }}
        >
          {isSuccess ? "✓ Pass" : status === "error" ? "✗ Error" : "⚠ Review"}
        </div>
        {confidence !== undefined && (
          <div style={{ fontSize: 10, color: colors.muted, marginTop: 2 }}>{Math.round(confidence)}% confident</div>
        )}
      </div>
    </div>
  );
}
