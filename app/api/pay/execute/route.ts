import { NextRequest, NextResponse } from "next/server";

/**
 * Payment Execution Endpoint
 * Executes actual salary transfer via Squad API
 * Only proceeds if verification verdict is "EXECUTE"
 */

const SQUAD_API_KEY = process.env.SQUAD_SECRET_KEY;
const SQUAD_BASE_URL = "https://sandbox-api-d.squadco.com";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate required fields
    if (
      !body.account_number ||
      !body.bank_code ||
      !body.amount ||
      !body.employee_id ||
      body.verdict !== "EXECUTE"
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Missing required fields or verdict is not EXECUTE. Required: account_number, bank_code, amount, employee_id, verdict='EXECUTE'",
          data: null,
        },
        { status: 400 }
      );
    }

    // Generate audit reference with verdict and STS score
    const sts_score = body.sts_score || 0;
    const audit_ref = `Core-Connect-${body.verdict}|${sts_score}|${body.employee_id}|${Date.now()}`;

    // Call Squad's Transfer API
    const response = await fetch(`${SQUAD_BASE_URL}/payout/transfer`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SQUAD_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        account: body.account_number,
        bank_code: body.bank_code,
        amount: body.amount, // in kobo (smallest unit)
        ref: audit_ref,
        remark: body.remark || "Verified Payroll - Core-Connect",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: data.message || "Payment execution failed",
          data: {
            error_code: data.code,
            error_details: data.message,
            audit_ref,
          },
        },
        { status: response.status }
      );
    }

    // Return successful transfer
    return NextResponse.json(
      {
        success: true,
        message: "Payment executed successfully",
        data: {
          transaction_id: data.data?.id,
          squad_reference: data.data?.reference,
          audit_reference: audit_ref,
          amount: body.amount,
          account_number: body.account_number,
          employee_id: body.employee_id,
          status: "completed",
          timestamp: new Date().toISOString(),
          employee_name: body.employee_name,
          verdict: body.verdict,
          sts_score: sts_score,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Payment execution error:", error);
    return NextResponse.json(
      {
        success: false,
        message: `Payment error: ${error instanceof Error ? error.message : "Unknown error"}`,
        data: null,
      },
      { status: 500 }
    );
  }
}
