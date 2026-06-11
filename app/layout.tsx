import type { Metadata } from "next";
import { Geist, Geist_Mono, Familjen_Grotesk, Instrument_Serif, DotGothic16, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import Footer from "@/components/Footer";

const jetbrainsMono = JetBrains_Mono({subsets:['latin'],variable:'--font-mono'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const familjenGrotesk = Familjen_Grotesk({
  variable: "--font-familjen-grotesk",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const dotGothic = DotGothic16({
  variable: "--font-dotgothic",
  subsets: ["latin"],
  weight: ["400"],
});

const plankFont = localFont({
  src: "./assets/fonts/PLANK___.ttf",
  variable: "--font-plank", 
});

export const metadata: Metadata = {
  verification: {
    google: "bltNhJA8dDs_9l0XrmwXVbfSGKjml4hT3OL-efTHYbo",
  },
  title: "Ravivarman's Portfolio | Software Engineer, Startup Builder & Designer",
  description:
    "Official portfolio of Ravivarman showcasing AI projects, SaaS products, software development skills, and startup journey.",

  openGraph: {
    title: "Ravivarman's Portfolio | Software Engineer",
    description:
      "Software Engineer, Startup Builder, and Designer building SaaS products, AI tools, and innovative web applications.",
    url: "https://aarvee.is-a.dev/",
    siteName: "Ravivarman Portfolio",
    images: [
      {
        url: "https://aarvee.is-a.dev/preview.png",
        width: 1200,
        height: 630,
        alt: "Ravivarman's Portfolio",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Ravivarman Portfolio",
    description:
      "Software Engineer, Startup Builder, and Designer.",
    images: ["/preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, familjenGrotesk.variable, instrumentSerif.variable, dotGothic.variable, plankFont.variable, "font-mono", jetbrainsMono.variable)}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Footer />
      </body>
    </html>
  );
}
