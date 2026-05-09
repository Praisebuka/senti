"use client";

import React from "react";
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
} from "lucide-react";
import { Verdict } from "@/types";

export const getVerdictIcon = (v: Verdict): React.ReactNode => {
  const iconMap: Record<Verdict, React.ReactNode> = {
    TRUSTED: <CheckCircle size={14} />,
    VERIFIED: <CheckCircle size={14} />,
    REVIEW: <Clock size={14} />,
    SUSPECT: <AlertTriangle size={14} />,
    FLAGGED: <XCircle size={14} />,
  };
  return iconMap[v];
};
