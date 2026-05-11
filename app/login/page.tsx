"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { colors } from "@/constants/colors";
import { Mail, Lock, ArrowRight, AlertCircle, Eye, EyeOff, Loader } from "lucide-react";
import { storageUtils } from "@/utils/localStorage";
import { useAlert, initSweetAlertStyles } from "@/hooks/useAlert";

export default function LoginPage() {
  const router = useRouter();
  const alert = useAlert();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Initialize alert styles on mount
  useEffect(() => {
    initSweetAlertStyles();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email || !password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      await alert.showError({
        title: "Missing Fields",
        message: "Please enter both email and password",
      });
      return;
    }

    // Show loading alert
    alert.showLoading("Signing in...");

    // Simulate API call with minimal delay
    await new Promise((resolve) => {
      setTimeout(async () => {
        // Close loading alert
        Swal.close();
        
        // Small delay to ensure loading alert is fully closed
        await new Promise((innerResolve) => setTimeout(innerResolve, 100));

        // Save login data to localStorage with 10-minute expiry
        const loginData = { email, password, loginTime: new Date().toISOString() };
        storageUtils.saveWithExpiry("loginData", loginData);

        // Show success alert and redirect
        await alert.showSuccess({
          title: "Login Successful!",
          message: `Welcome back! You're being redirected to your dashboard.`,
        });

        // Redirect to dashboard
        router.push("/dashboard");
        resolve(null);
      }, 800);
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        background: colors.bg,
        color: colors.text,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated Background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-50%",
            left: "-10%",
            width: "60%",
            height: "60%",
            background: "radial-gradient(circle, rgba(224, 24, 91, 0.15) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(40px)",
            animation: "float 20s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-30%",
            right: "-10%",
            width: "50%",
            height: "50%",
            background: "radial-gradient(circle, rgba(162, 89, 255, 0.1) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(40px)",
            animation: "float 25s ease-in-out infinite",
            animationDelay: "-5s",
          }}
        />
      </div>

      {/* Content Container */}
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "480px",
            animation: "slideInUp 0.6s ease-out",
          }}
        >
          {/* Navigation Back */}
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: colors.textSecondary,
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: "600",
              marginBottom: "32px",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = colors.primary;
              e.currentTarget.style.transform = "translateX(-4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = colors.textSecondary;
              e.currentTarget.style.transform = "translateX(0)";
            }}
          >
            ← Back to Home
          </Link>

          {/* Logo & Header */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "40px",
              animation: "slideInDown 0.6s ease-out",
            }}
          >
            <Link href="/" style={{ textDecoration: "none" }}>
              <div
                style={{
                  fontSize: "32px",
                  fontWeight: "800",
                  background: colors.gradient,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: "-1px",
                  marginBottom: "16px",
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
                🛡️ SENTINEL
              </div>
            </Link>
            <h1
              style={{
                fontSize: "28px",
                fontWeight: "800",
                color: colors.text,
                margin: "0 0 8px 0",
              }}
            >
              Welcome Back
            </h1>
            <p
              style={{
                fontSize: "14px",
                color: colors.textSecondary,
                margin: 0,
              }}
            >
              Sign in to access your dashboard
            </p>
          </div>

          {/* Login Form Card */}
          <form
            onSubmit={handleLogin}
            style={{
              padding: "40px",
              background: `rgba(20, 27, 61, 0.6)`,
              border: `1px solid ${colors.border}`,
              borderRadius: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              backdropFilter: "blur(10px)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
              animation: "slideInUp 0.8s ease-out 0.1s both",
            }}
          >
            {/* Error Alert */}
            {error && (
              <div
                style={{
                  padding: "14px 16px",
                  background: "rgba(255, 77, 106, 0.1)",
                  border: `1.5px solid ${colors.error}`,
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  animation: "slideInDown 0.4s ease-out",
                }}
              >
                <AlertCircle size={18} style={{ color: colors.error, flexShrink: 0 }} />
                <span style={{ fontSize: "14px", color: colors.error, fontWeight: "500" }}>
                  {error}
                </span>
              </div>
            )}

            {/* Email Field */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                animation: "slideInUp 0.6s ease-out 0.2s both",
              }}
            >
              <label
                htmlFor="email"
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: focusedField === "email" ? colors.primary : colors.text,
                  transition: "color 0.3s ease",
                }}
              >
                Email Address
              </label>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  transition: "all 0.3s ease",
                  borderRadius: "10px",
                  border: `1.5px solid ${focusedField === "email" ? colors.primary : colors.border}`,
                  boxShadow:
                    focusedField === "email"
                      ? `0 0 0 3px rgba(224, 24, 91, 0.1)`
                      : "none",
                  backgroundColor: colors.bg,
                }}
              >
                <Mail
                  size={18}
                  style={{
                    position: "absolute",
                    left: "14px",
                    color: focusedField === "email" ? colors.primary : colors.textSecondary,
                    transition: "color 0.3s ease",
                  }}
                />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    width: "100%",
                    padding: "12px 14px 12px 44px",
                    background: "transparent",
                    border: "none",
                    color: colors.text,
                    fontSize: "14px",
                    outline: "none",
                    boxSizing: "border-box",
                    transition: "all 0.3s ease",
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                animation: "slideInUp 0.6s ease-out 0.3s both",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <label
                  htmlFor="password"
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: focusedField === "password" ? colors.primary : colors.text,
                    transition: "color 0.3s ease",
                  }}
                >
                  Password
                </label>
                <Link
                  href="/auth/forgot-password"
                  style={{
                    color: colors.primary,
                    textDecoration: "none",
                    fontSize: "12px",
                    fontWeight: "600",
                    transition: "opacity 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  Forgot?
                </Link>
              </div>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  transition: "all 0.3s ease",
                  borderRadius: "10px",
                  border: `1.5px solid ${focusedField === "password" ? colors.primary : colors.border}`,
                  boxShadow:
                    focusedField === "password"
                      ? `0 0 0 3px rgba(224, 24, 91, 0.1)`
                      : "none",
                  backgroundColor: colors.bg,
                }}
              >
                <Lock
                  size={18}
                  style={{
                    position: "absolute",
                    left: "14px",
                    color: focusedField === "password" ? colors.primary : colors.textSecondary,
                    transition: "color 0.3s ease",
                  }}
                />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    width: "100%",
                    padding: "12px 44px 12px 44px",
                    background: "transparent",
                    border: "none",
                    color: colors.text,
                    fontSize: "14px",
                    outline: "none",
                    boxSizing: "border-box",
                    transition: "all 0.3s ease",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "14px",
                    background: "none",
                    border: "none",
                    color: colors.textSecondary,
                    cursor: "pointer",
                    padding: "4px",
                    display: "flex",
                    alignItems: "center",
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = colors.primary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = colors.textSecondary;
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                color: colors.textSecondary,
                fontSize: "14px",
                userSelect: "none",
                animation: "slideInUp 0.6s ease-out 0.4s both",
              }}
            >
              <input
                type="checkbox"
                style={{
                  width: "16px",
                  height: "16px",
                  cursor: "pointer",
                  accentColor: colors.primary,
                  borderRadius: "4px",
                }}
              />
              Remember me for 30 days
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                padding: "12px 24px",
                background: colors.gradient,
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontSize: "16px",
                fontWeight: "700",
                cursor: isLoading ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                boxShadow: `0 4px 15px rgba(224, 24, 91, 0.3)`,
                opacity: isLoading ? 0.8 : 1,
                animation: "slideInUp 0.6s ease-out 0.5s both",
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = `0 8px 25px rgba(224, 24, 91, 0.5)`;
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = `0 4px 15px rgba(224, 24, 91, 0.3)`;
                }
              }}
            >
              {isLoading ? (
                <>
                  <Loader size={18} style={{ animation: "spin 0.8s linear infinite" }} />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Sign Up CTA */}
          <div
            style={{
              textAlign: "center",
              marginTop: "32px",
              animation: "slideInUp 0.8s ease-out 0.6s both",
            }}
          >
            <p style={{ fontSize: "14px", color: colors.textSecondary, margin: 0 }}>
              Don't have an account?{" "}
              <Link
                href="/register"
                style={{
                  color: colors.primary,
                  textDecoration: "none",
                  fontWeight: "700",
                  transition: "all 0.3s ease",
                  borderBottom: `2px solid transparent`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderBottomColor = colors.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderBottomColor = "transparent";
                }}
              >
                Create account
              </Link>
            </p>
          </div>

          {/* Footer */}
          <div
            style={{
              textAlign: "center",
              marginTop: "24px",
              fontSize: "12px",
              color: colors.muted,
              animation: "slideInUp 1s ease-out 0.7s both",
            }}
          >
            <p style={{ margin: 0, lineHeight: "1.6" }}>
              By signing in, you agree to our{" "}
              <a href="#" style={{ color: colors.primary, textDecoration: "none" }}>
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" style={{ color: colors.primary, textDecoration: "none" }}>
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
