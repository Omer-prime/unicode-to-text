// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "Unicode to Text Converter",
  description:
    "Convert Unicode escapes, HTML entities, and URL-encoded strings into clean, readable text.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-slate-50 text-slate-900">
        {/* Google AdSense script */}
        <Script
          id="adsense-script"
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
        />

        {/* Global navbar */}
        <Navbar />

        {/* Main content area */}
        <main className="min-h-[calc(100vh-112px)]">{children}</main>

        {/* Global footer */}
        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between text-[11px] text-slate-500">
            <span>© {new Date().getFullYear()}Tools</span>
            <span>Built with Next.js · Unicode to Text Converter</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
