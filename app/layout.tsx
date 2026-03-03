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
  icons: [{ rel: 'icon', url: '/logo.png' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased min-h-screen bg-background`}
        suppressHydrationWarning
      >
        {/* Animated background */}
        <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
          {/* Floating gradient orbs — vibrant tones */}
          <div className="absolute top-[-15%] right-[-10%] w-[800px] h-[800px] bg-blue-500/20 rounded-full blur-[100px] orb-float-1 transform-gpu" />
          <div className="absolute bottom-[-15%] left-[-10%] w-[700px] h-[700px] bg-cyan-400/20 rounded-full blur-[100px] orb-float-2 transform-gpu" />
          <div className="absolute top-[30%] left-[-5%] w-[600px] h-[600px] bg-indigo-400/15 rounded-full blur-[100px] orb-float-3 transform-gpu" />
          <div className="absolute top-[60%] right-[10%] w-[500px] h-[500px] bg-violet-400/15 rounded-full blur-[100px] orb-float-1 transform-gpu" />
          <div className="absolute bottom-[20%] right-[30%] w-[450px] h-[450px] bg-blue-300/12 rounded-full blur-[100px] orb-float-2 transform-gpu" />
        </div>

        <SessionProvider>
          <div className="relative overflow-x-hidden flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <Toaster />
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
