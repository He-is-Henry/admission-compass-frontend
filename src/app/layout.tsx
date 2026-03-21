import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { AuthProvider } from "./context/AuthProvider";
import Header from "./components/Header";
import { Suspense } from "react";
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
        <Header />
        <Toaster position="bottom-center" />
<<<<<<< HEAD
        {children}
        <Footer />
=======
        <AuthProvider>
          <Suspense fallback={null}>
            <Header />
          </Suspense>
          {children}
        </AuthProvider>
>>>>>>> 6daf1e933e8f8dfb0f491582b47fb29d9f375ce0
      </body>
    </html>
  );
}
