import { colors } from "@/constants/colors";
import { getSTSColor } from "@/utils/helpers";

interface ScoreRingProps {
  score: number;
}

export const ScoreRing: React.FC<ScoreRingProps> = ({ score }) => {
  const col = getSTSColor(score);
  const r = 52;
  const circ = 2 * Math.PI * r;
  const pct = score / 1000;
  const dash = pct * circ;

  return (
    <div style={{ position: "relative", width: 130, height: 130, flexShrink: 0 }}>
      <svg width={130} height={130} style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx={65}
          cy={65}
          r={r}
          fill="none"
          stroke={colors.border}
          strokeWidth={10}
        />
        <circle
          cx={65}
          cy={65}
          r={r}
          fill="none"
          stroke={col}
          strokeWidth={10}
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          style={{ transition: "stroke-dasharray .8s" }}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            color: col,
            fontSize: 26,
            fontWeight: 800,
            lineHeight: 1,
          }}
        >
          {score}
        </div>
        <div style={{ color: colors.muted, fontSize: 10 }}>/ 1000</div>
      </div>
    </div>
  );
};
