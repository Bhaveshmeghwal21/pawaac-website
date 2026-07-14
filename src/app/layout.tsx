import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";
import FilmGrain from "@/components/ui/FilmGrain";
import Preloader from "@/components/ui/Preloader";
import HudFrame from "@/components/ui/HudFrame";
import Navigation from "@/components/layout/Navigation";

// Typeface decision (resolved OCP-01, design.md -> Design Tokens -> Type tokens):
// Display_Type/Heading use Space Grotesk (SIL OFL, variable-weight geometric grotesk).
// Label_Caps/Technical_Data use JetBrains Mono (Apache 2.0), replacing IBM Plex Mono.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
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
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-bg text-fg antialiased">
        <Preloader />
        <FilmGrain />
        <HudFrame />
        <LenisProvider>
          <Navigation />
          <main id="main-content">{children}</main>
        </LenisProvider>
      </body>
    </html>
  );
}
