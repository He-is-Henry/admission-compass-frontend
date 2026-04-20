import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { AuthProvider } from "./context/AuthProvider";
import { Suspense } from "react";
import { RateLimitProvider } from "./context/RateLimitProvider";
import { RateLimitModal } from "./components/RateLimitModal";
import Hooks from "./page.client";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admission compass",
  description: "Ready to know your chances?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Toaster position="bottom-center" />
        <AuthProvider>
          <Hooks />
          <RateLimitProvider>
            <Suspense fallback={null}>
              <Header />
            </Suspense>
            {children}
            <RateLimitModal />
          </RateLimitProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
