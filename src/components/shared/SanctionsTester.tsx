"use client";

import { useState } from "react";
import { colors } from "@/constants/colors";
import { Card } from "@/components/shared";
import { AlertCircle, CheckCircle } from "lucide-react";

export function SanctionsTester() {
  const [name, setBvnName] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testSanctions = async () => {
    if (!name.trim()) return;
    setLoading(true);

    try {
      // Call the same checkSanctions logic client-side
      const response = await fetch("/api/verify/sanctions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        is_sanctioned: false,
        details: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      });
    } finally {
      setLoading(false);
    }
  };

  const exampleNames = ["Putin", "Maduro", "Assad", "Normal Person"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Card>
        <div style={{ color: colors.muted, fontSize: 11, marginBottom: 12 }}>
          🔍 SANCTIONS CHECK TESTER
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <input
            value={name}
            onChange={(e) => setBvnName(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && testSanctions()}
            placeholder="Enter name to check (e.g., Putin, Maduro)"
            style={{
              flex: 1,
              padding: "8px 12px",
              borderRadius: 6,
              border: `1px solid ${colors.border}`,
              background: colors.surface,
              color: colors.text,
              fontSize: 13,
            }}
          />
          <button
            onClick={testSanctions}
            disabled={loading || !name.trim()}
            style={{
              padding: "8px 16px",
              borderRadius: 6,
              background: colors.primary,
              color: "#fff",
              border: "none",
              fontWeight: 600,
              fontSize: 12,
              cursor: loading || !name.trim() ? "not-allowed" : "pointer",
              opacity: loading || !name.trim() ? 0.6 : 1,
            }}
          >
            {loading ? "Checking..." : "Test"}
          </button>
        </div>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
          {exampleNames.map((ex) => (
            <button
              key={ex}
              onClick={() => setBvnName(ex)}
              style={{
                padding: "4px 10px",
                fontSize: 11,
                background: colors.surface,
                border: `1px solid ${colors.border}`,
                borderRadius: 4,
                color: colors.text,
                cursor: "pointer",
              }}
            >
              {ex}
            </button>
          ))}
        </div>

        {result && (
          <div
            style={{
              padding: 12,
              background: result.is_sanctioned ? `${colors.error}15` : `${colors.success}15`,
              border: `1px solid ${result.is_sanctioned ? `${colors.error}40` : `${colors.success}40`}`,
              borderRadius: 6,
              display: "flex",
              gap: 10,
              alignItems: "flex-start",
            }}
          >
            <div style={{ marginTop: 2 }}>
              {result.is_sanctioned ? (
                <AlertCircle size={16} color={colors.error} />
              ) : (
                <CheckCircle size={16} color={colors.success} />
              )}
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  color: result.is_sanctioned ? colors.error : colors.success,
                  fontSize: 12,
                  fontWeight: 600,
                  marginBottom: 8,
                }}
              >
                {result.is_sanctioned ? "🚨 SANCTIONS ALERT" : "✓ CLEAR"}
              </div>

              {result.is_sanctioned ? (
                <>
                  <div style={{ color: colors.text, fontSize: 12, marginBottom: 8, lineHeight: 1.5 }}>
                    <strong>{name}</strong> matches {result.lists.join(" + ")} sanctions list(s) with {result.match_confidence}% confidence.
                  </div>
                  <div style={{ background: `${colors.error}25`, padding: 8, borderRadius: 4, marginBottom: 8, fontSize: 11, color: colors.text }}>
                    <strong>⚠️ Impact:</strong> This employee <strong>CANNOT</strong> receive payments via Squad or any banking channel. Transfer must be BLOCKED immediately.
                  </div>
                  <div style={{ fontSize: 11, color: colors.muted }}>
                    <strong>Action Required:</strong> Manual compliance review by legal/compliance team before any disbursement.
                  </div>
                </>
              ) : (
                <>
                  <div style={{ color: colors.text, fontSize: 12, marginBottom: 8 }}>
                    <strong>{name}</strong> is <strong>NOT</strong> listed on OFAC SDN, UN Consolidated, or PEP databases.
                  </div>
                  <div style={{ background: `${colors.success}25`, padding: 8, borderRadius: 4, marginBottom: 8, fontSize: 11, color: colors.text }}>
                    <strong>✓ Status:</strong> Employee clears sanctions screening. Safe to proceed with Squad payment processing.
                  </div>
                  <div style={{ fontSize: 11, color: colors.muted }}>
                    <strong>Next Step:</strong> Verify BVN + bank account details before executing transfer.
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
