"use client";

import { useState } from "react";
import { Send, AlertCircle, CheckCircle, Loader } from "lucide-react";
import { colors } from "@/constants/colors";
import { Card } from "@/components/shared/Card";
import { Employee } from "@/types";
import { useAlert } from "@/hooks/useAlert";

interface PaymentExecutorProps {
  employee: Employee;
  verdict: string;
  sts_score: number;
  amount?: number;
}

interface PaymentResult {
  success: boolean;
  data?: {
    transaction_id: string;
    squad_reference: string;
    audit_reference: string;
    amount: number;
    status: string;
    timestamp: string;
  };
  message?: string;
}

export function PaymentExecutor({
  employee,
  verdict,
  sts_score,
  amount = 285000,
}: PaymentExecutorProps) {
  const [executing, setExecuting] = useState(false);
  const [result, setResult] = useState<PaymentResult | null>(null);
  const alert = useAlert();

  const canExecute = verdict === "EXECUTE" && sts_score >= 750;

  const handleExecutePayment = async () => {
    if (!canExecute) {
      await alert.showWarning({
        title: "Cannot Execute",
        message: "Only EXECUTE verdicts with STS ≥ 750 can proceed",
      });
      return;
    }

    const confirmed = await alert.showConfirm({
      title: "Execute Payment?",
      message: `Execute ₦${(amount / 100).toLocaleString()} payment to ${employee.name}?\n\nAccount: ${employee.account}\nBank: ${employee.bank_code}\nEmployee ID: ${employee.id}`,
      confirmText: "Execute Payment",
      cancelText: "Cancel",
    });

    if (!confirmed.isConfirmed) return;

    setExecuting(true);
    setResult(null);

    try {
      const response = await fetch("/api/pay/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          account_number: employee.account,
          bank_code: employee.bank_code,
          amount, // in kobo
          employee_id: employee.id,
          employee_name: employee.name,
          verdict,
          sts_score,
          remark: `Verified Payroll - STS: ${sts_score} - Verdict: ${verdict}`,
        }),
      });

      const data = await response.json();
      setResult(data);

      if (data.success) {
        await alert.showSuccess({
          title: "Payment Executed!",
          message: `Transaction ID: ${data.data.transaction_id}\nReference: ${data.data.squad_reference}`,
        });
      } else {
        await alert.showError({
          title: "Payment Failed",
          message: data.message || "Unknown error",
        });
      }
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Unknown error";
      setResult({
        success: false,
        message: errorMsg,
      });
      await alert.showError({
        title: "Payment Error",
        message: errorMsg,
      });
    } finally {
      setExecuting(false);
    }
  };

  return (
    <Card
      style={{
        padding: 20,
        borderLeft: `4px solid ${
          result?.success
            ? colors.success
            : result
              ? colors.error
              : colors.primary
        }`,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 16 }}>
        <div>
          <div
            style={{
              color: colors.text,
              fontWeight: 700,
              fontSize: 16,
              marginBottom: 4,
            }}
          >
            💳 Payment Execution
          </div>
          <div style={{ color: colors.muted, fontSize: 13 }}>
            Execute verified salary transfer via Squad API
          </div>
        </div>
        {result && (
          <div>
            {result.success ? (
              <CheckCircle size={24} color={colors.success} />
            ) : (
              <AlertCircle size={24} color={colors.error} />
            )}
          </div>
        )}
      </div>

      {/* Payment Details */}
      <div
        style={{
          background: colors.bg,
          borderRadius: 8,
          padding: 16,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
          }}
        >
          <div>
            <div style={{ color: colors.muted, fontSize: 12 }}>Employee</div>
            <div style={{ color: colors.text, fontWeight: 600, fontSize: 14, marginTop: 4 }}>
              {employee.name}
            </div>
            <div style={{ color: colors.textSecondary, fontSize: 12, marginTop: 2 }}>
              {employee.id}
            </div>
          </div>
          <div>
            <div style={{ color: colors.muted, fontSize: 12 }}>Amount</div>
            <div
              style={{
                color: colors.primary,
                fontWeight: 700,
                fontSize: 18,
                marginTop: 4,
              }}
            >
              ₦{(amount / 100).toLocaleString()}
            </div>
          </div>
          <div>
            <div style={{ color: colors.muted, fontSize: 12 }}>Bank Account</div>
            <div
              style={{
                color: colors.text,
                fontWeight: 600,
                fontSize: 13,
                marginTop: 4,
                fontFamily: "monospace",
              }}
            >
              {employee.account} ({employee.bank_code})
            </div>
          </div>
          <div>
            <div style={{ color: colors.muted, fontSize: 12 }}>Verdict</div>
            <div
              style={{
                color: colors.success,
                fontWeight: 600,
                fontSize: 14,
                marginTop: 4,
              }}
            >
              {verdict}
            </div>
          </div>
        </div>
      </div>

      {/* Verification Status */}
      <div
        style={{
          background: colors.bg,
          borderRadius: 8,
          padding: 12,
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background:
              sts_score >= 750
                ? `rgba(34, 197, 94, 0.1)`
                : `rgba(239, 68, 68, 0.1)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 14,
            color: sts_score >= 750 ? colors.success : colors.error,
          }}
        >
          {sts_score}
        </div>
        <div>
          <div style={{ color: colors.text, fontWeight: 600, fontSize: 13 }}>
            Squad Trust Score (STS)
          </div>
          <div style={{ color: colors.muted, fontSize: 12, marginTop: 2 }}>
            {sts_score >= 900
              ? "🟢 TRUSTED - Execute immediately"
              : sts_score >= 750
                ? "🟡 VERIFIED - Execute with logging"
                : "⚠️ Below minimum threshold"}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={handleExecutePayment}
        disabled={executing || !canExecute}
        style={{
          width: "100%",
          padding: "12px 16px",
          borderRadius: 8,
          background: canExecute ? colors.primary : colors.border,
          color: canExecute ? "#fff" : colors.muted,
          border: "none",
          cursor: canExecute ? "pointer" : "not-allowed",
          fontWeight: 600,
          fontSize: 14,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          transition: "all 0.2s ease",
          opacity: executing ? 0.7 : 1,
        }}
        onMouseEnter={(e) => {
          if (canExecute && !executing) {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = `0 8px 16px rgba(224, 24, 91, 0.2)`;
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {executing ? (
          <>
            <Loader size={16} style={{ animation: "spin 1s linear infinite" }} />
            Executing Payment...
          </>
        ) : (
          <>
            <Send size={16} />
            Execute Payment
          </>
        )}
      </button>

      {/* Result Display */}
      {result && (
        <div
          style={{
            marginTop: 16,
            padding: 12,
            borderRadius: 8,
            background: result.success
              ? `rgba(34, 197, 94, 0.1)`
              : `rgba(239, 68, 68, 0.1)`,
            borderLeft: `3px solid ${result.success ? colors.success : colors.error}`,
          }}
        >
          <div
            style={{
              color: result.success ? colors.success : colors.error,
              fontWeight: 600,
              fontSize: 13,
              marginBottom: 8,
            }}
          >
            {result.success ? "✓ Payment Successful" : "✗ Payment Failed"}
          </div>
          {result.success && result.data && (
            <div style={{ fontSize: 12, color: colors.text, lineHeight: 1.6 }}>
              <div>
                <strong>Transaction ID:</strong> {result.data.transaction_id}
              </div>
              <div>
                <strong>Squad Reference:</strong> {result.data.squad_reference}
              </div>
              <div>
                <strong>Audit Reference:</strong> {result.data.audit_reference}
              </div>
              <div>
                <strong>Timestamp:</strong> {result.data.timestamp}
              </div>
            </div>
          )}
          {!result.success && (
            <div style={{ fontSize: 12, color: colors.error }}>
              {result.message}
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </Card>
  );
}
