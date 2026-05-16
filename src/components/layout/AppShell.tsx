"use client";
import { AnalyticsDashboard } from "@/components/analytics/AnalyticsDashboard";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  TrendingUp,
  LogOut,
  Bell,
  Shield,
  Settings,
  HelpCircle,
  BarChart3,
  CheckSquare,
  Menu,
  X,
} from "lucide-react";
import { colors } from "@/constants/colors";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { EmployeeList } from "@/components/employees/EmployeeList";
import { EmployeeDetail } from "@/components/employees/EmployeeDetail";
import { CredentialVerifier } from "@/components/employees/CredentialVerifier";
import { SanctionsTester } from "@/components/shared/SanctionsTester";
import { Employee } from "@/types";
import { Card } from "@/components/shared/Card";
import { storageUtils } from "@/utils/localStorage";
import { useAlert, initSweetAlertStyles } from "@/hooks/useAlert";

const NAV = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard size={16} />,
  },
  { id: "employees", label: "Employees", icon: <Users size={16} /> },
  { id: "credential", label: "Credentials", icon: <FileText size={16} /> },
  { id: "sanctions", label: "Sanctions Test", icon: <Shield size={16} /> },
  { id: "analytics", label: "Analytics", icon: <BarChart3 size={16} /> },
  { id: "reports", label: "Reports", icon: <TrendingUp size={16} /> },
];

const BOTTOM_NAV = [
  { id: "settings", label: "Settings", icon: <Settings size={16} /> },
  { id: "help", label: "Help & Support", icon: <HelpCircle size={16} /> },
];

export function AppShell() {
  const router = useRouter();
  const alert = useAlert();
  const [view, setView] = useState("dashboard");
  const [selected, setSelected] = useState<Employee | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    initSweetAlertStyles();
  }, []);

  const handleSelectEmployee = (e: Employee) => {
    setSelected(e);
    setView("empdetail");
  };

  const handleBack = () => {
    setSelected(null);
    setView("employees");
  };

  const handleSignOut = async () => {
    const result = await alert.showConfirm({
      title: "Sign Out?",
      message: "Are you sure you want to sign out of your account?",
      confirmText: "Yes, Sign Out",
      cancelText: "Cancel",
    });

    if (result.isConfirmed) {
      storageUtils.clearAuthData();
      await alert.showSuccess({
        title: "Signed Out",
        message: "You have been successfully signed out. Redirecting to login...",
      });
      router.push("/login");
    }
  };

  const pageTitle =
    view === "dashboard"
      ? "Overview"
      : view === "employees"
      ? "Employee Payroll Register"
      : view === "empdetail"
      ? selected?.name
      : view === "credential"
      ? "Credential Verifier"
      : view === "sanctions"
      ? "Sanctions Check Tester"
      : view === "analytics"
      ? "Analytics"
      : view === "reports"
      ? "Reports & Insights"
      : view === "settings"
      ? "Settings"
      : view === "help"
      ? "Help & Support"
      : "Overview";

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: colors.bg,
        color: colors.text,
        fontFamily: "'Inter',system-ui,sans-serif",
        overflow: "hidden",
        flexDirection: "column",
      }}
    >
      <style>{`
        @media (min-width: 751px) {
          #app-main-container {
            flex-direction: row !important;
          }
          #sidebar {
            width: 220px !important;
            position: relative !important;
            transform: none !important;
            opacity: 1 !important;
            visibility: visible !important;
            display: flex !important;
          }
          #hamburger-btn {
            display: none !important;
          }
          #overlay {
            display: none !important;
          }
        }

        @media (max-width: 750px) {
          #sidebar {
            position: fixed;
            left: 0;
            top: 60px;
            width: 260px;
            height: calc(100vh - 60px);
            z-index: 1000;
            transform: translateX(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
          }
          
          #sidebar.mobile-open {
            transform: translateX(0);
            opacity: 1;
            visibility: visible;
          }

          #overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.5);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
          }

          #overlay.mobile-open {
            opacity: 1;
            visibility: visible;
          }

          #app-main-container {
            flex-direction: column !important;
          }
        }

        @media (max-width: 300px) {
          #sidebar {
            width: 100% !important;
          }
        }
      `}</style>

      {/* Mobile Overlay */}
      <div
        id="overlay"
        className={mobileMenuOpen ? "mobile-open" : ""}
        onClick={() => setMobileMenuOpen(false)}
        style={{ cursor: "pointer" }}
      />

      {/* Main */}
      <div
        id="app-main-container"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          overflow: "hidden",
        }}
      >
        {/* Sidebar */}
        <div
          id="sidebar"
          className={mobileMenuOpen ? "mobile-open" : ""}
          style={{
            background: colors.surface,
            borderRight: `1px solid ${colors.border}`,
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
          }}
        >
          {/* Logo */}
          <div
            style={{
              padding: "20px 20px 16px",
              borderBottom: `1px solid ${colors.border}`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  background: colors.gradient,
                  borderRadius: 8,
                  padding: "6px 8px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Shield size={16} color="#fff" />
              </div>
              <div>
                <div style={{ color: colors.text, fontWeight: 800, fontSize: 15, letterSpacing: 1 }}> CORE CONNECT </div>
                
                <div
                  style={{
                    background: colors.gradient,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: 9,
                    letterSpacing: 2,
                    fontWeight: 600,
                  }}
                >
                  By 0x1337
                </div>
              </div>
            </div>
          </div>

          {/* Cycle badge */}
          <div
            style={{
              padding: "12px 16px",
              borderBottom: `1px solid ${colors.border}`,
            }}
          >
            <div
              style={{
                background: `rgba(224, 24, 91, 0.1)`,
                border: `1px solid ${colors.primary}`,
                borderRadius: 6,
                padding: "6px 10px",
              }}
            >
              <div style={{ color: colors.primary, fontSize: 10, fontWeight: 600 }}>
                ACTIVE CYCLE
              </div>
              <div style={{ color: colors.text, fontSize: 12, marginTop: 2 }}>
                November 2025
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav style={{ flex: 1, padding: "12px 8px" }}>
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => {
                  setView(n.id);
                  setSelected(null);
                  setMobileMenuOpen(false);
                }}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 12px",
                  borderRadius: 8,
                  background:
                    view === n.id || (view === "empdetail" && n.id === "employees")
                      ? `rgba(224, 24, 91, 0.15)`
                      : "transparent",
                  color:
                    view === n.id || (view === "empdetail" && n.id === "employees")
                      ? colors.primary
                      : colors.muted,
                  border:
                    view === n.id || (view === "empdetail" && n.id === "employees")
                      ? `1px solid ${colors.primary}`
                      : "transparent",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight:
                    view === n.id || (view === "empdetail" && n.id === "employees")
                      ? 600
                      : 400,
                  marginBottom: 2,
                  textAlign: "left",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (
                    view !== n.id &&
                    !(view === "empdetail" && n.id === "employees")
                  ) {
                    e.currentTarget.style.background = `rgba(224, 24, 91, 0.08)`;
                    e.currentTarget.style.color = colors.textSecondary;
                  }
                }}
                onMouseLeave={(e) => {
                  if (
                    view !== n.id &&
                    !(view === "empdetail" && n.id === "employees")
                  ) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = colors.muted;
                  }
                }}
              >
                {n.icon}
                {n.label}
              </button>
            ))}
          </nav>

          {/* Bottom Navigation */}
          <div
            style={{
              padding: "12px 8px",
              borderTop: `1px solid ${colors.border}`,
              borderBottom: `1px solid ${colors.border}`,
            }}
          >
            {BOTTOM_NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => {
                  setView(n.id);
                  setMobileMenuOpen(false);
                }}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 12px",
                  borderRadius: 8,
                  background: view === n.id ? `rgba(224, 24, 91, 0.15)` : "transparent",
                  color: view === n.id ? colors.primary : colors.muted,
                  border: view === n.id ? `1px solid ${colors.primary}` : "transparent",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: view === n.id ? 600 : 400,
                  marginBottom: 2,
                  textAlign: "left",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (view !== n.id) {
                    e.currentTarget.style.background = `rgba(224, 24, 91, 0.08)`;
                    e.currentTarget.style.color = colors.textSecondary;
                  }
                }}
                onMouseLeave={(e) => {
                  if (view !== n.id) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = colors.muted;
                  }
                }}
              >
                {n.icon}
                {n.label}
              </button>
            ))}
          </div>

          {/* Footer - Sign Out */}
          <div style={{ padding: "12px 8px" }}>
            <button
              onClick={handleSignOut}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 12px",
                borderRadius: 8,
                background: `rgba(255, 77, 106, 0.1)`,
                color: colors.error,
                border: `1px solid ${colors.errorDim}`,
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 500,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `rgba(255, 77, 106, 0.15)`;
                e.currentTarget.style.borderColor = colors.error;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = `rgba(255, 77, 106, 0.1)`;
                e.currentTarget.style.borderColor = colors.errorDim;
              }}
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            minWidth: 0,
          }}
        >
          {/* Topbar */}
          <div
            style={{
              background: colors.surface,
              borderBottom: `1px solid ${colors.border}`,
              padding: "14px 24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <button
                id="hamburger-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{
                  background: "none",
                  border: "none",
                  color: colors.primary,
                  cursor: "pointer",
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <div>
                <div
                  style={{
                    color: colors.text,
                    fontWeight: 700,
                    fontSize: 16,
                  }}
                >
                  {pageTitle}
                </div>
                <div
                  style={{
                    color: colors.muted,
                    fontSize: 11,
                    marginTop: 2,
                  }}
                >
                  Osun State Government · MDA Pilot
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ position: "relative", cursor: "pointer" }}>
                <Bell size={18} color={colors.muted} />
                <div
                  style={{
                    position: "absolute",
                    top: -3,
                    right: -3,
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: colors.error,
                  }}
                />
              </div>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: `rgba(224, 24, 91, 0.2)`,
                  border: `1px solid ${colors.primary}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: colors.primary,
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                A
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              minWidth: 0,
            }}
          >
            {view === "dashboard" && <Dashboard />}
            {view === "employees" && (
              <EmployeeList onSelect={handleSelectEmployee} />
            )}
            {view === "empdetail" && selected && (
              <EmployeeDetail emp={selected} onBack={handleBack} />
            )}
            {view === "credential" && <CredentialVerifier />}
            {view === "sanctions" && <SanctionsTester />}
            {view === "analytics" && (
              <AnalyticsDashboard />
            )}
            {view === "reports" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <Card style={{ padding: 24 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 16,
                    }}
                  >
                    <CheckSquare size={24} color={colors.primary} />
                    <div>
                      <div
                        style={{
                          color: colors.text,
                          fontWeight: 700,
                          fontSize: 16,
                        }}
                      >
                        Verification Reports
                      </div>
                      <div
                        style={{ color: colors.muted, fontSize: 13 }}
                      >
                        Automated insights and compliance tracking
                      </div>
                    </div>
                  </div>
                  <div style={{ color: colors.muted, fontSize: 13, lineHeight: 1.6 }}>
                    Generate comprehensive reports on employee verification
                    status, risk assessments, and compliance metrics. Track
                    historical data and identify trends over time.
                  </div>
                </Card>
              </div>
            )}
            {view === "settings" && (
              <Card style={{ textAlign: "center", padding: 60 }}>
                <Settings
                  size={40}
                  color={colors.muted}
                  style={{ marginBottom: 12 }}
                />
                <div style={{ color: colors.muted, marginBottom: 12 }}>
                  Settings
                </div>
                <div
                  style={{
                    color: colors.textSecondary,
                    fontSize: 14,
                    lineHeight: 1.6,
                  }}
                >
                  Configure your organization preferences, notification
                  settings, and security policies.
                </div>
              </Card>
            )}
            {view === "help" && (
              <Card style={{ textAlign: "center", padding: 60 }}>
                <HelpCircle
                  size={40}
                  color={colors.muted}
                  style={{ marginBottom: 12 }}
                />
                <div style={{ color: colors.muted, marginBottom: 12 }}>
                  Help & Support
                </div>
                <div
                  style={{
                    color: colors.textSecondary,
                    fontSize: 14,
                    lineHeight: 1.6,
                  }}
                >
                  Access documentation, FAQs, and contact support for
                  assistance with Core Connect.
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
