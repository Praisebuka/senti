"use client";

import {
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { Card } from "@/components/shared";
import { colors } from "@/constants/colors";
import { EMPLOYEES, DEPARTMENT_RISKS } from "@/constants/data";

// ── Derived data ──────────────────────────────────────────────────────────────

const verdictCounts = ["TRUSTED", "VERIFIED", "REVIEW", "SUSPECT", "FLAGGED"].map(v => ({
  name: v,
  count: EMPLOYEES.filter(e => e.verdict === v).length,
}));

const verdictColors: Record<string, string> = {
  TRUSTED:  "#22c55e",
  VERIFIED: "#3b82f6",
  REVIEW:   "#f59e0b",
  SUSPECT:  "#f97316",
  FLAGGED:  "#ef4444",
};

const salarySummary = (() => {
  const flagged = EMPLOYEES
    .filter(e => ["FLAGGED", "SUSPECT"].includes(e.verdict))
    .reduce((s, e) => s + e.salary, 0);
  const cleared = EMPLOYEES
    .filter(e => ["TRUSTED", "VERIFIED"].includes(e.verdict))
    .reduce((s, e) => s + e.salary, 0);
  const review = EMPLOYEES
    .filter(e => e.verdict === "REVIEW")
    .reduce((s, e) => s + e.salary, 0);
  return [
    { name: "Cleared for Payment", value: cleared, color: "#22c55e" },
    { name: "Flagged / Blocked",   value: flagged, color: "#ef4444" },
    { name: "Pending Review",      value: review,  color: "#f59e0b" },
  ];
})();

const deptData = DEPARTMENT_RISKS.map(d => ({
  dept: d.dept,
  risk: d.risk,
  employees: EMPLOYEES.filter(e => e.dept === d.dept).length,
  flagged: EMPLOYEES.filter(e => e.dept === d.dept && ["FLAGGED","SUSPECT"].includes(e.verdict)).length,
}));

const totalBlocked = EMPLOYEES
  .filter(e => ["FLAGGED", "SUSPECT"].includes(e.verdict))
  .reduce((s, e) => s + e.salary, 0);

const totalCleared = EMPLOYEES
  .filter(e => ["TRUSTED", "VERIFIED"].includes(e.verdict))
  .reduce((s, e) => s + e.salary, 0);

// ── Component ─────────────────────────────────────────────────────────────────

export function AnalyticsDashboard() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

      {/* Headline stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
        {[
          { label: "Total Employees",    value: EMPLOYEES.length,                         color: colors.text },
          { label: "Cleared for Payment", value: EMPLOYEES.filter(e => ["TRUSTED","VERIFIED"].includes(e.verdict)).length, color: "#22c55e" },
          { label: "Flagged / Suspect",  value: EMPLOYEES.filter(e => ["FLAGGED","SUSPECT"].includes(e.verdict)).length,   color: "#ef4444" },
          { label: "Pending Review",     value: EMPLOYEES.filter(e => e.verdict === "REVIEW").length,                      color: "#f59e0b" },
        ].map(s => (
          <Card key={s.label} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 11, color: colors.muted, marginTop: 4 }}>{s.label}</div>
          </Card>
        ))}
      </div>

      {/* Salary blocked vs cleared */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
        <Card style={{ textAlign: "center" }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#ef4444" }}>
            ₦{totalBlocked.toLocaleString()}
          </div>
          <div style={{ fontSize: 11, color: colors.muted, marginTop: 4 }}>Salary Flagged for Blocking</div>
        </Card>
        <Card style={{ textAlign: "center" }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#22c55e" }}>
            ₦{totalCleared.toLocaleString()}
          </div>
          <div style={{ fontSize: 11, color: colors.muted, marginTop: 4 }}>Salary Cleared for Payment</div>
        </Card>
      </div>

      {/* Verdict distribution — pie */}
      <Card>
        <div style={{ color: colors.muted, fontSize: 11, marginBottom: 12 }}>VERDICT DISTRIBUTION</div>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={verdictCounts}
              dataKey="count"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label={({ name, count }) => `${name} (${count})`}
              labelLine={false}
            >
              {verdictCounts.map(v => (
                <Cell key={v.name} fill={verdictColors[v.name]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ background: colors.surface, border: `1px solid ${colors.border}`, fontSize: 12 }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      {/* Department risk bar chart */}
      <Card>
        <div style={{ color: colors.muted, fontSize: 11, marginBottom: 12 }}>DEPARTMENT RISK SCORE</div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={deptData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <XAxis dataKey="dept" tick={{ fontSize: 11, fill: colors.muted }} />
            <YAxis tick={{ fontSize: 11, fill: colors.muted }} domain={[0, 100]} />
            <Tooltip
              contentStyle={{ background: colors.surface, border: `1px solid ${colors.border}`, fontSize: 12 }}
            />
            <Bar dataKey="risk" radius={[4, 4, 0, 0]}>
              {deptData.map(d => (
                <Cell
                  key={d.dept}
                  fill={d.risk >= 60 ? "#ef4444" : d.risk >= 35 ? "#f59e0b" : "#22c55e"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Salary blocked by department */}
      <Card>
        <div style={{ color: colors.muted, fontSize: 11, marginBottom: 12 }}>SALARY DISTRIBUTION BY STATUS</div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={salarySummary} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: colors.muted }} />
            <YAxis tick={{ fontSize: 11, fill: colors.muted }} tickFormatter={v => `₦${(v/1000).toFixed(0)}k`} />
            <Tooltip
              contentStyle={{ background: colors.surface, border: `1px solid ${colors.border}`, fontSize: 12 }}
              formatter={(v: number) => `₦${v.toLocaleString()}`}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {salarySummary.map(s => (
                <Cell key={s.name} fill={s.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* False positive note */}
      <Card style={{ border: `1px solid ${colors.warning}40` }}>
        <div style={{ fontSize: 12, color: colors.muted, lineHeight: 1.7 }}>
          <span style={{ color: colors.warning, fontWeight: 700 }}>⚠ Important: </span>
          Core-Konnect flags employees for human review — not automatic removal. All verdicts should be verified by a payroll officer before action is taken. False positives are possible, particularly in cases of legitimate name variations or shared family accounts.
        </div>
      </Card>

    </div>
  );
}