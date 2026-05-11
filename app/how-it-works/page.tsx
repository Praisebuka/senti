"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { colors } from "@/constants/colors";
import {
  ArrowLeft,
  Upload,
  Search,
  CheckCircle,
  Lock,
  Database,
  Shield,
  Zap,
  BarChart3,
  Users,
  Clock,
  AlertCircle,
} from "lucide-react";

export default function HowItWorksPage() {
  const router = useRouter();
  const [expandedStep, setExpandedStep] = useState<number | null>(0);

  const steps = [
    {
      number: 1,
      title: "Upload Data",
      description: "Submit your employee data or payroll information",
      details:
        "Simply upload your CSV, JSON, or connect via API. We accept employee lists, payroll data, or credential information. All data is encrypted and processed securely.",
      icon: Upload,
      color: colors.primary,
    },
    {
      number: 2,
      title: "Data Validation",
      description: "Our system validates and structures the information",
      details:
        "We normalize your data, check for inconsistencies, and flag potential issues. This ensures clean data before verification begins.",
      icon: Database,
      color: colors.info,
    },
    {
      number: 3,
      title: "Multi-Stage Verification",
      description: "AI and forensic analysis verify credentials",
      details:
        "We cross-reference with national databases, conduct facial recognition, check employment history, and verify qualifications. Multiple verification layers ensure accuracy.",
      icon: Search,
      color: colors.warning,
    },
    {
      number: 4,
      title: "Risk Assessment",
      description: "Identify high-risk profiles and anomalies",
      details:
        "Our AI flags suspicious patterns, duplicates, or fraudulent indicators. You get a risk score for each employee to make informed decisions.",
      icon: AlertCircle,
      color: colors.error,
    },
    {
      number: 5,
      title: "Squad Integration",
      description: "Sync verified data with your Squad account",
      details:
        "Automatically update your payroll system with verification results. Maintain real-time sync with your Squad account for ongoing compliance.",
      icon: Zap,
      color: colors.success,
    },
    {
      number: 6,
      title: "Generate Reports",
      description: "Access detailed compliance reports",
      details:
        "Download comprehensive reports, audit trails, and compliance documentation for regulatory purposes and internal auditing.",
      icon: BarChart3,
      color: colors.purple,
    },
  ];

  const features = [
    {
      icon: Lock,
      title: "Bank-Grade Security",
      description: "Enterprise-level encryption and compliance with international standards",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Average verification time under 2 seconds per employee",
    },
    {
      icon: Shield,
      title: "99.8% Accuracy",
      description: "Multi-stage verification ensures reliable results",
    },
    {
      icon: Users,
      title: "Batch Processing",
      description: "Verify hundreds or thousands of employees simultaneously",
    },
  ];

  const integrations = [
    {
      title: "Squad Payroll",
      description: "Direct integration with Squad for payroll verification",
      status: "Available",
    },
    {
      title: "CSV/Excel Upload",
      description: "Easy bulk upload for any data format",
      status: "Available",
    },
    {
      title: "REST API",
      description: "Custom API integration for your systems",
      status: "Available",
    },
    {
      title: "Webhooks",
      description: "Real-time event notifications for verification updates",
      status: "Coming Soon",
    },
  ];

  return (
    <div
      style={{
        background: colors.bg,
        color: colors.text,
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Animated Background */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-50%",
            left: "-50%",
            width: "200%",
            height: "200%",
            background: `radial-gradient(circle at 20% 50%, ${colors.primary}15, transparent 50%),
                         radial-gradient(circle at 80% 80%, ${colors.purple}15, transparent 50%)`,
            animation: "float 20s ease-in-out infinite",
          }}
        />
        <style>{`
          @keyframes float {
            0%, 100% { transform: translate(0px, 0px); }
            50% { transform: translate(30px, -30px); }
          }
        `}</style>
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: `1px solid ${colors.surface}`,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <button
            onClick={() => router.back()}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "transparent",
              border: `1px solid ${colors.surface}`,
              color: colors.text,
              padding: "8px 12px",
              borderRadius: 6,
              cursor: "pointer",
              fontSize: 14,
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = colors.surface;
              e.currentTarget.style.borderColor = colors.primary;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = colors.surface;
            }}
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <h1 style={{ fontSize: 24, fontWeight: 600, margin: 0, flex: 1 }}>
            How It Works
          </h1>
        </div>

        {/* Main Content */}
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 24px" }}>
          {/* Overview Section */}
          <div
            style={{
              marginBottom: 80,
              padding: 40,
              background: `linear-gradient(135deg, ${colors.primary}10, ${colors.purple}10)`,
              borderRadius: 16,
              border: `1px solid ${colors.surface}`,
            }}
          >
            <h2
              style={{
                fontSize: 32,
                fontWeight: 700,
                marginBottom: 16,
                background: colors.gradient,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              The Core Connect Process
            </h2>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.8,
                color: colors.textSecondary,
                margin: 0,
                maxWidth: 800,
              }}
            >
              From data upload to verified reports, we guide you through a seamless
              6-step process that ensures your workforce is compliant, legitimate,
              and verified.
            </p>
          </div>

          {/* Steps Section */}
          <div style={{ marginBottom: 80 }}>
            <h2
              style={{
                fontSize: 28,
                fontWeight: 700,
                marginBottom: 40,
                textAlign: "center",
              }}
            >
              Verification Steps
            </h2>
            <div style={{ maxWidth: 800, margin: "0 auto" }}>
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  style={{
                    marginBottom: 16,
                    border: `1px solid ${
                      expandedStep === idx ? step.color : colors.surface
                    }`,
                    borderRadius: 12,
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    background:
                      expandedStep === idx
                        ? `${step.color}10`
                        : colors.surface,
                  }}
                  onClick={() =>
                    setExpandedStep(expandedStep === idx ? null : idx)
                  }
                >
                  <div
                    style={{
                      padding: 20,
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        background: step.color + "20",
                      }}
                    >
                      <step.icon size={24} color={step.color} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          marginBottom: 4,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 12,
                            fontWeight: 700,
                            color: step.color,
                            textTransform: "uppercase",
                            letterSpacing: 1,
                          }}
                        >
                          Step {step.number}
                        </span>
                      </div>
                      <h3
                        style={{
                          fontSize: 16,
                          fontWeight: 600,
                          margin: 0,
                        }}
                      >
                        {step.title}
                      </h3>
                      <p
                        style={{
                          fontSize: 13,
                          color: colors.textSecondary,
                          margin: "4px 0 0 0",
                        }}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                  {expandedStep === idx && (
                    <div
                      style={{
                        padding: "0 20px 20px 20px",
                        borderTop: `1px solid ${step.color}20`,
                        color: colors.textSecondary,
                        lineHeight: 1.6,
                      }}
                    >
                      {step.details}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div style={{ marginBottom: 80 }}>
            <h2
              style={{
                fontSize: 28,
                fontWeight: 700,
                marginBottom: 40,
                textAlign: "center",
              }}
            >
              Why Choose Core Connect?
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: 24,
              }}
            >
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: 24,
                    background: colors.surface,
                    borderRadius: 12,
                    border: `1px solid ${colors.surface}`,
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: 16,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        background: `${colors.primary}15`,
                      }}
                    >
                      <feature.icon size={24} color={colors.primary} />
                    </div>
                  </div>
                  <h3
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      marginBottom: 8,
                      margin: "0 0 8px 0",
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 13,
                      color: colors.textSecondary,
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Integration Options */}
          <div style={{ marginBottom: 80 }}>
            <h2
              style={{
                fontSize: 28,
                fontWeight: 700,
                marginBottom: 40,
                textAlign: "center",
              }}
            >
              Integration Options
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 24,
              }}
            >
              {integrations.map((integration, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: 24,
                    background: colors.surface,
                    borderRadius: 12,
                    border: `1px solid ${colors.surface}`,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: 12,
                    }}
                  >
                    <h3
                      style={{
                        fontSize: 16,
                        fontWeight: 600,
                        margin: 0,
                      }}
                    >
                      {integration.title}
                    </h3>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        padding: "4px 8px",
                        borderRadius: 4,
                        background:
                          integration.status === "Available"
                            ? `${colors.success}20`
                            : `${colors.warning}20`,
                        color:
                          integration.status === "Available"
                            ? colors.success
                            : colors.warning,
                        textTransform: "uppercase",
                      }}
                    >
                      {integration.status}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: 13,
                      color: colors.textSecondary,
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {integration.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div
            style={{
              textAlign: "center",
              padding: 40,
              background: colors.gradient,
              borderRadius: 16,
            }}
          >
            <h2
              style={{
                fontSize: 24,
                fontWeight: 700,
                marginBottom: 16,
                color: "white",
              }}
            >
              Ready to Get Started?
            </h2>
            <p
              style={{
                fontSize: 16,
                color: "rgba(255, 255, 255, 0.9)",
                marginBottom: 24,
              }}
            >
              Join companies across Africa using Core Connect for verification
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <Link
                href="/login"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px 24px",
                  background: "white",
                  color: colors.primary,
                  textDecoration: "none",
                  borderRadius: 8,
                  fontWeight: 600,
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Start Verifying
              </Link>
              <Link
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px 24px",
                  background: "rgba(255, 255, 255, 0.2)",
                  color: "white",
                  textDecoration: "none",
                  borderRadius: 8,
                  fontWeight: 600,
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
                }}
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
