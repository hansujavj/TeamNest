import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HamburgerSidebarWrapper from "@/components/HamburgerSidebarWrapper";
import { Toaster } from "react-hot-toast";
import MobileTeamnestBarWrapper from "@/components/MobileTeamnestBarWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TEAMNEST",
  description: "Team collaboration and task management platform",
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster position="top-right" />
        <div className="flex min-h-screen">
          <HamburgerSidebarWrapper />
          <div className="flex-1 min-h-screen">
            {/* Mobile Top Bar with TEAMNEST */}
            <MobileTeamnestBarWrapper />
            {/* Add padding top for mobile so content is not hidden under bar */}
            <div className="pt-16 md:pt-0">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
