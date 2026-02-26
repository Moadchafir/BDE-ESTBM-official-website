import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bureau des Étudiants",
  description: "Votre voix, notre mission.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased min-h-screen bg-background relative overflow-x-hidden`}
        suppressHydrationWarning
      >
        {/* Animated background */}
        <div className="fixed inset-0 -z-10">

          {/* Floating gradient orbs — light, pastel tones */}
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-3xl orb-float-1" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-3xl orb-float-2" />
          <div className="absolute top-[40%] left-[30%] w-[400px] h-[400px] bg-blue-300/8 rounded-full blur-3xl orb-float-3" />
        </div>

        <SessionProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
