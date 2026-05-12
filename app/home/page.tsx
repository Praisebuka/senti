"use client";

import React, { useState } from "react";
import Link from "next/link";
import { colors } from "@/constants/colors";
import {
  ArrowRight,
  CheckCircle,
  Shield,
  Zap,
  Lightbulb,
  Lock,
  TrendingUp,
  Play,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";

export default function LandingPage() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    {
      icon: Shield,
      title: "Smart Verification",
      description: "AI-powered credential verification with multi-stage forensics",
      color: colors.primary,
      gradient: "linear-gradient(135deg, rgba(224, 24, 91, 0.1), rgba(224, 24, 91, 0.05))",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Real-time employee authentication and risk assessment",
      color: colors.info,
      gradient: "linear-gradient(135deg, rgba(77, 158, 255, 0.1), rgba(77, 158, 255, 0.05))",
    },
    {
      icon: CheckCircle,
      title: "Squad Trusted",
      description: "Integrated payroll verification for fintech companies",
      color: colors.success,
      gradient: "linear-gradient(135deg, rgba(0, 195, 116, 0.1), rgba(0, 195, 116, 0.05))",
    },
    {
      icon: Lock,
      title: "Enterprise Security",
      description: "Bank-grade encryption and compliance with global standards",
      color: colors.purple,
      gradient: "linear-gradient(135deg, rgba(162, 89, 255, 0.1), rgba(162, 89, 255, 0.05))",
    },
  ];

  const stats = [
    { number: "10K+", label: "Employees Verified" },
    { number: "99.8%", label: "Accuracy Rate" },
    { number: "<2s", label: "Verification Time" },
    { number: "50+", label: "Companies Trust Us" },
  ];

  const useCases = [
    {
      title: "Payroll Compliance",
      description: "Ensure every employee in your payroll system is verified and legitimate",
      icon: TrendingUp,
    },
    {
      title: "Credential Validation",
      description: "Validate qualifications, certifications, and professional credentials",
      icon: CheckCircle,
    },
    {
      title: "Risk Assessment",
      description: "Identify and flag high-risk profiles with advanced forensics",
      icon: Lightbulb,
    },
  ];

  return (
    <div style={{ background: colors.bg, color: colors.text, overflow: "hidden" }}>
      {/* Animated Background Elements */}
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
            background:
              "radial-gradient(circle at 20% 30%, rgba(224, 24, 91, 0.15) 0%, transparent 50%)",
            animation: "float 20s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "-50%",
            right: "-50%",
            width: "200%",
            height: "200%",
            background:
              "radial-gradient(circle at 80% 70%, rgba(162, 89, 255, 0.1) 0%, transparent 50%)",
            animation: "float 25s ease-in-out infinite",
            animationDelay: "-5s",
          }}
        />
      </div>

      {/* Content Wrapper */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Navigation */}
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "24px 48px",
            borderBottom: `1px solid ${colors.border}`,
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(10, 14, 39, 0.7)",
            position: "sticky",
            top: 0,
            zIndex: 100,
            animation: "slideInDown 0.6s ease-out",
          }}
        >
          <Link href="/" style={{ textDecoration: "none" }}>
            <div
              style={{
                fontSize: "24px",
                fontWeight: "800",
                background: colors.gradient,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-0.5px",
                cursor: "pointer",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.target as any).style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                (e.target as any).style.transform = "scale(1)";
              }}
            >
              🛡️ CORE CONNECT
            </div>
          </Link>

          <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
            <a
              href="#features"
              style={{
                color: colors.text,
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "500",
                transition: "color 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = colors.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = colors.text;
              }}
            >
              Features
            </a>
            <Link
              href="/how-it-works"
              style={{
                color: colors.text,
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "500",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = colors.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = colors.text;
              }}
            >
              How It Works
            </Link>
            <Link
              href="/about"
              style={{
                color: colors.text,
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "500",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = colors.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = colors.text;
              }}
            >
              About
            </Link>
            <Link
              href="/contact"
              style={{
                color: colors.text,
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "500",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = colors.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = colors.text;
              }}
            >
              Contact
            </Link>

            <Link href="/login" style={{ textDecoration: "none" }}>
              <button
                style={{
                  padding: "10px 24px",
                  background: colors.primary,
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: `0 4px 15px rgba(224, 24, 91, 0.3)`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = `0 8px 25px rgba(224, 24, 91, 0.5)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = `0 4px 15px rgba(224, 24, 91, 0.3)`;
                }}
              >
                Login
                <ArrowRight size={16} />
              </button>
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "80px 48px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Hero Background Decoration */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "800px",
              height: "800px",
              background: `radial-gradient(circle, rgba(224, 24, 91, 0.1) 0%, transparent 70%)`,
              borderRadius: "50%",
              filter: "blur(40px)",
              animation: "pulse 4s ease-in-out infinite",
            }}
          />

          <div style={{ position: "relative", zIndex: 2, maxWidth: "900px" }}>
            {/* Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 16px",
                background: `rgba(224, 24, 91, 0.1)`,
                border: `1px solid ${colors.primary}`,
                borderRadius: "24px",
                marginBottom: "24px",
                animation: "slideInDown 0.6s ease-out",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  background: colors.primary,
                  borderRadius: "50%",
                  animation: "pulse 2s ease-in-out infinite",
                }}
              />
              <span style={{ fontSize: "12px", fontWeight: "600", color: colors.primary }}>
                Enterprise-Grade Verification
              </span>
            </div>

            {/* Main Headline */}
            <h1
              style={{
                fontSize: "72px",
                fontWeight: "800",
                lineHeight: "1.2",
                margin: "24px 0",
                animation: "slideInUp 0.8s ease-out",
                letterSpacing: "-1px",
              }}
            >
              Verify Every
              <br />
              <span style={{ background: colors.gradient, backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Employee in Seconds
              </span>
            </h1>

            {/* Subheading */}
            <p
              style={{
                fontSize: "18px",
                color: colors.textSecondary,
                lineHeight: "1.6",
                margin: "24px 0",
                maxWidth: "600px",
                marginLeft: "auto",
                marginRight: "auto",
                animation: "slideInUp 1s ease-out",
              }}
            >
              Enterprise-grade credential verification with AI-powered forensics. Ensure compliance, prevent fraud, and build trust in your payroll system.
            </p>

            {/* CTA Buttons */}
            <div
              style={{
                display: "flex",
                gap: "16px",
                justifyContent: "center",
                margin: "40px 0",
                animation: "slideInUp 1.2s ease-out",
                flexWrap: "wrap",
              }}
            >
              <Link href="/register" style={{ textDecoration: "none" }}>
                <button
                  style={{
                    padding: "16px 32px",
                    background: colors.gradient,
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    fontSize: "16px",
                    fontWeight: "700",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    boxShadow: `0 8px 30px rgba(224, 24, 91, 0.3)`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = `0 12px 40px rgba(224, 24, 91, 0.5)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = `0 8px 30px rgba(224, 24, 91, 0.3)`;
                  }}
                >
                  Get Started Free
                  <ArrowRight size={18} />
                </button>
              </Link>

              <button
                style={{
                  padding: "16px 32px",
                  background: `rgba(224, 24, 91, 0.1)`,
                  color: colors.primary,
                  border: `2px solid ${colors.primary}`,
                  borderRadius: "10px",
                  fontSize: "16px",
                  fontWeight: "700",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `rgba(224, 24, 91, 0.2)`;
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = `rgba(224, 24, 91, 0.1)`;
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <Play size={18} />
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "40px",
                margin: "80px 0",
                animation: "slideInUp 1.4s ease-out",
              }}
            >
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  style={{
                    textAlign: "center",
                    animation: `slideInUp ${0.8 + idx * 0.1}s ease-out`,
                  }}
                >
                  <div
                    style={{
                      fontSize: "32px",
                      fontWeight: "800",
                      background: colors.gradient,
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      marginBottom: "8px",
                    }}
                  >
                    {stat.number}
                  </div>
                  <div style={{ fontSize: "14px", color: colors.textSecondary }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          style={{
            padding: "100px 48px",
            background: `linear-gradient(180deg, transparent 0%, rgba(224, 24, 91, 0.03) 100%)`,
            borderTop: `1px solid ${colors.border}`,
            borderBottom: `1px solid ${colors.border}`,
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "80px" }}>
              <h2
                style={{
                  fontSize: "48px",
                  fontWeight: "800",
                  margin: "0 0 16px 0",
                  animation: "slideInUp 0.6s ease-out",
                }}
              >
                Powerful Features
              </h2>
              <p
                style={{
                  fontSize: "18px",
                  color: colors.textSecondary,
                  margin: 0,
                  animation: "slideInUp 0.8s ease-out",
                }}
              >
                Everything you need to verify employees at scale
              </p>
            </div>

            {/* Features Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "24px",
              }}
            >
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={idx}
                    style={{
                      padding: "32px",
                      background: feature.gradient,
                      border: `1px solid rgba(42, 58, 106, 0.5)`,
                      borderRadius: "12px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      animation: `slideInUp ${0.6 + idx * 0.1}s ease-out`,
                      backdropFilter: "blur(10px)",
                    }}
                    onMouseEnter={(e) => {
                      setHoveredFeature(idx);
                      e.currentTarget.style.transform = "translateY(-8px)";
                      e.currentTarget.style.borderColor = feature.color;
                      e.currentTarget.style.boxShadow = `0 20px 40px rgba(224, 24, 91, 0.2)`;
                    }}
                    onMouseLeave={(e) => {
                      setHoveredFeature(null);
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.borderColor = "rgba(42, 58, 106, 0.5)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <div
                      style={{
                        width: "56px",
                        height: "56px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: `rgba(224, 24, 91, 0.1)`,
                        borderRadius: "10px",
                        marginBottom: "20px",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <Icon size={28} style={{ color: feature.color }} />
                    </div>

                    <h3
                      style={{
                        fontSize: "18px",
                        fontWeight: "700",
                        margin: "0 0 12px 0",
                        color: colors.text,
                      }}
                    >
                      {feature.title}
                    </h3>

                    <p
                      style={{
                        fontSize: "14px",
                        color: colors.textSecondary,
                        margin: 0,
                        lineHeight: "1.6",
                      }}
                    >
                      {feature.description}
                    </p>

                    {hoveredFeature === idx && (
                      <div
                        style={{
                          marginTop: "16px",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          color: feature.color,
                          fontSize: "14px",
                          fontWeight: "600",
                          animation: "slideInRight 0.3s ease-out",
                        }}
                      >
                        Learn more
                        <ArrowRight size={16} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section style={{ padding: "100px 48px", borderBottom: `1px solid ${colors.border}` }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "80px" }}>
              <h2
                style={{
                  fontSize: "48px",
                  fontWeight: "800",
                  margin: "0 0 16px 0",
                  animation: "slideInUp 0.6s ease-out",
                }}
              >
                Built for Your Use Case
              </h2>
              <p
                style={{
                  fontSize: "18px",
                  color: colors.textSecondary,
                  margin: 0,
                  animation: "slideInUp 0.8s ease-out",
                }}
              >
                Tailor verification to your specific needs
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px" }}>
              {useCases.map((useCase, idx) => {
                const Icon = useCase.icon;
                return (
                  <div
                    key={idx}
                    style={{
                      padding: "32px",
                      background: `rgba(20, 27, 61, 0.5)`,
                      border: `1px solid ${colors.border}`,
                      borderRadius: "12px",
                      transition: "all 0.3s ease",
                      animation: `slideInUp ${0.6 + idx * 0.1}s ease-out`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `rgba(20, 27, 61, 0.8)`;
                      e.currentTarget.style.borderColor = colors.primary;
                      e.currentTarget.style.transform = "translateY(-4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = `rgba(20, 27, 61, 0.5)`;
                      e.currentTarget.style.borderColor = colors.border;
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: colors.gradient,
                        borderRadius: "8px",
                        marginBottom: "16px",
                      }}
                    >
                      <Icon size={24} style={{ color: "white" }} />
                    </div>

                    <h3 style={{ fontSize: "18px", fontWeight: "700", margin: "0 0 12px 0" }}>
                      {useCase.title}
                    </h3>

                    <p style={{ fontSize: "14px", color: colors.textSecondary, margin: 0, lineHeight: "1.6" }}>
                      {useCase.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          style={{
            padding: "80px 48px",
            background: `linear-gradient(135deg, rgba(224, 24, 91, 0.1) 0%, rgba(162, 89, 255, 0.05) 100%)`,
            borderBottom: `1px solid ${colors.border}`,
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            <h2
              style={{
                fontSize: "44px",
                fontWeight: "800",
                margin: "0 0 20px 0",
                animation: "slideInUp 0.6s ease-out",
              }}
            >
              Ready to Verify at Scale?
            </h2>

            <p
              style={{
                fontSize: "18px",
                color: colors.textSecondary,
                margin: "0 0 40px 0",
                animation: "slideInUp 0.8s ease-out",
              }}
            >
              Join companies like Squad who trust CORE-CONNECT for enterprise credential verification.
            </p>

            <Link href="/auth/register" style={{ textDecoration: "none" }}>
              <button
                style={{
                  padding: "16px 40px",
                  background: colors.gradient,
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "16px",
                  fontWeight: "700",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  boxShadow: `0 8px 30px rgba(224, 24, 91, 0.3)`,
                  animation: "slideInUp 1s ease-out",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = `0 12px 40px rgba(224, 24, 91, 0.5)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = `0 8px 30px rgba(224, 24, 91, 0.3)`;
                }}
              >
                Start Free Trial
                <ArrowRight size={18} />
              </button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer
          style={{
            padding: "60px 48px",
            borderTop: `1px solid ${colors.border}`,
            background: `rgba(10, 14, 39, 0.5)`,
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "40px",
                marginBottom: "40px",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: "800",
                    background: colors.gradient,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    marginBottom: "16px",
                  }}
                >
                  🛡️ CORE-CONNECT
                </div>
                <p style={{ fontSize: "14px", color: colors.textSecondary, margin: 0, lineHeight: "1.6" }}>
                  Enterprise credential verification for the modern fintech stack.
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: "14px", fontWeight: "700", margin: "0 0 16px 0", color: colors.text }}>
                  Product
                </h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {["Features", "Pricing", "Security", "API Docs"].map((item) => (
                    <li key={item} style={{ marginBottom: "12px" }}>
                      <a
                        href="#"
                        style={{
                          color: colors.textSecondary,
                          textDecoration: "none",
                          fontSize: "14px",
                          transition: "color 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = colors.primary;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = colors.textSecondary;
                        }}
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 style={{ fontSize: "14px", fontWeight: "700", margin: "0 0 16px 0", color: colors.text }}>
                  Company
                </h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {["About", "Blog", "Careers", "Contact"].map((item) => (
                    <li key={item} style={{ marginBottom: "12px" }}>
                      <a
                        href="#"
                        style={{
                          color: colors.textSecondary,
                          textDecoration: "none",
                          fontSize: "14px",
                          transition: "color 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = colors.primary;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = colors.textSecondary;
                        }}
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 style={{ fontSize: "14px", fontWeight: "700", margin: "0 0 16px 0", color: colors.text }}>
                  Legal
                </h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {["Privacy", "Terms", "Compliance", "Security"].map((item) => (
                    <li key={item} style={{ marginBottom: "12px" }}>
                      <a
                        href="#"
                        style={{
                          color: colors.textSecondary,
                          textDecoration: "none",
                          fontSize: "14px",
                          transition: "color 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = colors.primary;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = colors.textSecondary;
                        }}
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Footer */}
            <div
              style={{
                borderTop: `1px solid ${colors.border}`,
                paddingTop: "32px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "24px",
              }}
            >
              <p style={{ fontSize: "14px", color: colors.textSecondary, margin: 0 }}>
                © 2026 CORE-CONNECT. All rights reserved.
              </p>

              <div style={{ display: "flex", gap: "20px" }}>
                {[
                  { icon: Github, link: "#" },
                  { icon: Twitter, link: "#" },
                  { icon: Linkedin, link: "#" },
                ].map((social, idx) => {
                  const SocialIcon = social.icon;
                  return (
                    <a
                      key={idx}
                      href={social.link}
                      style={{
                        color: colors.textSecondary,
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = colors.primary;
                        e.currentTarget.style.transform = "translateY(-4px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = colors.textSecondary;
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      <SocialIcon size={20} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
