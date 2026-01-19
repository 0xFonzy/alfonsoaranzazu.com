import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alfonso Aranzazu | Senior Software Engineer",
  description:
    "Senior Software Engineer with 9+ years of experience in building scalable, high-performance products using React, TypeScript, and GraphQL.",
  keywords: [
    "Alfonso Aranzazu",
    "Software Engineer",
    "React",
    "TypeScript",
    "Web3",
    "Frontend Developer",
    "Full Stack",
  ],
  authors: [{ name: "Alfonso Aranzazu" }],
  openGraph: {
    title: "Alfonso Aranzazu | Senior Software Engineer",
    description:
      "Senior Software Engineer with 9+ years of experience building scalable products.",
    url: "https://www.alfonsoaranzazu.com",
    siteName: "Alfonso Aranzazu",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alfonso Aranzazu | Senior Software Engineer",
    description:
      "Senior Software Engineer with 9+ years of experience building scalable products.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
