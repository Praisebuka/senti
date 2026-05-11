"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  FileText,
  TrendingUp,
  LogOut,
  Bell,
  Shield,
} from "lucide-react";
import { colors } from "@/constants/colors";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { EmployeeList } from "@/components/employees/EmployeeList";
import { EmployeeDetail } from "@/components/employees/EmployeeDetail";
import { CredentialVerifier } from "@/components/employees/CredentialVerifier";
import { Employee } from "@/types";
import { Card } from "@/components/shared/Card";

const NAV = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard size={16} />,
  },
  { id: "employees", label: "Employees", icon: <Users size={16} /> },
  { id: "credential", label: "Credentials", icon: <FileText size={16} /> },
  { id: "analytics", label: "Analytics", icon: <TrendingUp size={16} /> },
];

interface AppShellProps {}

export function AppShell({}: AppShellProps) {
  const [view, setView] = useState("dashboard");
  const [selected, setSelected] = useState<Employee | null>(null);

  const handleSelectEmployee = (e: Employee) => {
    setSelected(e);
    setView("empdetail");
  };

  const handleBack = () => {
    setSelected(null);
    setView("employees");
  };

  const pageTitle =
    view === "dashboard" ? "Overview" : view === "employees" ? "Employee Payroll Register" : view === "empdetail" ? selected?.name : view === "credential" ? "Credential Verifier" : "Analytics";

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: colors.bg,
        color: colors.text,
        fontFamily: "'Inter',system-ui,sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: 220,
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
                background: colors.green,
                borderRadius: 8,
                padding: "6px 8px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Shield size={16} color="#000" />
            </div>
            <div>
              <div
                style={{
                  color: colors.text,
                  fontWeight: 800,
                  fontSize: 15,
                  letterSpacing: 1,
                }}
              >
                SENTINEL
              </div>
              <div
                style={{
                  color: colors.green,
                  fontSize: 9,
                  letterSpacing: 2,
                  fontWeight: 600,
                }}
              >
                BY SQUAD
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
              background: colors.greenDim,
              border: `1px solid ${colors.greenMid}`,
              borderRadius: 6,
              padding: "6px 10px",
            }}
          >
            <div style={{ color: colors.green, fontSize: 10, fontWeight: 600 }}>
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
              }}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 12px",
                borderRadius: 8,
                background:
                  view === n.id ||
                  (view === "empdetail" && n.id === "employees")
                    ? colors.greenDim
                    : "transparent",
                color:
                  view === n.id ||
                  (view === "empdetail" && n.id === "employees")
                    ? colors.green
                    : colors.muted,
                border:
                  view === n.id ||
                  (view === "empdetail" && n.id === "employees")
                    ? `1px solid ${colors.greenMid}`
                    : "transparent",
                cursor: "pointer",
                fontSize: 13,
                fontWeight:
                  view === n.id ||
                  (view === "empdetail" && n.id === "employees")
                    ? 600
                    : 400,
                marginBottom: 2,
                textAlign: "left",
              }}
            >
              {n.icon}
              {n.label}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div
          style={{
            padding: "12px 8px",
            borderTop: `1px solid ${colors.border}`,
          }}
        >
          <button
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 12px",
              borderRadius: 8,
              background: "transparent",
              color: colors.muted,
              border: "none",
              cursor: "pointer",
              fontSize: 13,
            }}
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
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
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ position: "relative" }}>
              <Bell size={18} color={colors.muted} />
              <div
                style={{
                  position: "absolute",
                  top: -3,
                  right: -3,
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: colors.red,
                }}
              />
            </div>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: colors.greenDim,
                border: `1px solid ${colors.green}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: colors.green,
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              A
            </div>
          </div>
        </div>

        {/* Content */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: 24,
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
          {view === "analytics" && (
            <Card
              style={{
                textAlign: "center",
                padding: 60,
              }}
            >
              <TrendingUp
                size={40}
                color={colors.muted}
                style={{ marginBottom: 12 }}
              />
              <div style={{ color: colors.muted }}>
                Analytics module — coming in v0.2
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
