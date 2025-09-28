import type { Metadata } from "next";
import "./globals.css";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "500", "600", "700", "800", "900", "1000"],
});

export const metadata: Metadata = {
  title: "Video Proctoring System",
  description:
    "A video proctoring system that enables interviewers or examiners to monitor candidates in real time with video streaming, activity logging, and monitoring features.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable}`}>
      <body className="bg-[#f5f5f7]">{children}</body>
    </html>
  );
}
