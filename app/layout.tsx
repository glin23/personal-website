import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Caveat,
  Cormorant_Garamond,
  JetBrains_Mono,
} from "next/font/google";
import { jsonLd } from "@/lib/jsonld";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-handwrite",
  subsets: ["latin"],
  display: "swap",
});

// classical Garamond revival — clean f / j, no quirks
const bookSerif = Cormorant_Garamond({
  variable: "--font-book",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://leelin.vercel.app"),
  title: {
    default: "Lee Lin — AI Builder",
    template: "%s · Lee Lin",
  },
  description:
    "Lee Lin (林感) is a solo AI builder shipping consumer products from Boston. Babson Class of 2027. Currently building Resume2Web and Semori.",
  applicationName: "Lee Lin · Personal Site",
  keywords: [
    "Lee Lin",
    "林感",
    "AI builder",
    "indie hacker",
    "Resume2Web",
    "Semori",
    "Babson College",
    "Boston AI",
    "consumer AI",
    "RAG",
    "personal portfolio",
    "solo founder",
  ],
  authors: [{ name: "Lee Lin", url: "https://leelin.vercel.app" }],
  creator: "Lee Lin",
  publisher: "Lee Lin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://leelin.vercel.app",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://leelin.vercel.app",
    siteName: "Lee Lin",
    title: "Lee Lin — AI Builder",
    description:
      "Solo builder shipping AI products from Boston. Currently: Resume2Web, Semori. Babson '27.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@LeeLinAI123",
    creator: "@LeeLinAI123",
    title: "Lee Lin — AI Builder",
    description:
      "Solo builder shipping AI products from Boston. Currently: Resume2Web, Semori.",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${jetbrainsMono.variable} ${caveat.variable} ${bookSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ink text-bone selection:bg-volt selection:text-eclipse">
        {/* JSON-LD structured data — Person + WebSite + ItemList of projects.
            Search engines + LLMs use this graph to identify Lee Lin and link
            his projects, alma mater, and social profiles. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
