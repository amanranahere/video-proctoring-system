import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body className="bg-[#f5f5f7]">{children}</body>
    </html>
  );
}
