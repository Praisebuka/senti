/**
 * SQUAD API REFACTORED FOR REAL ENDPOINTS ONLY
 * Squad is a payment gateway, NOT an identity verification service
 * This file only implements endpoints that actually exist in Squad's API
 */

const SQUAD_API_KEY = process.env.SQUAD_SECRET_KEY || "sandbox_sk_756c60d1310ebad20425ba78dd69c2c2c45b1e1f36d2";
const SQUAD_BASE_URL = "https://sandbox-api-d.squadco.com"; // Updated: Real Squad endpoint

/**
 * REAL SQUAD API: Account Lookup
 * Verifies bank account details (account name, number, bank code)
 */
export interface AccountLookupResult {
  status: number;
  success: boolean;
  message: string;
  data?: {
    account_name: string;
    account_number: string;
  };
  error?: string;
}

/**
 * REAL SQUAD API: Transfer Result
 * Transfer funds from Squad wallet to employee bank account
 */
export interface TransferResult {
  status: number;
  success: boolean;
  message: string;
  data?: {
    transaction_reference: string;
    response_description: string;
    currency_id: string;
    amount: string;
    nip_transaction_reference: string;
    account_number: string;
    account_name: string;
    destination_institution_name: string;
  };
  error?: string;
}

/**
 * DOCUMENT VERIFICATION RESULT
 * Real credential/document verification (not from Squad, but real documents uploaded by user)
 */
export interface DocumentVerificationResult {
  status: "pending" | "verified" | "rejected";
  document_type: string;
  confidence_score: number; // 0-100
  verification_date: string;
  verified_by: string; // "manual_review" | "ai_check" | "authority_lookup"
  issues: string[];
  metadata: {
    document_id: string;
    upload_date: string;
    file_hash: string;
  };
}

/**
 * EMPLOYEE VERIFICATION PROFILE
 * Comprehensive verification status combining document + bank verification
 */
export interface EmployeeVerificationProfile {
  employee_id: string;
  overall_status: "pending" | "verified" | "suspended" | "rejected";
  verification_score: number; // 0-100
  verification_date?: string;
  components: {
    document_verification: DocumentVerificationResult | null;
    bank_account_verification: AccountLookupResult | null;
    identity_confirmation: boolean;
  };
  flags: string[];
  audit_trail: Array<{
    action: string;
    timestamp: string;
    verified_by: string;
  }>;
}

/**
 * REAL SQUAD API: Account Lookup
 * Verify bank account holder name before processing payments
 * Endpoint: POST /payout/account/lookup
 */
export async function verifyBankAccount(
  accountNumber: string,
  bankCode: string
): Promise<AccountLookupResult> {
  try {
    const response = await fetch(`${SQUAD_BASE_URL}/payout/account/lookup`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${SQUAD_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        account_number: accountNumber,
        bank_code: bankCode,
      }),
    });

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      throw new Error(data.message || "Account lookup failed");
    }

    return {
      status: response.status,
      success: data.success,
      message: data.message,
      data: data.data,
    };
  } catch (error) {
    return {
      status: 0,
      success: false,
      message: `Account verification error: ${error instanceof Error ? error.message : "Unknown error"}`,
      error: String(error),
    };
  }
}


/**
 * DOCUMENT VERIFICATION
 * Verify employee documents locally (no Squad endpoint for this)
 * Implementation: Check file integrity, OCR consistency, authority lookup
 */
export async function verifyEmployeeDocument(
  documentType: string, // "bvn_copy", "payslip", "certificate", "id_card"
  fileHash: string // SHA256 hash of file for integrity
): Promise<DocumentVerificationResult> {
  try {
    // In a real system, this would:
    // 1. Check file integrity against database
    // 2. Run OCR/extraction
    // 3. Cross-reference with authority databases (if available)
    // 4. Flag suspicious patterns

    return {
      status: "pending",
      document_type: documentType,
      confidence_score: 0,
      verification_date: new Date().toISOString(),
      verified_by: "manual_review",
      issues: [],
      metadata: {
        document_id: `DOC_${Date.now()}`,
        upload_date: new Date().toISOString(),
        file_hash: fileHash,
      },
    };
  } catch (error) {
    return {
      status: "rejected",
      document_type: documentType,
      confidence_score: 0,
      verification_date: new Date().toISOString(),
      verified_by: "error",
      issues: [`Document verification failed: ${error}`],
      metadata: {
        document_id: "",
        upload_date: new Date().toISOString(),
        file_hash: fileHash,
      },
    };
  }
}

/**
 * CREATE EMPLOYEE VERIFICATION PROFILE
 * Combine bank verification + document verification
 */
export async function createEmployeeVerificationProfile(
  employeeId: string,
  bankAccountNumber: string,
  bankCode: string,
  documentHash?: string
): Promise<EmployeeVerificationProfile> {
  try {
    // Verify bank account first
    const bankVerification = await verifyBankAccount(bankAccountNumber, bankCode);

    // Verify documents if provided
    const documentVerification = documentHash ? await verifyEmployeeDocument("bvn_copy", `${employeeId}_bvn.pdf`) : null;
    // const documentVerification = documentHash ? await verifyEmployeeDocument("bvn_copy", `${employeeId}_bvn.pdf`, documentHash) : null;

    // Calculate verification score
    let score = 0;
    let issues: string[] = [];

    if (bankVerification.success && bankVerification.data) {
      score += 50; // Bank verification passed
    } else {
      issues.push("Bank account verification failed");
    }

    if (documentVerification?.status === "verified") {
      score += 50;
    } else if (documentVerification) {
      issues.push("Document verification pending or failed");
    }

    const overallStatus =
      score >= 80 ? "verified" : score >= 50 ? "pending" : "rejected";

    return {
      employee_id: employeeId,
      overall_status: overallStatus,
      verification_score: score,
      verification_date: new Date().toISOString(),
      components: {
        document_verification: documentVerification,
        bank_account_verification: bankVerification,
        identity_confirmation: bankVerification.success || false,
      },
      flags: issues,
      audit_trail: [
        {
          action: "profile_created",
          timestamp: new Date().toISOString(),
          verified_by: "system",
        },
      ],
    };
  } catch (error) {
    return {
      employee_id: employeeId,
      overall_status: "rejected",
      verification_score: 0,
      components: {
        document_verification: null,
        bank_account_verification: null,
        identity_confirmation: false,
      },
      flags: [`Verification error: ${error}`],
      audit_trail: [
        {
          action: "profile_creation_failed",
          timestamp: new Date().toISOString(),
          verified_by: "system",
        },
      ],
    };
  }
}


// ============ HELPER FUNCTIONS ============

/**
 * Validate Nigerian phone number format
 */
export function isValidNigerianPhone(phone: string): boolean {
  const pattern = /^(\+234|0)[789]\d{9}$/;
  return pattern.test(phone.replace(/\s/g, ""));
}

/**
 * Validate Nigerian bank account number
 * All Nigerian accounts are 10 digits (NUBAN)
 */
export function isValidNUBAN(accountNumber: string): boolean {
  return /^\d{10}$/.test(accountNumber.replace(/\s/g, ""));
}

/**
 * Calculate name similarity for verification
 */
// function calculateNameSimilarity(name1: string, name2: string): number {
//   const n1 = name1.toLowerCase().trim();
//   const n2 = name2.toLowerCase().trim();

//   if (n1 === n2) return 1;

//   const longer = n1.length > n2.length ? n1 : n2;
//   const shorter = n1.length > n2.length ? n2 : n1;

//   if (longer.length === 0) return 1;

//   const editDistance = getEditDistance(longer, shorter);
//   return (longer.length - editDistance) / longer.length;
// }

/**
 * Levenshtein distance calculation for string comparison
 */
// function getEditDistance(s1: string, s2: string): number {
//   const costs: Record<number, number> = {};
//   for (let i = 0; i <= s1.length; i++) {
//     let lastValue = i;
//     for (let j = 0; j <= s2.length; j++) {
//       if (i === 0) {
//         costs[j] = j;
//       } else if (j > 0) {
//         let newValue = costs[j - 1];
//         if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
//           newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
//         }
//         costs[j - 1] = lastValue;
//         lastValue = newValue;
//       }
//     }
//     if (i > 0) costs[s2.length] = lastValue;
//   }
//   return costs[s2.length];
// }
