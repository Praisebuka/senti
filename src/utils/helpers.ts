import { Verdict } from "@/types";
import { colors } from "@/constants/colors";

export const verdictColor = (v: Verdict): string => {
  const colorMap: Record<Verdict, string> = {
    TRUSTED: colors.green,
    VERIFIED: colors.info,
    REVIEW: colors.amber,
    SUSPECT: "#FF8C00",
    FLAGGED: colors.red,
  };
  return colorMap[v] || colors.muted;
};

export const squadAction = (v: Verdict): string => {
  const actionMap: Record<Verdict, string> = {
    TRUSTED: "Squad Transfer: EXECUTE",
    VERIFIED: "Squad Transfer: EXECUTE",
    REVIEW: "Squad Transfer: HOLD",
    SUSPECT: "Squad Transfer: BLOCK",
    FLAGGED: "Squad Transfer: BLOCK + FREEZE",
  };
  return actionMap[v];
};

export const getSTSColor = (score: number): string => {
  if (score >= 800) return colors.green;
  if (score >= 600) return colors.info;
  if (score >= 400) return colors.amber;
  return colors.red;
};

export const getComponentColor = (value: number): string => {
  if (value >= 75) return colors.green;
  if (value >= 55) return colors.info;
  if (value >= 35) return colors.amber;
  return colors.red;
};
