"use client";

import { useState } from "react";
import { Upload, CheckCircle, AlertTriangle } from "lucide-react";
import { colors } from "@/constants/colors";
import { Card } from "@/components/shared";
import { uploadPayrollCSV } from "@/utils/csvUpload";

interface CSVUploadProps {
  orgId: string;
  onUploadComplete?: (count: number) => void;
}

export function CSVUpload({ orgId, onUploadComplete }: CSVUploadProps) {
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; count?: number; error?: string } | null>(null);

  const handleFile = async (file: File) => {
    if (!file.name.endsWith(".csv")) {
      setResult({ success: false, error: "File must be a .csv" });
      return;
    }
    setLoading(true);
    setResult(null);
    const res = await uploadPayrollCSV(file, orgId);
    setResult(res);
    setLoading(false);
    if (res.success && onUploadComplete) onUploadComplete(res.count);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <Card>
      <div style={{ color: colors.muted, fontSize: 11, marginBottom: 12 }}>
        PAYROLL CSV UPLOAD
      </div>

      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        style={{
          border: `2px dashed ${dragging ? colors.primary : colors.border}`,
          borderRadius: 8,
          padding: 32,
          textAlign: "center",
          background: dragging ? colors.primary + "08" : colors.surface,
          transition: "all 0.2s",
          cursor: "pointer",
        }}
        onClick={() => document.getElementById("csv-input")?.click()}
      >
        <Upload size={24} color={colors.muted} style={{ margin: "0 auto 8px" }} />
        <div style={{ color: colors.text, fontSize: 13, fontWeight: 600, marginBottom: 4 }}>
          {loading ? "Uploading…" : "Drop CSV or click to browse"}
        </div>
        <div style={{ color: colors.muted, fontSize: 11 }}>
          Required columns: employee_name, account_number, bank_name, salary
        </div>
        <input
          id="csv-input"
          type="file"
          accept=".csv"
          style={{ display: "none" }}
          onChange={onInputChange}
        />
      </div>

      {result && (
        <div
          style={{
            marginTop: 12,
            padding: 12,
            borderRadius: 6,
            background: result.success ? colors.success + "18" : colors.error + "18",
            border: `1px solid ${result.success ? colors.success : colors.error}40`,
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 12,
            color: colors.text,
          }}
        >
          {result.success
            ? <><CheckCircle size={14} color={colors.success} /> {result.count} employees uploaded successfully</>
            : <><AlertTriangle size={14} color={colors.error} /> {result.error}</>
          }
        </div>
      )}

      <div style={{ marginTop: 12, color: colors.muted, fontSize: 11 }}>
        CSV template: <code>employee_name,account_number,bank_name,salary,department</code>
      </div>
    </Card>
  );
}