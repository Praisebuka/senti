"use client";

import { AppShell } from "@/components/layout/AppShell";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { storageUtils } from "@/utils/localStorage";

export default function DashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in via localStorage
    const loginData = storageUtils.getWithExpiry("loginData");
    const registrationData = storageUtils.getWithExpiry("registrationData");

    if (loginData || registrationData) {
      setIsLoading(false);
    } else {
      // No valid session, redirect to login
      router.push("/login");
    }
  }, [router]);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: "#0a0e27",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: "32px",
              fontWeight: "800",
              marginBottom: "16px",
              background: "linear-gradient(135deg, #e0185b 0%, #a259ff 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Loading...
          </div>
        </div>
      </div>
    );
  }

  return <AppShell />;
}
