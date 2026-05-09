import { colors } from "@/constants/colors";
import { EMPLOYEES, VERDICTS, DEPARTMENT_RISKS } from "@/constants/data";
import { StatCard, Card } from "@/components/shared";
import { Users, CheckCircle, Clock, XCircle, AlertTriangle } from "lucide-react";
import { verdictColor } from "@/utils/helpers";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export const Dashboard: React.FC = () => {
  const counts = VERDICTS.reduce(
    (a, v) => ({
      ...a,
      [v]: EMPLOYEES.filter((e) => e.verdict === v).length,
    }),
    {} as Record<string, number>
  );

  const blocked = EMPLOYEES.filter((e) =>
    ["FLAGGED", "SUSPECT"].includes(e.verdict)
  ).reduce((s, e) => s + e.salary, 0);

  const held = EMPLOYEES.filter((e) => e.verdict === "REVIEW").reduce(
    (s, e) => s + e.salary,
    0
  );

  const pieData = VERDICTS.map((v) => ({
    name: v,
    value: counts[v as keyof typeof counts],
    color: verdictColor(v as any),
  })).filter((d) => d.value > 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
          gap: 16,
        }}
      >
        <StatCard
          icon={<Users size={20} />}
          label="Total Employees"
          value={EMPLOYEES.length}
          sub="This payroll cycle"
        />
        <StatCard
          icon={<CheckCircle size={20} />}
          label="Cleared for Payment"
          value={counts.TRUSTED + counts.VERIFIED}
          sub="Squad Transfer: EXECUTE"
          color={colors.green}
        />
        <StatCard
          icon={<Clock size={20} />}
          label="Under Review"
          value={counts.REVIEW}
          sub={`₦${(held / 1000).toFixed(0)}k held`}
          color={colors.amber}
        />
        <StatCard
          icon={<XCircle size={20} />}
          label="Blocked / Flagged"
          value={(counts.FLAGGED || 0) + (counts.SUSPECT || 0)}
          sub={`₦${(blocked / 1000).toFixed(0)}k saved`}
          color={colors.red}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card>
          <div style={{ color: colors.muted, fontSize: 12, marginBottom: 14 }}>
            VERDICT DISTRIBUTION
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={50}
                paddingAngle={3}
              >
                {pieData.map((d, i) => (
                  <Cell key={i} fill={d.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: colors.surface,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 8,
                  color: colors.text,
                  fontSize: 12,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 8 }}>
            {pieData.map((d) => (
              <div
                key={d.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  fontSize: 11,
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: d.color,
                  }}
                />
                <span style={{ color: colors.muted }}>{d.name}</span>
                <span style={{ color: colors.text, fontWeight: 600 }}>
                  {d.value}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div style={{ color: colors.muted, fontSize: 12, marginBottom: 14 }}>
            AVG RISK SCORE BY DEPT
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={DEPARTMENT_RISKS} barSize={20}>
              <XAxis
                dataKey="dept"
                tick={{ fill: colors.muted, fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: colors.muted, fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                domain={[0, 100]}
              />
              <Tooltip
                contentStyle={{
                  background: colors.surface,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 8,
                  color: colors.text,
                  fontSize: 12,
                }}
              />
              <Bar dataKey="risk" radius={[4, 4, 0, 0]}>
                {DEPARTMENT_RISKS.map((d, i) => (
                  <Cell
                    key={i}
                    fill={
                      d.risk > 50
                        ? colors.red
                        : d.risk > 30
                          ? colors.amber
                          : colors.green
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card>
        <div style={{ color: colors.muted, fontSize: 12, marginBottom: 14 }}>
          RECENT ALERTS
        </div>
        {EMPLOYEES.filter((e) => e.flags.length > 0)
          .slice(0, 4)
          .map((e) => (
            <div
              key={e.id}
              style={{
                display: "flex",
                gap: 12,
                alignItems: "flex-start",
                padding: "10px 0",
                borderBottom: `1px solid ${colors.border}`,
              }}
            >
              <div
                style={{
                  color: verdictColor(e.verdict),
                  marginTop: 2,
                }}
              >
                <AlertTriangle size={14} />
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    color: colors.text,
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  {e.name} <span style={{ color: colors.muted, fontWeight: 400 }}>· {e.id}</span>
                </div>
                <div
                  style={{
                    color: colors.muted,
                    fontSize: 12,
                    marginTop: 2,
                  }}
                >
                  {e.flags[0]}
                </div>
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: verdictColor(e.verdict),
                  fontWeight: 600,
                  padding: "2px 8px",
                  background: `${verdictColor(e.verdict)}18`,
                  borderRadius: 20,
                }}
              >
                {e.verdict}
              </div>
            </div>
          ))}
      </Card>
    </div>
  );
};
