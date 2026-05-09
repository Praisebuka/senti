import { colors } from "@/constants/colors";
import { Card } from "./Card";
import React from "react";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
  color?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value,
  sub,
  color = colors.green,
}) => {
  return (
    <Card
      style={{
        display: "flex",
        gap: 16,
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          background: `${color}18`,
          borderRadius: 10,
          padding: 10,
          color,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <div style={{ color: colors.muted, fontSize: 12, marginBottom: 4 }}>
          {label}
        </div>
        <div
          style={{
            color: colors.text,
            fontSize: 24,
            fontWeight: 700,
            lineHeight: 1,
          }}
        >
          {value}
        </div>
        {sub && (
          <div style={{ color: colors.muted, fontSize: 11, marginTop: 4 }}>
            {sub}
          </div>
        )}
      </div>
    </Card>
  );
};
