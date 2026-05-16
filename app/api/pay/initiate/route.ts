import { NextRequest, NextResponse } from "next/server";

/**
 * Payment Initiation Endpoint
 * Initiates a transaction via Squad's /transaction/initiate API
 * Returns transaction reference for subsequent payment execution
 */

const SQUAD_API_KEY = process.env.SQUAD_SECRET_KEY;
const SQUAD_BASE_URL = "https://sandbox-api-d.squadco.com";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate required fields
    if (
      !body.amount ||
      !body.employee_email
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields. Required: amount, employee_email",
          data: null,
        },
        { status: 400 }
      );
    }

    // Generate key for transaction reference
    const sts_score = body.sts_score || 0;
    const key = `Core-Connect-${body.verdict || "PENDING"}|${sts_score}|${body.employee_id}|${Date.now()}`;

    // Call Squad's Transaction Initiate API
    const response = await fetch(
      `${SQUAD_BASE_URL}/transaction/initiate`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${SQUAD_API_KEY || ""}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: body.amount,
          email: body.employee_email,
          key: key,
          currency: "NGN",
          initiate_type: "inline",
          CallBack_URL: process.env.CALLBACK_URL || "https://core-connect.local/callback",
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Squad API Error:", {
        status: response.status,
        message: data.message,
        error: data.error || data.message,
        fullResponse: data,
      });

      return NextResponse.json(
        {
          success: false,
          message: data.message || data.error || "Transaction initiation failed",
          data: {
            error_code: data.code || data.status,
            error_details: data.message || data.error || JSON.stringify(data),
            transaction_key: key,
            debug: {
              statusCode: response.status,
              responseBody: data,
            },
          },
        },
        { status: response.status }
      );
    }

    // Return transaction reference for subsequent execution
    return NextResponse.json(
      {
        success: true,
        message: "Transaction initiated successfully",
        data: {
          transaction_reference: data.data?.reference || data.data?.transaction_ref,
          transaction_id: data.data?.transaction_id || data.data?.id,
          transaction_key: key,
          amount: body.amount,
          email: body.employee_email,
          employee_id: body.employee_id,
          employee_name: body.employee_name,
          status: "initiated",
          timestamp: new Date().toISOString(),
          verdict: body.verdict || "PENDING",
          sts_score: sts_score,
          checkout_url: data.data?.checkout_url,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Transaction initiation error:", error);
    return NextResponse.json(
      {
        success: false,
        message: `Initiation error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        data: null,
      },
      { status: 500 }
    );
  }
}
