import { NextRequest, NextResponse } from "next/server";

/**
 * REFACTORED: This endpoint now handles BANK ACCOUNT VERIFICATION
 * (not BVN verification - Squad doesn't provide BVN endpoints)
 * 
 * This proxies to Squad's Account Lookup API
 * Endpoint: POST /api/verify/bvn (legacy name, but actually bank verification)
 */

const SQUAD_API_KEY = process.env.SQUAD_SECRET_KEY;
const SQUAD_BASE_URL = "https://sandbox-api-d.squadco.com";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate required fields
    if (!body.account_number || !body.bank_code) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields: account_number, bank_code",
          data: null,
        },
        { status: 400 }
      );
    }

    // Call Squad's Account Lookup API
    const response = await fetch(`${SQUAD_BASE_URL}/payout/account/lookup`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SQUAD_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        account_number: body.account_number,
        bank_code: body.bank_code,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: data.message || "Bank account verification failed",
          data: null,
        },
        { status: response.status }
      );
    }

    // Return successful verification
    return NextResponse.json(
      {
        success: true,
        message: "Bank account verified",
        data: {
          account_name: data.data?.account_name,
          account_number: data.data?.account_number,
          verified: true,
          verification_timestamp: new Date().toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Bank account verification error:", error);
    return NextResponse.json(
      {
        success: false,
        message: `Verification error: ${error instanceof Error ? error.message : "Unknown error"}`,
        data: null,
      },
      { status: 500 }
    );
  }
}