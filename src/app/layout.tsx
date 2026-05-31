import type { Metadata } from "next";
import { Syne, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";
import FilmGrain from "@/components/ui/FilmGrain";
import CustomCursor from "@/components/ui/CustomCursor";
import Preloader from "@/components/ui/Preloader";
import HudFrame from "@/components/ui/HudFrame";
import Navigation from "@/components/layout/Navigation";

const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pawaac.com"),
  title: "PAWAAC Drones · Autonomous Aerial Surveillance for India",
  description:
    "Fully autonomous drones for defense and police. 24×7 surveillance without pilots. Vision AI and Decision OS. The data layer for physical security.",
  keywords: [
    "autonomous drone India",
    "surveillance drone defense",
    "unmanned aerial vehicle police",
    "AI surveillance India",
    "fully autonomous drone",
    "border surveillance drone",
  ],
  openGraph: {
    title: "PAWAAC Drones · Autonomous Aerial Surveillance",
    description:
      "The aerial security layer for the physical world. Fully autonomous drones, Vision AI, and Decision OS.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${inter.variable} ${plexMono.variable} has-custom-cursor`}
    >
      <body className="bg-bg text-fg antialiased">
        <Preloader />
        <FilmGrain />
        <HudFrame />
        <CustomCursor />
        <LenisProvider>
          <Navigation />
          <main>{children}</main>
        </LenisProvider>
      </body>
    </html>
  );
}
