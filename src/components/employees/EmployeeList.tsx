import { useState } from "react";
import { colors } from "@/constants/colors";
import { EMPLOYEES, VERDICTS } from "@/constants/data";
import { Employee } from "@/types";
import { Card, STSBar } from "@/components/shared";
import { Search, ChevronRight } from "lucide-react";
import { verdictColor, squadAction } from "@/utils/helpers";
import { getVerdictIcon } from "@/utils/icons";

interface EmployeeListProps {
  onSelect: (emp: Employee) => void;
}

export const EmployeeList: React.FC<EmployeeListProps> = ({ onSelect }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  const filtered = EMPLOYEES.filter((e) =>
    (filter === "ALL" || e.verdict === filter) &&
    (e.name.toLowerCase().includes(search.toLowerCase()) || e.id.includes(search))
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <div
          style={{
            flex: 1,
            minWidth: 200,
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: colors.card,
            border: `1px solid ${colors.border}`,
            borderRadius: 8,
            padding: "8px 12px",
          }}
        >
          <Search size={14} color={colors.muted} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search employee or ID..."
            style={{
              background: "none",
              border: "none",
              outline: "none",
              color: colors.text,
              fontSize: 13,
              width: "100%",
            }}
          />
        </div>
        {["ALL", ...VERDICTS].map((v) => (
          <button
            key={v}
            onClick={() => setFilter(v)}
            style={{
              padding: "8px 14px",
              borderRadius: 8,
              border: `1px solid ${
                filter === v ? verdictColor(v as any) : colors.border
              }`,
              background: filter === v ? `${verdictColor(v as any)}18` : "transparent",
              color: filter === v ? verdictColor(v as any) : colors.muted,
              fontSize: 12,
              cursor: "pointer",
              fontWeight: filter === v ? 600 : 400,
            }}
          >
            {v}
          </button>
        ))}
      </div>

      <Card style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
              {["Employee", "Dept", "Salary", "STS", "Verdict", "Squad Action", ""].map(
                (h) => (
                  <th
                    key={h}
                    style={{
                      padding: "12px 16px",
                      color: colors.muted,
                      fontSize: 11,
                      fontWeight: 500,
                      textAlign: "left",
                    }}
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {filtered.map((e, i) => (
              <tr
                key={e.id}
                style={{
                  borderBottom: `1px solid ${colors.border}`,
                  background: i % 2 === 0 ? "transparent" : `${colors.border}30`,
                  cursor: "pointer",
                }}
                onClick={() => onSelect(e)}
              >
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ color: colors.text, fontSize: 13, fontWeight: 500 }}>
                    {e.name}
                  </div>
                  <div style={{ color: colors.muted, fontSize: 11 }}>{e.id}</div>
                </td>
                <td style={{ padding: "12px 16px", color: colors.muted, fontSize: 12 }}>
                  {e.dept}
                </td>
                <td style={{ padding: "12px 16px", color: colors.text, fontSize: 12 }}>
                  ₦{e.salary.toLocaleString()}
                </td>
                <td style={{ padding: "12px 16px", minWidth: 120 }}>
                  <STSBar score={e.sts} />
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      color: verdictColor(e.verdict),
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    {getVerdictIcon(e.verdict)}
                    {e.verdict}
                  </span>
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <span
                    style={{
                      fontSize: 11,
                      color: ["TRUSTED", "VERIFIED"].includes(e.verdict)
                        ? colors.success
                        : colors.error,
                    }}
                  >
                    {squadAction(e.verdict)}
                  </span>
                </td>
                <td style={{ padding: "12px 16px", color: colors.muted }}>
                  <ChevronRight size={14} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};
