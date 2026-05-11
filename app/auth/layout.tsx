import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0A0E27 0%, #141B3D 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated background elements */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-40%",
            right: "-10%",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(224, 24, 91, 0.1) 0%, transparent 70%)",
            borderRadius: "50%",
            animation: "float 8s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-20%",
            left: "-10%",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(162, 89, 255, 0.1) 0%, transparent 70%)",
            borderRadius: "50%",
            animation: "float 10s ease-in-out infinite 2s",
          }}
        />
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {children}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(30px);
          }
        }
      `}</style>
    </div>
  );
}
