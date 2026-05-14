import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Core-Connect - Squad Payroll Verification",
  description: "AI-powered employee payroll verification system by 0x1337",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <style>{`
          .swal2-popup {
            font-size: 10px !important;
          }
        `}</style>
        {children}
      </body>
    </html>
  );
}
