import { Metadata } from "next";
import dynamic from "next/dynamic";

const LandingPage = dynamic(() => import("./home/page"), { ssr: false });

export const metadata: Metadata = {
  title: "SENTINEL - Squad Payroll Verification",
  description: "AI-powered employee payroll verification system",
};

export default function Home() {
  return <LandingPage />;
}
