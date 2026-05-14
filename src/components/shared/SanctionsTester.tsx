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
            <div>
              <div
                style={{
                  color: result.is_sanctioned ? colors.error : colors.success,
                  fontSize: 12,
                  fontWeight: 600,
                  marginBottom: 4,
                }}
              >
                {result.is_sanctioned ? "🚨 SANCTIONED" : "✓ CLEAR"}
              </div>
              <div style={{ color: colors.muted, fontSize: 11 }}>
                {result.details || result.message}
              </div>
              {result.lists && result.lists.length > 0 && (
                <div style={{ color: colors.text, fontSize: 11, marginTop: 4 }}>
                  Lists: {result.lists.join(", ")}
                </div>
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
