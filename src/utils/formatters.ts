import { Verdict } from "@/types";
import { colors } from "@/constants/colors";

export const getVerdictColor = (verdict: Verdict): string => {
  const colorMap: Record<Verdict, string> = {
    TRUSTED: colors.green,
    VERIFIED: colors.blue,
    REVIEW: colors.amber,
    SUSPECT: "#FF8C00",
    FLAGGED: colors.red,
  };
  return colorMap[verdict] || colors.muted;
};

export const getSquadAction = (verdict: Verdict): string => {
  const actionMap: Record<Verdict, string> = {
    TRUSTED: "Squad Transfer: EXECUTE",
    VERIFIED: "Squad Transfer: EXECUTE",
    REVIEW: "Squad Transfer: HOLD",
    SUSPECT: "Squad Transfer: BLOCK",
    FLAGGED: "Squad Transfer: BLOCK + FREEZE",
  };
  return actionMap[verdict];
};

export const calculateStsPercentage = (score: number): number => {
  return (score / 10) * 100;
};

export const getStsColor = (score: number): string => {
  if (score >= 800) return colors.green;
  if (score >= 600) return colors.blue;
  if (score >= 400) return colors.amber;
  return colors.red;
};

export const formatCurrency = (amount: number): string => {
  return `₦${amount.toLocaleString()}`;
};

export const formatCurrencyInThousands = (amount: number): string => {
  return `₦${(amount / 1000).toFixed(0)}k`;
};
