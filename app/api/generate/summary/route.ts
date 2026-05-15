import { NextResponse } from "next/server";

/**
 * PDF Summary Generation Endpoint
 * Generates a one-page A4 HTML that can be printed to PDF
 */

export async function GET() {
  try {
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Core-Connect Solution Summary</title>
  <style>
    @media print {
      body { margin: 0; padding: 0; }
      .container { margin: 0; padding: 15mm; }
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
      line-height: 1.4;
      color: #1a1a1a;
      background: #f5f5f5;
    }
    .container {
      width: 100%;
      max-width: 210mm;
      height: 297mm;
      padding: 15mm;
      background: white;
      margin: 0 auto;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      position: relative;
    }
    header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 10mm;
      border-bottom: 3px solid #e0185b;
      padding-bottom: 6mm;
    }
    .logo {
      font-weight: 800;
      font-size: 16pt;
      color: #e0185b;
      letter-spacing: 2px;
    }
    .subtitle {
      font-size: 8pt;
      color: #666;
      margin-top: 2mm;
      font-weight: 600;
    }
    .date {
      font-size: 9pt;
      color: #999;
      text-align: right;
    }
    section {
      margin-bottom: 7mm;
    }
    h2 {
      font-size: 10pt;
      font-weight: 700;
      color: #e0185b;
      margin-bottom: 3mm;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    p, li {
      font-size: 8.5pt;
      line-height: 1.35;
      color: #333;
      margin-bottom: 1.5mm;
    }
    .problem {
      background: #ffe0e8;
      padding: 6mm;
      border-left: 3px solid #e0185b;
      margin-bottom: 4mm;
      border-radius: 2mm;
      font-size: 8.5pt;
    }
    .solution {
      background: #e8f5e9;
      padding: 6mm;
      border-left: 3px solid #22c55e;
      margin-bottom: 4mm;
      border-radius: 2mm;
      font-size: 8.5pt;
    }
    .pillars {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4mm;
      margin-bottom: 4mm;
    }
    .pillar {
      background: #f9f9f9;
      padding: 5mm;
      border-radius: 2mm;
      font-size: 7.5pt;
      border-top: 2px solid #e0185b;
      line-height: 1.3;
    }
    .pillar-title {
      font-weight: 700;
      color: #e0185b;
      margin-bottom: 1.5mm;
      font-size: 8pt;
    }
    .apis {
      display: flex;
      flex-wrap: wrap;
      gap: 3mm;
      margin-bottom: 3mm;
    }
    .api-badge {
      background: #f0f0f0;
      padding: 1.5mm 3mm;
      border-radius: 2mm;
      font-size: 7pt;
      border: 1px solid #ddd;
      font-family: 'Courier New', monospace;
      font-weight: 600;
      color: #e0185b;
    }
    ul {
      margin-left: 4mm;
      padding-left: 0;
    }
    li {
      margin-bottom: 1mm;
      margin-left: 0;
    }
    .footer {
      font-size: 6.5pt;
      color: #999;
      border-top: 1px solid #eee;
      padding-top: 3mm;
      margin-top: 6mm;
      line-height: 1.4;
    }
    strong { font-weight: 700; color: #e0185b; }
    .feature-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3mm;
      font-size: 7.5pt;
    }
    .feature-item {
      background: #fafafa;
      padding: 3mm;
      border-radius: 2mm;
      border-left: 2px solid #22c55e;
    }
    @media print {
      body { background: white; }
      .container { box-shadow: none; margin: 0; max-width: 100%; }
      .print-hint { display: none; }
    }
    .print-hint {
      background: #fff3cd;
      border: 1px solid #ffc107;
      padding: 8px 12px;
      border-radius: 4px;
      font-size: 12px;
      margin-bottom: 15px;
      color: #856404;
    }
  </style>
</head>
<body>
  <div style="margin: 20px;">
    <div class="print-hint">
      💡 <strong>To save as PDF:</strong> Press Ctrl+P (or Cmd+P on Mac) → Select "Save as PDF" → Choose "A4" paper size
    </div>
  </div>

  <div class="container">
    <header>
      <div>
        <div class="logo">🛡️ CORE-CONNECT</div>
        <div class="subtitle">AI-Powered Employee Payroll Verification</div>
      </div>
      <div class="date">
        <div>May 2026</div>
        <div style="font-size: 7pt; margin-top: 2mm; color: #bbb;">Osun State Government</div>
      </div>
    </header>

    <section>
      <h2>The Problem</h2>
      <div class="problem">
        <strong>Government salary fraud costs Nigeria ₦50+ billion annually.</strong> Without proper verification, funds transfer to fraudulent identities, ghost employees, and sanctioned individuals—causing direct harm to legitimate employees and massive taxpayer waste.
      </div>
    </section>

    <section>
      <h2>The Solution</h2>
      <div class="solution">
        <strong>Core-Connect</strong> combines AI-driven verification signals with real payment infrastructure (Squad API) to flag high-risk employees <strong>before salary transfer executes</strong>. Multi-dimensional risk scoring prevents fraud at the source.
      </div>
    </section>

    <section>
      <h2>Four Pillars of Verification</h2>
      <div class="pillars">
        <div class="pillar">
          <div class="pillar-title">1️⃣ Identity</div>
          <p>BVN verification + Levenshtein distance name matching confirms authentic identity</p>
        </div>
        <div class="pillar">
          <div class="pillar-title">2️⃣ Financial</div>
          <p>Squad API /payout/account/lookup validates bank account holder matches identity</p>
        </div>
        <div class="pillar">
          <div class="pillar-title">3️⃣ Compliance</div>
          <p>OFAC/UN sanctions screening blocks payments to sanctioned & PEP individuals</p>
        </div>
        <div class="pillar">
          <div class="pillar-title">4️⃣ Risk Scoring</div>
          <p>AI engine combines behavioral, network, temporal data into Squad Trust Score (STS)</p>
        </div>
      </div>
    </section>

    <section>
      <h2>Squad APIs Used</h2>
      <div class="apis">
        <div class="api-badge">POST /payout/account/lookup</div>
        <div class="api-badge">POST /payout/transfer</div>
      </div>
      <p style="margin-top: 2mm;">
        <strong>Account Lookup:</strong> Verifies account name before payment<br/>
        <strong>Transfer:</strong> Executes verified salary transfer with audit trail
      </p>
    </section>

    <section>
      <h2>Key Features</h2>
      <div class="feature-grid">
        <div class="feature-item">✅ Real-time risk dashboard</div>
        <div class="feature-item">✅ STS scoring (0-1000)</div>
        <div class="feature-item">✅ 5-tier verdict system</div>
        <div class="feature-item">✅ Live payment execution</div>
        <div class="feature-item">✅ Document forensics (AI)</div>
        <div class="feature-item">✅ Immutable audit trail</div>
      </div>
    </section>

    <div class="footer">
      <strong>Status:</strong> MVP production-ready, scales to 1M+ employees<br/>
      <strong>Technology:</strong> Next.js 14, Squad API, OFAC/UN data, AI verification engine<br/>
      <strong>Contact:</strong> Osun State Government · 0x1337 team
    </div>
  </div>
</body>
</html>
    `;

    return new NextResponse(htmlContent, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Disposition": 'inline; filename="Core-Connect-Summary.html"',
      },
    });
  } catch (error) {
    console.error("Summary generation error:", error);
    return NextResponse.json(
      {
        success: false,
        message: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      },
      { status: 500 }
    );
  }
}

