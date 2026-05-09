import { colors } from "@/constants/colors";
import { getSTSColor } from "@/utils/helpers";

interface STSBarProps {
  score: number;
}

export const STSBar: React.FC<STSBarProps> = ({ score }) => {
  const pct = score / 10;
  const col = getSTSColor(score);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div
        style={{
          flex: 1,
          height: 6,
          borderRadius: 3,
          background: colors.border,
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            borderRadius: 3,
            background: col,
            transition: "width .6s",
          }}
        />
      </div>
      <span
        style={{
          color: col,
          fontWeight: 700,
          fontSize: 13,
          minWidth: 36,
        }}
      >
        {score}
      </span>
    </div>
  );
};
