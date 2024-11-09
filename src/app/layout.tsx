// app/layout.tsx

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "../app/components/global/Navbar";
import Footer from "../app/components/global/Footer";
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://localhost:3001/'),
  title: "RT-Labs",
  description: "RT-Labs is Remote Triggered Labs, built for students to practice and learn experiments.",
  openGraph: {
    images: "add-your-open-graph-image-url-here",
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-zinc-900 text-white min-h-screen flex flex-col`}>
        <div className="relative min-h-screen">
          <nav className="sticky top-0 z-50 bg-zinc-900 border-b border-zinc-800 mb-8">
            <Navbar />
          </nav>
          <main className="relative z-0 mt-20">
            {children}
          </main>
          <Toaster position="bottom-right" />
        </div>
        <Footer />
      </body>
    </html>
  );
}
