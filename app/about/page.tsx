"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { colors } from "@/constants/colors";
import {
  ArrowLeft,
  Target,
  Users,
  Lightbulb,
  Award,
} from "lucide-react";

export default function AboutPage() {
  const router = useRouter();

  const values = [
    {
      icon: Target,
      title: "Accuracy First",
      description:
        "We prioritize accuracy in every verification, ensuring reliable results for our partners",
    },
    {
      icon: Users,
      title: "User-Centric",
      description:
        "Simple, intuitive interfaces that respect user time and privacy",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "Continuously improving our technology to stay ahead of fraudsters",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "Committed to the highest standards in fintech security and compliance",
    },
  ];

  const milestones = [
    {
      year: "2023",
      title: "Founded",
      description: "Core Connect started with a mission to revolutionize employee verification",
    },
    {
      year: "2024",
      title: "Squad Integration",
      description:
        "Partnered with Squad to bring seamless payroll verification to fintech companies",
    },
    {
      year: "2025",
      title: "Scale & Growth",
      description: "Now verifying 50+ companies with 99.8% accuracy across Africa",
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
            About Core Connect
          </h1>
        </div>

        {/* Main Content */}
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 24px" }}>
          {/* Mission Section */}
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
              Our Mission
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
              We empower fintech companies and enterprises to verify their workforce
              with unmatched accuracy and speed. Core Connect bridges the gap between
              payroll systems and trust, ensuring every employee on your roster is
              verified, legitimate, and compliant with global standards.
            </p>
          </div>

          {/* Values Section */}
          <div style={{ marginBottom: 80 }}>
            <h2
              style={{
                fontSize: 28,
                fontWeight: 700,
                marginBottom: 40,
                textAlign: "center",
              }}
            >
              Our Values
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: 24,
              }}
            >
              {values.map((value, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: 24,
                    background: colors.surface,
                    borderRadius: 12,
                    border: `1px solid ${colors.surface}`,
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.borderColor = colors.primary;
                    e.currentTarget.style.boxShadow = `0 8px 24px ${colors.primary}20`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor = colors.surface;
                    e.currentTarget.style.boxShadow = "none";
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
                      marginBottom: 16,
                    }}
                  >
                    <value.icon size={24} color={colors.primary} />
                  </div>
                  <h3
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      marginBottom: 8,
                      margin: "0 0 8px 0",
                    }}
                  >
                    {value.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 14,
                      color: colors.textSecondary,
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline Section */}
          <div style={{ marginBottom: 80 }}>
            <h2
              style={{
                fontSize: 28,
                fontWeight: 700,
                marginBottom: 40,
                textAlign: "center",
              }}
            >
              Our Journey
            </h2>
            <div
              style={{
                position: "relative",
                paddingLeft: 40,
              }}
            >
              {milestones.map((milestone, idx) => (
                <div
                  key={idx}
                  style={{
                    marginBottom: idx < milestones.length - 1 ? 40 : 0,
                    position: "relative",
                    paddingLeft: 40,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: -40,
                      top: 0,
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      background: colors.gradient,
                      border: `3px solid ${colors.surface}`,
                    }}
                  />
                  {idx < milestones.length - 1 && (
                    <div
                      style={{
                        position: "absolute",
                        left: -31,
                        top: 16,
                        width: 2,
                        height: 60,
                        background: colors.surface,
                      }}
                    />
                  )}
                  <div
                    style={{
                      padding: 20,
                      background: colors.surface,
                      borderRadius: 12,
                      border: `1px solid ${colors.surface}`,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: colors.primary,
                        textTransform: "uppercase",
                        letterSpacing: 1,
                        marginBottom: 8,
                      }}
                    >
                      {milestone.year}
                    </div>
                    <h3
                      style={{
                        fontSize: 18,
                        fontWeight: 600,
                        marginBottom: 8,
                        margin: "0 0 8px 0",
                      }}
                    >
                      {milestone.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 14,
                        color: colors.textSecondary,
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {milestone.description}
                    </p>
                  </div>
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
              Ready to Connect?
            </h2>
            <p
              style={{
                fontSize: 16,
                color: "rgba(255, 255, 255, 0.9)",
                marginBottom: 24,
              }}
            >
              Join hundreds of companies trusting Core Connect for verification
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <Link
                href="/contact"
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
                Contact Us
              </Link>
              <Link
                href="/dashboard"
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
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
